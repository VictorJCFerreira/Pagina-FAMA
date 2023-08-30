import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { star } from 'ionicons/icons'
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fama Construtora</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton routerLink="/login">Login</IonButton>
        <IonButton routerLink="/cadastro" color="secondary">Cadastro</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
