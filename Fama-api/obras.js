const fs = require('fs');
const { json } = require('stream/consumers');

//calcula dias decorridos e dias atrasados


const caminhoArquivo = './obras.json';
fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  const { differenceInDays } = require('date-fns');  
  const jsonObject = JSON.parse(jsonContent);
  const dataAtual = new Date();

  const dataDeInicio = jsonObject.obra1.datas.dataDeInicio;
  const diaDeInicio = dataDeInicio.dia;
  const mesDeInicio = dataDeInicio.mes;
  const anoDeInicio = dataDeInicio.ano;
  
  const dataInicioProjeto = new Date(anoDeInicio, mesDeInicio - 1 , diaDeInicio ); /* o -1 ocorre pois mes inicial é 0 para a biblioteca */

  const diferencaDias = differenceInDays(dataAtual, dataInicioProjeto);

  jsonObject.obra1.datas.diasDecorridos = diferencaDias;

  console.log(`A diferença de dias absolutos entre a data de início e a data atual é: ${diferencaDias} dias`); 
  fs.writeFileSync(caminhoArquivo, JSON.stringify(jsonObject, null, 2), 'utf-8');

  console.log('Valor de diasDecorridos atualizado.');
});
