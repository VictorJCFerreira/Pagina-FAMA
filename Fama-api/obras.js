const fs = require('fs');
const { json } = require('stream/consumers');

//calcula dias decorridos e dias atrasados

fs.readFile('./obras.json', 'utf8', (err, info) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  const { differenceInDays } = require('date-fns');  
  const jsonInfo = JSON.parse(info);
  const dataAtual = new Date();

  const dataDeInicio = jsonInfo.obra1.datas.dataDeInicio;
  const diaDeInicio = dataDeInicio.dia;
  const mesDeInicio = dataDeInicio.mes;
  const anoDeInicio = dataDeInicio.ano;
  
  const dataInicioProjeto = new Date(anoDeInicio, mesDeInicio - 1, diaDeInicio );

  const diferencaDias = differenceInDays(dataAtual, dataInicioProjeto);

  console.log(`A diferença de dias absolutos entre a data de início e a data atual é: ${diferencaDias} dias`); 

});
