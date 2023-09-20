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

app.post('/obras/api/data', (req, res) => {
  try {
    const data = req.body;
    /* funcoes.alterarSituação(indice , situacao); */

    res.status(200).json({ message: 'Índice e situação recebidos com sucesso!' , data});
    funcoes.alterarSituação(data.index , data.situacao)
  } catch (error) {
    console.error('Erro ao processar a solicitação POST:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação POST' });
  }
})


app.listen(port, ()=>{
    console.log(`http://localhost:${port}/obras/api`)
}) 





