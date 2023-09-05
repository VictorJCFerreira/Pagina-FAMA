import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { getAuth } from 'firebase/auth'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import LoadingSpinner from '../LoadingSpinner';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const[present] = useIonToast()


  async function login() {
    setIsLoading(true); 
    setError(null);
    try {
      const res = await loginUser(email, senha);
      if (!res) {
        setError('Erro ao entrar com suas credenciais. Verifique seu email e senha.');
        present({
          message: 'Erro ao entrar com suas credenciais. Verifique seu email e senha.',
          duration: 4000,
          position: 'middle',
          color: 'medium',
        });
      } else {
        setError(null);
        present({
        message: 'Você está logado!',
        duration: 4000,
        position: 'middle',
        color: 'light'})
      }
    } catch (error) {
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
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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

