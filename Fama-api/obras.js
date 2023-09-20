const fs = require('fs');
const { json } = require('stream/consumers');


const url = "http://localhost:9000/obras/api"
const caminhoJson = '../obras.json'


//por enquanto só está analisando[0]

//calcula dias decorridos e dias atrasados
function verificaDias() 
{
  fs.readFile(caminhoJson, 'utf8', (err, jsonContent) => {
    
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
    fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

    //se atraso -> dias de atraso
    const dataDeEntrega = jsonObject[0].datas.dataDeEntrega;
    const diaDeEntrega = dataDeEntrega.dia;
    const mesDeEntrega = dataDeEntrega.mes;
    const anoDeEntrega = dataDeEntrega.ano;

    const dataDeEntregaForm = new Date(anoDeEntrega, mesDeEntrega - 1 , diaDeEntrega ) //data formatada para funcionar nas funções date fns

    const diferencaDiasAtraso = differenceInDays(dataAtual, dataDeEntregaForm);
    if (diferencaDiasAtraso > 0) {
      jsonObject[0].datas.diasAtrasados = diferencaDiasAtraso;
      fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');
    }

  });
}


//Orçamento


//calcula: crédito , situação de lucro , projeção de gastos
function orçamentoCalculo(){
fs.readFile(caminhoJson, 'utf8', (err, jsonContent) => {
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
  fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  var somaGastosPendentes = 0;
  for(gasto of gastosPendentes){
    somaGastosPendentes += gasto.valor
  }

  jsonObject[0].orçamento.somaGastosPendentes = somaGastosPendentes;
  fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  valorPagoObra = jsonObject[0].orçamento.valorPagoObra;
  credito = valorPagoObra - somaGastosEfetuados;


  jsonObject[0].orçamento.credito = credito;
  fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeGastos = somaGastosEfetuados + somaGastosPendentes
  jsonObject[0].orçamento.projecaoDeGastos = projecaoDeGastos
  fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeCredito = credito - somaGastosPendentes
  jsonObject[0].orçamento.projecaoDeCredito = projecaoDeCredito
  fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');


});
}


function efetuarGasto(numero , situacao) {
  if (!fs.existsSync(caminhoJson)) {
    console.error('O arquivo "obras.json" não existe.');
    return;
  }
  
  fs.readFile(caminhoJson, 'utf8', (err, jsonContent) => {
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
    

    fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');
  

  })
}


function alterarSituação(index, situacaonova){
  fs.readFile(caminhoJson, 'utf8', (err, jsonContent) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }

    const jsonObject = JSON.parse(jsonContent);


    //muda situação:
    jsonObject[0].orçamento.gastosEfetuados[index].situacao = situacaonova

    fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  });
}


//caso o tipoDeGasto seja Material a api vai ter q pegar o precoMetroQuadradoOucubico e quantidade 
//resgatar o valor no qual a função faz a conta , e jogar esse valor na função de adicionar gasto Pendente
function casoGastoMaterial(precoMetroQuadradoOuCubico, quantidade){
  return valor = precoMetroQuadradoOuCubico * quantidade;
}

function novoGastoPendente(tipoDeGasto, descricao , valor){
  fs.readFile(caminhoJson, 'utf8', (err, jsonContent) => {
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
    

    fs.writeFileSync(caminhoJson, JSON.stringify(jsonObject, null, 2), 'utf-8');

  });
} 



module.exports = {
  verificaDias,
  orçamentoCalculo,
  efetuarGasto,
  alterarSituação,
  novoGastoPendente
}

