import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonInput} from '@ionic/react';
import './visaogeral.css';
import ListadeObras from '../components/ListadeObras';
import React, { useState } from 'react';


const Visaogeral: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Visão Geral das Obras</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Visão Geral das Obras</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ListadeObras />
          <IonButton size="default" routerLink='/adicionarobra'>Adicionar Obra</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Visaogeral;
  