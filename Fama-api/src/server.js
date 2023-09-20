const express = require('express')
const fs = require('fs')
const app = express() 
const cors = require('cors')

const funcoes = require('../obras');

const port = 9000

app.use(cors())
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const caminhoArquivo = '../obras.json';


app.get('/obras/api', function (req, res) {
    fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
        if (err) {
          console.error('Erro:', err);
          return res.status(500).json({ error: 'Erro ao escrever o arquivo JSON' });
        }
        const jsonObject = JSON.parse(jsonContent);

        res.json(jsonObject);
        
    })
});


app.post('/obras/api/atualizarDatas', (req ,res) => {
  try {
    res.status(200).json({ message: "call de atualização recebida com sucesso!" });
    funcoes.verificaDias();

  } catch (error) {
    console.error('Erro ao processar a solicitação POST:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação POST' });
  }
})

app.post('/obras/api/alterarSituacao', (req, res) => {
  try {
    const data = req.body;
    res.status(200).json({ message: 'Índice e situação recebidos com sucesso!' , data});
    funcoes.alterarSituação(data.index , data.situacao)
  } catch (error) {
    console.error('Erro ao processar a solicitação POST:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação POST' });
  }
})

app.post('/obras/api/efetuarGasto', (req, res) => {
  try {
    const data = req.body;
    res.status(200).json({ message: 'Índice e situação recebidos com sucesso!' , data});
    funcoes.efetuarGasto(data.index , data.situacao)
  } catch (error) {
    console.error('Erro ao processar a solicitação POST:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação POST' });
  }
})


app.post('/obras/api/adicionarPendente', (req, res) => {
  try {
    const data = req.body;
    res.status(200).json({ message: 'Valores recebidos' , data});
    funcoes.novoGastoPendente(data.tipoDeGasto , data.descricao , data.resultado ,  () => {
      funcoes.orçamentoCalculo(); // Chama a função após a conclusão
    })
  } catch (error) {
    console.error('Erro ao processar a solicitação POST:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação POST' });
  }
})



app.listen(port, ()=>{
    console.log(`http://localhost:${port}/obras/api`);
}) 


