import './ListadeObras.css';
import React from 'react';
import { IonItem, IonLabel, IonList,IonButton, IonRouterLink,IonModal } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';


function ListadeObras() {
  return (
    <IonList>
       
        <IonItem>
            <IonLabel>Shopping Funico<IonButton size= "small" routerLink='/obra' >←</IonButton></IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Obra 2<IonButton size= "small" >←</IonButton></IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Obra 3<IonButton size= "small" >←</IonButton></IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Obra 4<IonButton size= "small" >←</IonButton></IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel>Obra 5<IonButton size= "small" >←</IonButton></IonLabel>
        </IonItem>
        
    </IonList>
  );
}
export default ListadeObras;