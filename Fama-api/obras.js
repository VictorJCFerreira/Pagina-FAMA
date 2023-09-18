const fs = require('fs');
const { json } = require('stream/consumers');
import axios from "axios";

const url = "http://localhost:9000/obras/api"


function getObras(){
  axios.get(url)
  .then(response =>{
    const dados = response.data
  console.log(dados)
  })
  .catch(error => console.log(error))
};


function getObra(){
  axios.get(`${url}/id`)
  .then(response =>{
    const dados = response.data
    Result.textContent = JSON.stringify(dados)
  })
  .catch(error => console.log(error))
};


function addNewObra(){
  axios.post(url, {
    nomeObra: "Edificio Nice",
    responsavel: "José Teste",
    local: "Boa Viagem, Rua X, Y°",
  })
  .then(response =>{
    console.log(response.data)
  })
  .catch(error => console.log(error))
};


function updateObra(){
  axios.put(`${url}/:id`, {
    nomeObra: "ExNome",
    responsavel: "ExResp",
    local: "Exlocal",
  })
  .then(response =>{
    const dados = response.data
    alert(JSON.stringify(dados))
  })
  .catch(error => console.log(error))
};


function deleteObra(){
  axios.delete(`${url}/:id`)
  .then(response =>{
    const dados = response.data
    alert(JSON.stringify(dados))
  })
  .catch(error => console.log(error))
};



//por enquanto só está analisando[0]

const caminhoArquivo = './obras.json';

//calcula dias decorridos e dias atrasados
function verificaDias() 
{
  fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    
    //dias decorridos
    if (err) {
      console.error('Erro:', err);
      return;
    }
    const { differenceInDays } = require('date-fns');  
    const jsonObject = JSON.parse(jsonContent);
    const dataAtual = new Date();

    const dataDeInicio = jsonObject[0].datas.dataDeInicio; //por enquanto só está analisando[0]
    const diaDeInicio = dataDeInicio.dia;
    const mesDeInicio = dataDeInicio.mes;
    const anoDeInicio = dataDeInicio.ano;
    
    //data formatada para funcionar nas funções date fns ->
    const dataDeInicioForm = new Date(anoDeInicio, mesDeInicio - 1 , diaDeInicio ); /* o -1 ocorre pois mes inicial é 0 para a biblioteca */ 

    const diferencaDias = differenceInDays(dataAtual, dataDeInicioForm);

    jsonObject[0].datas.diasDecorridos = diferencaDias;
    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

    //se atraso -> dias de atraso
    const dataDeEntrega = jsonObject[0].datas.dataDeEntrega;
    const diaDeEntrega = dataDeEntrega.dia;
    const mesDeEntrega = dataDeEntrega.mes;
    const anoDeEntrega = dataDeEntrega.ano;

    const dataDeEntregaForm = new Date(anoDeEntrega, mesDeEntrega - 1 , diaDeEntrega ) //data formatada para funcionar nas funções date fns

    const diferencaDiasAtraso = differenceInDays(dataAtual, dataDeEntregaForm);
    if (diferencaDiasAtraso > 0) {
      jsonObject[0].datas.diasAtrasados = diferencaDiasAtraso;
      fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');
    }

  });
}


//Orçamento


//calcula: crédito , situação de lucro , projeção de gastos
function orçamentoCalculo(){
fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  const jsonObject = JSON.parse(jsonContent);

  const gastosEfetuados = jsonObject[0].orçamento.gastosEfetuados;
  const gastosPendentes = jsonObject[0].orçamento.gastosPendentes;

  var somaGastosEfetuados = 0;
  for(gasto of gastosEfetuados){
    somaGastosEfetuados += gasto.valor
  }

  jsonObject[0].orçamento.somaGastosEfetuados = somaGastosEfetuados;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  var somaGastosPendentes = 0;
  for(gasto of gastosPendentes){
    somaGastosPendentes += gasto.valor
  }

  jsonObject[0].orçamento.somaGastosPendentes = somaGastosPendentes;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  valorPagoObra = jsonObject[0].orçamento.valorPagoObra;
  credito = valorPagoObra - somaGastosEfetuados;


  jsonObject[0].orçamento.credito = credito;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeGastos = somaGastosEfetuados + somaGastosPendentes
  jsonObject[0].orçamento.projecaoDeGastos = projecaoDeGastos
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeCredito = credito - somaGastosPendentes
  jsonObject[0].orçamento.projecaoDeCredito = projecaoDeCredito
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');


});
}


function efetuarGasto(numero , situacao) {
  fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonContent);
    
    const gastosPendentes = jsonObject[0].orçamento.gastosPendentes;


    gastosPendentes[numero].situacao = situacao

    const gastoEfetuado = gastosPendentes[numero];

    jsonObject[0].orçamento.gastosEfetuados.push(gastoEfetuado);
    jsonObject[0].orçamento.gastosPendentes.splice(numero, 1)
    

    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');
  

  })
}


function alterarSituação(index, situacaonova){
  fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }

    const jsonObject = JSON.parse(jsonContent);


    //muda situação:
    jsonObject[0].orçamento.gastosEfetuados[index].situacao = situacaonova

    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  });
}

function novoGastoPendente(tipoDeGasto, descricao , valor){
  fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }
    
    const jsonObject = JSON.parse(jsonContent);
   
    const novoGastoPendente = {
      tipoDeGasto: tipoDeGasto,
      descricao: descricao,
      valor: valor
    };
  
    jsonObject[0].orçamento.gastosPendentes.push(novoGastoPendente)
    

    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  });
} 

novoGastoPendente("Material" , "tijolo 4" , 30)

module.exports = {
  verificaDias,
  orçamentoCalculo,
  efetuarGasto,
  alterarSituação,
  novoGastoPendente,
  getObra,
  getObras,
  addNewObra,
  updateObra,
  deleteObra,
}

