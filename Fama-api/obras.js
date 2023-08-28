const fs = require('fs');
const { json } = require('stream/consumers');

//por enquanto só está analisando obra1

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

    const dataDeInicio = jsonObject.obra1.datas.dataDeInicio; //por enquanto só está analisando obra1
    const diaDeInicio = dataDeInicio.dia;
    const mesDeInicio = dataDeInicio.mes;
    const anoDeInicio = dataDeInicio.ano;
    
    //data formatada para funcionar nas funções date fns ->
    const dataDeInicioForm = new Date(anoDeInicio, mesDeInicio - 1 , diaDeInicio ); /* o -1 ocorre pois mes inicial é 0 para a biblioteca */ 

    const diferencaDias = differenceInDays(dataAtual, dataDeInicioForm);

    jsonObject.obra1.datas.diasDecorridos = diferencaDias;

    console.log(`A diferença de dias absolutos entre a data de início e a data atual é: ${diferencaDias} dias`); 
    fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

    //se atraso -> dias de atraso
    const dataDeEntrega = jsonObject.obra1.datas.dataDeEntrega;
    const diaDeEntrega = dataDeEntrega.dia;
    const mesDeEntrega = dataDeEntrega.mes;
    const anoDeEntrega = dataDeEntrega.ano;

    const dataDeEntregaForm = new Date(anoDeEntrega, mesDeEntrega - 1 , diaDeEntrega ) //data formatada para funcionar nas funções date fns

    const diferencaDiasAtraso = differenceInDays(dataAtual, dataDeEntregaForm);
    if (diferencaDiasAtraso > 0) {
      jsonObject.obra1.datas.diasAtrasados = diferencaDiasAtraso;
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

  const gastosEfetuados = jsonObject.obra1.orçamento.gastosEfetuados;
  const gastosPendentes = jsonObject.obra1.orçamento.gastosPendentes;

  var somaGastosEfetuados = 0;
  for(gasto of gastosEfetuados){
    somaGastosEfetuados += gasto.valor
  }

  jsonObject.obra1.orçamento.somaGastosEfetuados = somaGastosEfetuados;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  var somaGastosPendentes = 0;
  for(gasto of gastosPendentes){
    somaGastosPendentes += gasto.valor
  }

  jsonObject.obra1.orçamento.somaGastosPendentes = somaGastosPendentes;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  valorPagoObra = jsonObject.obra1.orçamento.valorPagoObra
  credito = valorPagoObra - somaGastosEfetuados


  jsonObject.obra1.orçamento.credito = credito;
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeGastos = somaGastosEfetuados + somaGastosPendentes
  jsonObject.obra1.orçamento.projecaoDeGastos = projecaoDeGastos
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  const projecaoDeCredito = credito - somaGastosPendentes
  jsonObject.obra1.orçamento.projecaoDeCredito = projecaoDeCredito
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');


})
}



orçamentoCalculo();