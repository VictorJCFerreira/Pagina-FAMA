import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, useIonToast, IonText, IonTitle, IonToolbar } from '@ionic/react';
import react,{ useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../firebaseConfig'

const Home: React.FC = () => {
  const[nome, setUsername] = useState('')
  const[senha, setPassword] = useState('')
  const[confirma, setCPassword] = useState('')
  
  const[present] = useIonToast()

  async function register(){
    if(senha !== confirma){
      present(
        {message: 'As senhas não são iguais.',
        duration: 4000,
        position: 'middle'})
  
    }
    if(nome.trim() === '' || senha.trim() === ''){
      present(
        {message: 'Nome e senha são obrigatórios.',
        duration: 4000,
        position: 'middle'});
    }

    const res = await registerUser(nome, senha)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Nome:" onIonChange={(e: any)=> setUsername(e.target.value)}></IonInput>

        <IonInput type="password" placeholder="Senha:" onIonChange={(e: any)=> setPassword(e.target.value)}></IonInput>

        <IonInput type="password" placeholder="Confirmar senha:" onIonChange={(e: any)=> setCPassword(e.target.value)}></IonInput>

        <IonButton onClick={register}>Cadastro</IonButton>

        <p>Já possui uma conta? <Link to="/login">Login</Link></p>

      </IonContent>
    </IonPage>
  );
};

export default Home;

