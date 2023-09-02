const fs = require('fs');
const { json } = require('stream/consumers');

//por enquanto só está analisando[0]

//calcula dias decorridos e dias atrasados


const caminhoArquivo = './obras.json';

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


function efetuarGasto() {
  fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    if (err) {
      console.error('Erro:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonContent);
    
    const gastosPendentes = jsonObject[0].orçamento.gastosPendentes;

    numero = 0
    situacao = "Entregue"

    gastosPendentes[numero].situacao = situacao

    const gastoEfetuado = gastosPendentes[numero];

    jsonObject[0].orçamento.gastosEfetuados.push(gastoEfetuado);
    jsonObject[0].orçamento.gastosPendentes.splice(numero, 1)
    

    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');
  

  })
}


