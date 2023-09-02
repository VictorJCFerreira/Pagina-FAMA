import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow , IonFab, IonFabButton, IonIcon , IonModal, IonButton} from '@ionic/react';
import { add } from 'ionicons/icons';
import './TabelaDeGastos.css';

function TabelaGastosEfetuados() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [gastosEfetuados, setGastosEfetuados] = useState([
    { tipoDeGasto: "Pedreiro", descricao: "Mestre de obras", valor: 20, situacao: "Confirmado" },
    { tipoDeGasto: "Material", descricao: "Tijolo 1", valor: 5, situacao: "Confirmado" }
  ]);

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  function adicionarItem() {
    // Lógica para adicionar um novo item à lista de gastos efetuados
    const novoItem = { tipoDeGasto: "Novo Gasto", descricao: "Descrição", valor: 0, situacao: "Pendente" };
    setGastosEfetuados([...gastosEfetuados, novoItem]);
  }
  
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
      {gastosEfetuados.map((item, index) => (
        <IonRow key={index}>
          <IonCol>{item.tipoDeGasto}</IonCol>
          <IonCol>{item.descricao}</IonCol>
          <IonCol>{item.valor}</IonCol>
          <IonCol>{item.situacao}</IonCol>
        </IonRow>
      ))}
      
      <IonFab>
      <IonFabButton size= "small" onClick={abrirModal}>
      <IonIcon icon={add}></IonIcon>
      </IonFabButton>
      </IonFab>
      <div style={{ margin: '50px' }}></div>
      {/* Modal */}
      
      <IonModal isOpen={mostrarModal}>
      <div>Efetuar gasto</div>
      <TabelaGastosPendentes/>
      <IonButton onClick={fecharModal}>Fechar</IonButton>
      </IonModal>
    </IonGrid>
    
    

    
  );
}
export default TabelaGastosEfetuados;

function TabelaGastosPendentes() {
  const [TabelaGastosPendentes, setGastosEfetuados] = useState([
    { tipoDeGasto: "Material", descricao: "Tijolo 2", valor: 5 },
    { tipoDeGasto: "Material", descricao: "Tijolo 3", valor: 12 }
  ]);

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
        {TabelaGastosPendentes.map((item, index) => (
        <IonRow key={index}>
          <IonCol>{item.tipoDeGasto}</IonCol>
          <IonCol>{item.descricao}</IonCol>
          <IonCol>{item.valor}</IonCol>
        </IonRow>
      ))}
        
      </IonGrid>
    );
}
export { TabelaGastosPendentes };



