import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

import './TabelaDeGastos.css';

function TabelaGastosEfetuados() {
    return (
        <IonGrid>
          <IonRow>
            <IonCol>Gastos Efetuados</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Tipo de gasto</IonCol>
            <IonCol>Descrição</IonCol>
            <IonCol>Valor</IonCol>
            <IonCol>Situação</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Pedreiro</IonCol>
            <IonCol>Mestre de obras</IonCol>
            <IonCol>20</IonCol>
            <IonCol>Confirmado</IonCol>
          </IonRow>
        </IonGrid>
      );
}
export default TabelaGastosEfetuados;

function TabelaGastosPendentes() {
  return (
      <IonGrid>
        <IonRow>
          <IonCol>Gastos Pendentes</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Tipo de gasto</IonCol>
          <IonCol>Descrição</IonCol>
          <IonCol>Valor</IonCol>
  
        </IonRow>
        <IonRow>
          <IonCol>Material</IonCol>
          <IonCol>Tijolo 2</IonCol>
          <IonCol>5</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Material</IonCol>
          <IonCol>Tijolo 3</IonCol>
          <IonCol>12</IonCol>
        </IonRow>
      </IonGrid>
    );
}
export { TabelaGastosPendentes };



