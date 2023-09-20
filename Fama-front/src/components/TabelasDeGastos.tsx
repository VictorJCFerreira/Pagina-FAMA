import React, { useEffect, useState } from 'react';
import { IonCol,
IonGrid,
IonRow,
IonFab, 
IonLabel, 
IonItem ,
IonModal, 
IonButton,
IonInput,
IonSelect,
IonSelectOption} from '@ionic/react';
import './TabelaDeGastos.css';
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


function TabelaGastosEfetuados() {

  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [mostrarModalEditarSituação, setMostrarModalEditarSituacao] = useState(false);

  const [indiceClicado, setIndiceClicado] = useState<number | null>(null);
  
  const [situacao, setSituação] = useState(""); // Estado para armazenar a situação digitada

  const [gastosEfetuados, setGastosEfetuados] = useState([
    { tipoDeGasto: "", descricao: "", valor: 0, situacao: "" },
  ])
    DadoObra()
      .then((obrasData) => {
        setGastosEfetuados(obrasData[0].orçamento.gastosEfetuados);
      })
      .catch((error) => {
        console.error('Erro ao obter dados das obras:', error);
      });


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
  
  const enviarIndiceESituacaoParaAPI = (index : any , situacao : any) => {
    const data = {index, situacao}; // Os dados que você deseja enviar para a API
    const urlData = "http://localhost:9000/obras/api/alterarSituacao";

    axios.post(urlData, data)
      .then((response) => {
        console.log('Resposta da API recebida:', response.data);
      })  
      .catch((error) => {
          // Trate erros da API aqui
          console.error('Erro ao enviar índice para a API:', error);
        });

  };

  const handleConfirmarSituaçãoNova = () => {
    if (indiceClicado !== null) {
      // Usar função de mudar situação que está no js
      if (situacao == ""){
        setMostrarModalEditarSituacao(false);
      }
      else{
        console.log("Situação digitada para o índice:", indiceClicado, situacao);
        enviarIndiceESituacaoParaAPI(indiceClicado, situacao);
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

      <IonModal>
        <div id='Results'></div>
      </IonModal>
    </IonGrid>
    
    
    

    
  );
}
export default TabelaGastosEfetuados;



function TabelaGastosPendentes() {
  
  const [mostrarModalAdicionarPendente, setMostrarModalAdicionarPendente] = useState(false);
  
  const [TabelaGastosPendentes, setGastosPendentes] = useState([
    { tipoDeGasto: "", descricao: "", valor: 0 },
  ]);

  
  const [valor1, setValor1] = useState<number | null>(null); // Estado para o primeiro valor
  const [valor2, setValor2] = useState<number | null>(null); // Estado para o segundo valor
  const [descricao, setDescricao] = useState("") // estado para situaçao
  const [valorResultado, setValorResultado] = useState<number | null>(null); // Estado para o segundo valor
  DadoObra()
  .then((obrasData) => {
    setGastosPendentes(obrasData[0].orçamento.gastosPendentes);
  })
  .catch((error) => {
    console.error('Erro ao obter dados das obras:', error);
  });

  const tiposDeGasto =  
  [ "Material" , "Mão de obra" , "Equipamentos e Ferramentas" , "Licenças e Permissões" ,
    "Serviços Profissionais" , "Transporte e Logística" , "Água, Eletricidade e Gás" ,
    "Gerenciamento de Resíduos" , "Comunicação e Tecnologia" , "Segurança e Saúde Ocupacional" ,
    "Contingências e Reservas" , "Outros Custos Variáveis"
  ]
    
  // Aqui o Json  ImportantList será usado
  const [tipoDeGastoSelecionado, setTipoDeGastoSelecionado] = useState(""); // Estado para armazenar a situação digitada

  function handleAbrirModalAdicionarPendente() {
    setMostrarModalAdicionarPendente(true);
  }

  // Função para verificar se todas as entradas estão preenchidas
  const verificarEntradasPreenchidas = () => {
    return tipoDeGastoSelecionado !== "" && valor1 !== null && valor2 !== null && descricao !== "";
  }

  

  const handleFecharModalAdicionarPendente = () => {
    setMostrarModalAdicionarPendente(false);
    setDescricao("");
    setTipoDeGastoSelecionado("");
    setValor1(null);
    setValor2(null);
  }
  
  const handleConfirmarNovoTipo = () => {
    if (verificarEntradasPreenchidas()) {
      // Lógica para processar o tipo de gasto aqui 
      // Usar função de mudar situação que está no js
      // Provavelmente essa parte irá sofrer bastantes alterações
      
      setMostrarModalAdicionarPendente(false);
    
      console.log("Tipo de gasto: " , tipoDeGastoSelecionado, valor1 , valor2 , descricao);
      


      // verifica se o tipo é material
      const materialSelecionado = tipoDeGastoSelecionado === "Material";

      const enviarValores = (tipoDeGasto : any , descricao :any ,resultado : any ) => {
        const data = {tipoDeGasto, descricao ,resultado}; // Os dados que você deseja enviar para a API
        const urlData = "http://localhost:9000/obras/api/adicionarPendente";
    
        axios.post(urlData, data)
          .then((response) => {
            console.log('Resposta da API recebida:', response.data);
          })  
          .catch((error) => {
              // Trate erros da API aqui
              console.error('Erro ao enviar índice para a API:', error);
            });
    
      };
      // aqui valorTotal vai receber um resultado dependendo da informação escolhida
      if(materialSelecionado){
        if (typeof valor1 === 'string' && typeof valor2 === 'string') {
          const resultadoMultiplicacao = parseInt(valor1) * parseInt(valor2);
          enviarValores(tipoDeGastoSelecionado,descricao, resultadoMultiplicacao)
          
      }
      } else {
        //fazer o que precisa caso não seja Material (valor2 está anexado como -1 , apenas trabalhe com valor1 como valorTotal)
      }

      // Restaure os campos para seus valores iniciais
      setTipoDeGastoSelecionado("");
      setValor1(null);
      setValor2(null);
      setDescricao("")

      
    } else {
      // Caso alguma entrada não esteja preenchida, você pode mostrar uma mensagem de erro ou alerta aqui
      console.log("Por favor, preencha todas as entradas.");
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
  
        </IonRow>
        {TabelaGastosPendentes.map((item, index) => (
        <IonRow key={index}>
          <IonCol>{item.tipoDeGasto}</IonCol>
          <IonCol>{item.descricao}</IonCol>
          <IonCol>{item.valor}</IonCol>
        </IonRow>
      ))}
      
      <IonRow>
      <IonCol><IonButton size= "small" onClick={handleAbrirModalAdicionarPendente}>+</IonButton></IonCol>
      </IonRow>
      <IonModal isOpen={mostrarModalAdicionarPendente} onDidDismiss={handleFecharModalAdicionarPendente}>
      <div className="modal-content">
      <div>Adicionar gasto Pendente</div>
      {/* Lista suspensa para os tipos de gasto */}

      <IonSelect
        placeholder="Selecione o tipo de gasto"
        className="custom-select"
        value={tipoDeGastoSelecionado}
        onIonChange={(e) => {
          setTipoDeGastoSelecionado(e.detail.value);
        }}
        >
        {tiposDeGasto.map((tipo) => (
          <IonSelectOption key={tipo} value={tipo}>
            {tipo}
          </IonSelectOption>
        ))}
        
      {/* Adicione mais opções conforme necessário */}
      </IonSelect>
      <div style={{ margin: '1%' }}></div>

    {/* Adicione o rótulo para o campo de valor */}
    <IonInput
      placeholder="Digite a descrição"
      onIonChange={(e) => setDescricao(e.detail.value!)}
      className="custom-input"
    />
    <div style={{ margin: '1%' }}></div>
    
    {/* Condicionalmente renderize um único campo de entrada com base no tipo de gasto */}
    {tipoDeGastoSelecionado === "Material" ?(
      <div>
        <IonLabel position="floating"></IonLabel>
        <IonInput
          className="custom-select"
          placeholder="Preço por m^2/m^3"
          type="number" 
          onIonChange={(e : any) => {
            setValor1(e.detail.value);
          }}
        />
        
        <IonLabel position="floating"></IonLabel>
        <IonInput
          className="custom-select"
          placeholder="quantidade m^2/m^3"
          type="number"
          onIonChange={(e : any) => {
            setValor2(e.detail.value);
          }} 
        />
      </div>
    ) : (
      <div>
        <IonLabel position="floating"></IonLabel>
        <IonInput
          className="custom-select"
          placeholder="Digite o valor"
          type="number"
          onIonChange={(e : any) => {
            setValor1(e.detail.value);
            setValor2(-1);
          }}
        />
      </div>
    )}
      
      <IonButton onClick={handleConfirmarNovoTipo}>Confirmar</IonButton>
      <IonButton onClick={handleFecharModalAdicionarPendente}>Fechar</IonButton>
      </div>
      </IonModal>
      <div style={{ margin: '5%' }}></div>

    </IonGrid>
    );
}
export { TabelaGastosPendentes };



function TabelaGastosPendentesComBotao() {
  //substituir essas variaveis pelas que estão no json
  const [TabelaGastosPendentes, setTabelaGastosPendentes] = useState([
    { tipoDeGasto: "", descricao: "", valor: 0 }, 
  ]);
  
  DadoObra()
    .then((obrasData) => {
      setTabelaGastosPendentes(obrasData[0].orçamento.gastosPendentes);
    })
    .catch((error) => {
      console.error('Erro ao obter dados das obras:',error);
    });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [situacao, setSituação] = useState(""); // Estado para armazenar a situação digitada
  const [indiceClicado, setIndiceClicado] = useState<number | null>(null);
  
  const handleMostrarModal = (index : number) => {
    setIndiceClicado(index); // Armazene o índice
    setMostrarModal(true);
  }

  const handleFecharModal = () => {
    setMostrarModal(false);
    setSituação(""); // Limpar o campo de situação ao fechar o modal
  }

  const enviarIndiceESituacaoParaAPI = (index : any , situacao : any) => {
    const data = {index, situacao}; // Os dados que você deseja enviar para a API
    const urlData = "http://localhost:9000/obras/api/efetuarGasto";

    axios.post(urlData, data)
      .then((response) => {
        console.log('Resposta da API recebida:', response.data);
      })  
      .catch((error) => {
          // Trate erros da API aqui
          console.error('Erro ao enviar índice para a API:', error);
        });

  };
  const handleConfirmarSituação = () => {
    if (indiceClicado !== null) {
      // Usar função de efetuar pagamento que está no js
      console.log("Situação digitada para o índice:", indiceClicado, situacao);
      enviarIndiceESituacaoParaAPI(indiceClicado,situacao)
      


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

