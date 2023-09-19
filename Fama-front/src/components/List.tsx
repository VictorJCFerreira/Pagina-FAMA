import './List.css';
import React, { useState } from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';

import axios from "axios";

const url = "http://localhost:9000/obras/api"


async function DadoObra() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}



function List() {
  const [responsavel, setResponsavel] = useState("");
  const [dataDeInicio , setDataDeInicio] = useState({
    "dia": 0,
    "mes": 0,
    "ano": 0
  },);
  const [dataDeEntrega , setDataDeEntrega] = useState({
    "dia": 0,
    "mes": 0,
    "ano": 0
  },);
  const [diasDecorridos , setDiasDecorridos] = useState(0);
  const [diasAtrasdos , setDiasAtrasados] = useState(0);

  DadoObra()
      .then((obrasData) => {
        setResponsavel(obrasData[0].responsavel);
        setDataDeInicio(obrasData[0].datas.dataDeInicio);
        setDataDeEntrega(obrasData[0].datas.dataDeEntrega);
        setDiasDecorridos(obrasData[0].datas.diasDecorridos);
        setDiasAtrasados(obrasData[0].datas.diasAtrasados);
      })
      .catch((error) => {
        console.error('Erro ao obter dados das obras:',error);
      });
  return (
    <IonList>
      <IonItem>
        <IonLabel>{responsavel}</IonLabel>
      </IonItem>
       <IonItem>
        <IonLabel>Data de início: {dataDeInicio.dia}/{dataDeInicio.mes}/{dataDeInicio.ano}</IonLabel>
      </IonItem> 
      <IonItem>
        <IonLabel>Data de Entrega: {dataDeEntrega.dia}/{dataDeEntrega.mes}/{dataDeEntrega.ano}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Dias decorridos: {diasDecorridos}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Dias atrasados: {diasAtrasdos}</IonLabel>
      </IonItem>
    </IonList>
  );
}
export default List;