import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast, IonImg } from '@ionic/react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser, getUserRole } from '../firebaseConfig';
import LoadingSpinner from '../LoadingSpinner';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const[present] = useIonToast()
  const history = useHistory()


  async function login() {
    console.log('Login button clicked');
    setIsLoading(true); 
    setError(null);
    try {
      const res = await loginUser(email, senha);
      if (!res) {
        setError('Erro ao entrar com suas credenciais. Verifique seu email e senha.');
        present({
          message: 'Erro ao entrar com suas credenciais. Verifique seu email e senha.',
          duration: 3000,
          position: 'middle',
          color: 'medium',
        });
      } else {
        setError(null);
        present({
        message: 'Você está logado!',
        duration: 2000,
        position: 'middle',
        color: 'light',
      });
      
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        history.push(`/dashboard/user/${userId}`); 
      }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erro ao entrar com suas credenciais. Verifique seu email e senha.');
      present({
        message: 'Erro ao entrar com suas credenciais. Verifique seu email e senha.',
        duration: 3000,
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
        <IonToolbar color="dark">
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
        <IonInput placeholder="E-mail:" onIonChange={(e: any) => setEmail(e.detail.value)}></IonInput>

        <IonInput type="password" placeholder="Senha:" onIonChange={(e: any) => setPassword(e.detail.value)}></IonInput>

        <LoadingSpinner isLoading={isLoading} />

        <IonButton onClick={login}>Login</IonButton>
        
        <p>Novo por aqui? <Link to="/cadastro">Cadastro</Link></p>

      </IonContent>
    </IonPage>
  );
};

export default Home;




