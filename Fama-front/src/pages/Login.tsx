import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';

const Home: React.FC = () => {
  const [nome, setUsername] = useState('');
  const [senha, setPassword] = useState('');

  const[present] = useIonToast()

  async function login() {
    try {
      const res = await loginUser(nome, senha);
      if (!res) {
        present(
          {message: 'Erro ao entrar com as suas credenciais.',
          duration: 4000,
          position: 'middle'})
      } else {
        present({
        message: 'Você está logado!',
        duration: 4000,
        position: 'middle'})
      }
    } catch (error) {
      console.error('Login error:', error);
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

      </IonContent>
    </IonPage>
  );
};

export default Home;

