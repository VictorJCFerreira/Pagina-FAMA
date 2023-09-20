import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonInput} from '@ionic/react';
import './AdicionarObra.css';
import React, { useState } from 'react';


const AdicionarObra: React.FC = () => {

    const[nomeObra, setNomeObra] = useState('')
    const[responsavel, setResponsavel] = useState('')
    const[local, setLocal] = useState('')
    const[dataInicio, setDataInicio] = useState('')
    const[dataEntrega, setDataEntrega] = useState('')
    const[valorPago, setValorPago] = useState('')
  
  
    function AdicionarObra(){
      const novaObra = [nomeObra,responsavel,local,dataInicio,dataEntrega,valorPago]
      console.log(novaObra);
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Adicionar Obra</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput placeholder="Nome Obra:" onIonChange={(e: any)=> setNomeObra(e.target.value)}></IonInput>
  
          <IonInput  placeholder="Responsável:" onIonChange={(e: any)=> setResponsavel(e.target.value)}></IonInput>
  
          <IonInput  placeholder="Local:" onIonChange={(e: any)=> setLocal(e.target.value)}></IonInput>

          <IonInput  placeholder="Data de Inicio:    (dd-mm-aaaa)" onIonChange={(e: any)=> setDataInicio(e.target.value)}></IonInput>

          <IonInput  placeholder="Data de Entrega:   (dd-mm-aaaa)" onIonChange={(e: any)=> setDataEntrega(e.target.value)}></IonInput>

          <IonInput  placeholder="Valor Pago pela Obra:" onIonChange={(e: any)=> setValorPago(e.target.value)}></IonInput>
  
          <IonButton onClick={AdicionarObra}>Adicionar Obra</IonButton>
          </IonContent>
      </IonPage>
   );
};
export default AdicionarObra;
    