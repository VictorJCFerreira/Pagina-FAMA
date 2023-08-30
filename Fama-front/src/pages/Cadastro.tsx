import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { star } from 'ionicons/icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Home: React.FC = () => {
  const[nome, setUsername] = useState('')
  const[senha, setPassword] = useState('')
  const[confirma, setCPassword] = useState('')


  function registerUser(){
    console.log(nome,senha,confirma)
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

        <IonButton onClick={registerUser}>Cadastro</IonButton>

        <p>Já possui uma conta? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Home;

