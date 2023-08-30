import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { star } from 'ionicons/icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Home: React.FC = () => {
  const[nome, setUsername] = useState('')
  const[senha, setPassword] = useState('')

  function loginUser(){
    console.log(nome,senha)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Nome:" onIonChange={(e: any)=> setUsername(e.target.value)}></IonInput>

        <IonInput type="password" placeholder="Senha:" onIonChange={(e: any)=> setPassword(e.target.value)}></IonInput>
        <IonButton onClick={loginUser}>Login</IonButton>
        <p>Novo por aqui? <Link to="/cadastro">Cadastro</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
