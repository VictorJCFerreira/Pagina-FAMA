import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import './Home.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';

const Home: React.FC = () => {
  const [nome, setUsername] = useState('');
  const [senha, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); 
  async function login() {
    try {
      const res = await loginUser(nome, senha);
      if (!res) {
        setToastMessage('Erro ao entrar com as suas credenciais');
        setShowToast(true);
      } else {
        setToastMessage('Você está logado!');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setToastMessage('Erro ao efetuar login');
      setShowToast(true); 
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
        <IonInput placeholder="Nome:" onIonChange={(e: any) => setUsername(e.detail.value)}></IonInput>

        <IonInput type="password" placeholder="Senha:" onIonChange={(e: any) => setPassword(e.detail.value)}></IonInput>
        <IonButton onClick={login}>Login</IonButton>
        <p>Novo por aqui? <Link to="/cadastro">Cadastro</Link></p>

        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000} 
          position="middle" 
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;

