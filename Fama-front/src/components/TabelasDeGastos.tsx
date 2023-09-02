import React, { useState } from 'react';
import { IonCol,
IonGrid,
IonRow,
IonFab, 
IonFabButton, 
IonIcon ,
IonModal, 
IonButton,
IonInput,
IonAlert} from '@ionic/react';
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
      
      <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
      <div>Efetuar gasto</div>
      <TabelaGastosPendentesComBotao/>
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

function TabelaGastosPendentesComBotao() {
  const [TabelaGastosPendentes, setGastosEfetuados] = useState([
    { tipoDeGasto: "Material", descricao: "Tijolo 2", valor: 5 },
    { tipoDeGasto: "Material", descricao: "Tijolo 3", valor: 12 }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [situação, setSituação] = useState(""); // Estado para armazenar a situação digitada

  const handleMostrarModal = () => {
    setMostrarModal(true);
  }

  const handleFecharModal = () => {
    setMostrarModal(false);
    setSituação(""); // Limpar o campo de situação ao fechar o modal
  }


  const handleConfirmarSituação = () => {
    // Lógica para processar a situação aqui
    console.log("Situação digitada:", situação);
    setMostrarModal(false); // Feche o modal após confirmar a situação
  }


  return (
      <IonGrid>
        <IonRow>
          <IonCol>Gastos Pendentes</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>Tipo de gasto</IonCol>
          <IonCol>Descrição</IonCol>
          <IonCol>Valor</IonCol>
          <IonCol>Adicionar</IonCol>
        </IonRow>
        {TabelaGastosPendentes.map((item, index) => (
        <IonRow key={index}>
          <IonCol>{item.tipoDeGasto}</IonCol>
          <IonCol>{item.descricao}</IonCol>
          <IonCol>{item.valor}</IonCol>
          {/* Adicione um botão "+" para cada item */}
          <IonCol>
          <IonButton onClick={handleMostrarModal}>+</IonButton>
          </IonCol>
        </IonRow>
      ))}
       <IonModal isOpen={mostrarModal} onDidDismiss={handleFecharModal}  className="modal-centered">
        <div className="modal-content">
          <IonInput
            placeholder="Digite a situação"
            value={situação}
            onIonChange={(e) => setSituação(e.detail.value!)}
            className="custom-input"
          />
          <IonButton onClick={handleConfirmarSituação}>Confirmar</IonButton>
          <IonButton onClick={handleFecharModal}>Cancelar</IonButton>
        </div>
      </IonModal>
      </IonGrid>
    );
}

