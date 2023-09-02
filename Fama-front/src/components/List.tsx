import './List.css';
import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';

function List() {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Responsável: João Teste</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Data de início: 27/07/2023</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Data de Entrega: 24/08/2023</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Dias decorridos: 32</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Dias atrasados: 4</IonLabel>
      </IonItem>
    </IonList>
  );
}
export default List;