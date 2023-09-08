import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

import { IonThumbnail } from '@ionic/react';
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fama Construtora</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonThumbnail>
          <img alt="Silhouette of mountains" src="https://play-lh.googleusercontent.com/6eCSvabJSWY8zLJ0owuqU1Xz7zNjhs7sCy4_3W8v7ybE2gkQX4QLpZdOBNjFaEScN5o=s512-rw" />
        </IonThumbnail>
        <IonButton routerLink="/login">Login</IonButton>
        <IonButton routerLink="/cadastro" color="secondary">Cadastro</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
