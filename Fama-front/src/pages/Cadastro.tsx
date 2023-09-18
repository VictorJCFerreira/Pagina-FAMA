import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, useIonToast, IonText, IonTitle, IonImg, IonToolbar } from '@ionic/react';
import react,{ useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../firebaseConfig'
import LoadingSpinner from '../LoadingSpinner';

const Home: React.FC = () => {
  const[email, setEmail] = useState('')
  const[senha, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const[present] = useIonToast()

  async function register(){
    setIsLoading(true); 
    setError(null);
    try{
      const res = await registerUser(email, senha);
      if(email.trim() === '' || senha.trim() === ''){
        present(
          {message: 'Nome e senha são obrigatórios.',
          duration: 4000,
          position: 'middle',
          color: 'medium'});
      }else {
        setError(null);
        present({
        message: 'Você está cadastrado!',
        duration: 4000,
        position: 'middle',  
        color: 'light'})
      }
    }catch (error) {
      console.error('Login error:', error);
      setError('Erro ao entrar com suas credenciais. Verifique seu email e senha.');
      present({
        message: 'Erro ao entrar com suas credenciais. Verifique seu email e senha.',
        duration: 4000,
        position: 'middle',
        color: 'medium',
      });
    }finally {
      setIsLoading(false); 
    }
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='dark'>
          <IonTitle></IonTitle>
          <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'5px 0' }}>
          <IonImg
          src="https://construtorafama.com.br/wp-content/uploads/2021/03/logo@2x.png"
          alt="Logo"
          style={{
            width: '100px', 
            height: 'auto', 
          }}
          />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="E-mail:" onIonChange={(e: any)=> setEmail(e.target.value)}></IonInput>

        <IonInput type="password" placeholder="Senha:" onIonChange={(e: any)=> setPassword(e.target.value)}></IonInput>

        <LoadingSpinner isLoading={isLoading} />

        <IonButton onClick={register}>Cadastro</IonButton>

        <p>Já possui uma conta? <Link to="/login">Login</Link></p>

      </IonContent>
    </IonPage>
  );
};

export default Home;

