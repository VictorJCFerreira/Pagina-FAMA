import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonInput} from '@ionic/react';
import './AdicionarObra.css';
import React, { useState } from 'react';


const AdicionarObra: React.FC = () => {

    const[nomeObra, setNomeObra] = useState('')
    const[responsavel, setResponsavel] = useState('')
    const[local, setLocal] = useState('')
    const[diaInicio, setDiaInicio] = useState('')
    const[mesInicio, setMesInicio] = useState('')
    const[anoInicio, setAnoInicio] = useState('')
    const[diaEntrega, setDiaEntrega] = useState('')
    const[mesEntrega, setMesEntrega] = useState('')
    const[anoEntrega, setAnoEntrega] = useState('')
    const[valorPago, setValorPago] = useState('')
  
  
    function AdicionarObra(){
      const novaObra = [nomeObra,responsavel,local,diaInicio,mesInicio,anoInicio,diaEntrega,mesEntrega,anoEntrega,valorPago]
      if(nomeObra == "" || responsavel == "" || local == "" || diaInicio == '' || mesInicio == '' || anoInicio == '' || diaEntrega == '' || mesEntrega == '' || anoEntrega == '' || valorPago == ''){

      }else
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
          <IonInput required placeholder="Nome Obra:" onIonChange={(e: any)=> setNomeObra(e.target.value)}></IonInput>
  
          <IonInput required placeholder="Responsável:" onIonChange={(e: any)=> setResponsavel(e.target.value)}></IonInput>
  
          <IonInput required placeholder="Local:" onIonChange={(e: any)=> setLocal(e.target.value)}></IonInput>

          <IonInput  required type='number' placeholder="Dia de Inicio:    " onIonChange={(e: any)=> setDiaInicio(e.target.value)}></IonInput>
          <IonInput  required type='number' placeholder="Mês de Inicio:    " onIonChange={(e: any)=> setMesInicio(e.target.value)}></IonInput>
          <IonInput  required type='number' placeholder="Ano de Inicio:    " onIonChange={(e: any)=> setAnoInicio(e.target.value)}></IonInput>

          <IonInput  required type='number' placeholder="Data de Entrega:  " onIonChange={(e: any)=> setDiaEntrega(e.target.value)}></IonInput>
          <IonInput  required type='number' placeholder="Data de Entrega:  " onIonChange={(e: any)=> setMesEntrega(e.target.value)}></IonInput>
          <IonInput  required type='number' placeholder="Data de Entrega:  " onIonChange={(e: any)=> setAnoEntrega(e.target.value)}></IonInput>

          <IonInput  required type='number' placeholder="Valor Pago pela Obra:" onIonChange={(e: any)=> setValorPago(e.target.value)}></IonInput>
  
          <IonButton onClick={AdicionarObra}>Adicionar Obra</IonButton>
          </IonContent>
      </IonPage>
   );
};
export default AdicionarObra;
    