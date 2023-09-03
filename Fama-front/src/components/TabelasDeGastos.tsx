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
IonSelect,
IonSelectOption} from '@ionic/react';
import './TabelaDeGastos.css';


function TabelaGastosEfetuados() {
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [mostrarModalEditarSituação, setMostrarModalEditarSituacao] = useState(false);

  const [indiceClicado, setIndiceClicado] = useState<number | null>(null);
  
  const [situação, setSituação] = useState(""); // Estado para armazenar a situação digitada

  const [gastosEfetuados, setGastosEfetuados] = useState([
    { tipoDeGasto: "Pedreiro", descricao: "Mestre de obras", valor: 20, situacao: "Confirmado" },
    { tipoDeGasto: "Material", descricao: "Tijolo 1", valor: 5, situacao: "Confirmado" }
  ]); //mudar aqui para o arquivo json

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  const handleAbrirModalEditarSituacao = (index : number) => {
    setIndiceClicado(index);
    setMostrarModalEditarSituacao(true);
  }

  const handleFecharModalEditarSituação = () => {
    setMostrarModalEditarSituacao(false);
    setSituação(""); // Limpar o campo de situação ao fechar o modal
  }
  
  const handleConfirmarSituaçãoNova = () => {
    
    if (indiceClicado !== null) {
      // Lógica para processar a situação aqui usando o índice
      // Usar função de mudar situação que está no js
      if (situação == ""){
        setMostrarModalEditarSituacao(false);
      }
      else{
        console.log("Situação digitada para o índice:", indiceClicado, situação);
        // Lógica para processar a situação
        setMostrarModalEditarSituacao(false); // Feche o modal após confirmar a situação
        setSituação("");
        setIndiceClicado(null); // Limpe o índice clicado
      }
    }
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
          <IonCol>{item.situacao} <IonButton onClick={() => handleAbrirModalEditarSituacao(index)} >Editar</IonButton></IonCol>
        </IonRow>
        
      ))}
      <IonModal isOpen={mostrarModalEditarSituação} onDidDismiss={handleFecharModalEditarSituação}  className="modal-centered">
        <div className="modal-content">
          <IonInput
            placeholder="Digite nova situação"
            value={situação}
            onIonChange={(e) => setSituação(e.detail.value!)}
            className="custom-input"
          />
          <IonButton onClick={handleConfirmarSituaçãoNova}>Confirmar</IonButton>
          <IonButton onClick={handleFecharModalEditarSituação}>Cancelar</IonButton>
        </div>
      </IonModal>


      <IonRow>
      <IonCol><IonButton size= "small" onClick={abrirModal}>+</IonButton></IonCol>
      </IonRow>
      <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
      <div>Efetuar gasto</div>
      <TabelaGastosPendentesComBotao/>
      <IonButton onClick={fecharModal}>Fechar</IonButton>
      </IonModal>
      <div style={{ margin: '5%' }}></div>
    </IonGrid>
    
    
    

    
  );
}
export default TabelaGastosEfetuados;

function TabelaGastosPendentes() {
  const [mostrarModalAdicionarPendente, setMostrarModalAicionarPendente] = useState(false);
  
  const [TabelaGastosPendentes, setGastosEfetuados] = useState([
    { tipoDeGasto: "Material", descricao: "Tijolo 2", valor: 5 },
    { tipoDeGasto: "Material", descricao: "Tijolo 3", valor: 12 }
  ]);

  function abrirModalAdicionarPendente() {
    setMostrarModalAicionarPendente(true);
  }

  const handleFecharModalEditarSituação = () => {
    setMostrarModalAicionarPendente(false);
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
  
        </IonRow>
        {TabelaGastosPendentes.map((item, index) => (
        <IonRow key={index}>
          <IonCol>{item.tipoDeGasto}</IonCol>
          <IonCol>{item.descricao}</IonCol>
          <IonCol>{item.valor}</IonCol>
        </IonRow>
      ))}
      
      <IonRow>
      <IonCol><IonButton size= "small" onClick={abrirModalAdicionarPendente}>+</IonButton></IonCol>
      </IonRow>
      <IonModal isOpen={mostrarModalAdicionarPendente} onDidDismiss={() => setMostrarModalAicionarPendente(false)}>
      <div>Adicionar gasto Pendente</div>
      {/* Lista suspensa para os tipos de gasto */}
      <IonSelect
        placeholder="Selecione o tipo de gasto"
        >
        <IonSelectOption value="Pedreiro">Pedreiro</IonSelectOption>
        <IonSelectOption value="Material">Material</IonSelectOption>
      {/* Adicione mais opções conforme necessário */}
      </IonSelect>
      <IonButton onClick={handleFecharModalEditarSituação}>Fechar</IonButton>
      </IonModal>
      <div style={{ margin: '5%' }}></div>

    </IonGrid>
    );
}
export { TabelaGastosPendentes };

function TabelaGastosPendentesComBotao() {
  //substituir essas variaveis pelas que estão no json
  const [TabelaGastosPendentes, setGastosEfetuados] = useState([
    { tipoDeGasto: "Material", descricao: "Tijolo 2", valor: 5 },
    { tipoDeGasto: "Material", descricao: "Tijolo 3", valor: 12 } 
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [situação, setSituação] = useState(""); // Estado para armazenar a situação digitada
  const [indiceClicado, setIndiceClicado] = useState<number | null>(null);
  
  const handleMostrarModal = (index : number) => {
    setIndiceClicado(index); // Armazene o índice
    setMostrarModal(true);
  }

  const handleFecharModal = () => {
    setMostrarModal(false);
    setSituação(""); // Limpar o campo de situação ao fechar o modal
  }


  const handleConfirmarSituação = () => {
    if (indiceClicado !== null) {
      // Lógica para processar a situação aqui usando o índice
      // Usar função de efetuar pagamento que está no js
      console.log("Situação digitada para o índice:", indiceClicado, situação);
    
      // Lógica para processar a situação
      setMostrarModal(false); // Feche o modal após confirmar a situação
      setSituação("");
      setIndiceClicado(null); // Limpe o índice clicado
    }
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
          <IonButton onClick={() => handleMostrarModal(index)}>+</IonButton>
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

