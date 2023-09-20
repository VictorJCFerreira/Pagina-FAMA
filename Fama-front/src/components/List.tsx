import './List.css';
import React, { useState } from 'react';
import { IonCol, IonItem, IonLabel, IonList, IonRow, IonTitle } from '@ionic/react';

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


function atualizarDatas(){
  const urlInfo = "http://localhost:9000/obras/api/atualizarDatas"
  //data de dias
  axios.post(urlInfo)
    .then((response) => {
      console.log('Resposta da API recebida:', response);
    })  
    .catch((error) => {
        // Trate erros da API aqui
        console.error('Erro ao enviar a call para atualizar data', error);
      });
}
export {atualizarDatas}


function Titulo() {
  const[nomeObra, setNomeObra] = useState('')
  DadoObra()
    .then((obrasData) => {
      setNomeObra(obrasData[0].nomeObra)
    })
    .catch((error) => {
      console.error('Erro ao obter dados das obras:',error);
    });
  return (
    <IonTitle>Nome da Obra: {nomeObra}</IonTitle>
  )
}
export {Titulo};



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
  const [valorPagoObra , setValorPagoObra] = useState(0);
  const [somaGastosEfetuados , setSomaGastosEfetuados] = useState(0);
  const [somaGastosPendentes , setSomaGastosPendentes] = useState(0);
  const [credito , setCredito] = useState(0);
  const [projecaoDeGastos , setProjecaoDeGastos] = useState(0);
  const [projecaoDeCredito , setProjecaoDeCredito] = useState(0);

  DadoObra()
    .then((obrasData) => {
      setResponsavel(obrasData[0].responsavel);
      setDataDeInicio(obrasData[0].datas.dataDeInicio);
      setDataDeEntrega(obrasData[0].datas.dataDeEntrega);
      setDiasDecorridos(obrasData[0].datas.diasDecorridos);
      setDiasAtrasados(obrasData[0].datas.diasAtrasados);
      setValorPagoObra(obrasData[0].orçamento.valorPagoObra);
      setSomaGastosEfetuados(obrasData[0].orçamento.somaGastosEfetuados);
      setSomaGastosPendentes(obrasData[0].orçamento.somaGastosPendentes);
      setCredito(obrasData[0].orçamento.credito);
      setProjecaoDeGastos(obrasData[0].orçamento.projecaoDeGastos);
      setProjecaoDeCredito(obrasData[0].orçamento.projecaoDeCredito)
    })
    .catch((error) => {
      console.error('Erro ao obter dados das obras:',error);
    });
  return (
    <IonList>
      <IonItem>
        <IonLabel>Responsável: {responsavel}</IonLabel>
      </IonItem>
      <IonRow className='ion-col2'>
        <IonCol className='ion-col2'>Data de Início: {dataDeInicio.dia}/{dataDeInicio.mes}/{dataDeInicio.ano}</IonCol>
        <IonCol className='ion-col2'>Data de Entrega: {dataDeEntrega.dia}/{dataDeEntrega.mes}/{dataDeEntrega.ano}</IonCol>
      </IonRow>
      <div style={{ margin: '0.5%' }}></div>
      <IonRow className='ion-col2'>
        <IonCol className='ion-col2'>Dias Decorridos: {diasDecorridos}</IonCol>
        <IonCol className='ion-col2'>Dias Atrasados: {diasAtrasdos}</IonCol>
      </IonRow>
      

      <div style={{ margin: '2%' }}></div>
      

      <IonRow className='ion-col2'>
        <IonCol className='ion-col2'>Valor Pago pela Obra: {valorPagoObra}</IonCol>
        <IonCol className='ion-col2'>Credito: {credito}</IonCol>
      </IonRow>
      <div style={{ margin: '0.5%' }}></div>

      <IonRow className='ion-col2'>
        <IonCol className='ion-col2'>Soma dos Gastos Efetuados: {somaGastosEfetuados}</IonCol>
        <IonCol className='ion-col2'>Soma dos Gastos Pendentes: {somaGastosPendentes}</IonCol>
      </IonRow>
      
      <IonRow className='ion-col2'>
        <IonCol className='ion-col2'>Projeção de Gastos: {projecaoDeGastos}</IonCol>
        <IonCol className='ion-col2'>Projeção de Créditos: {projecaoDeCredito}</IonCol>
      </IonRow>
    </IonList>
  );
}
export default List;