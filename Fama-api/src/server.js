const express = require('express')
const fs = require('fs')
const app = express() 
const cors = require('cors')

const port = 9000

app.use(cors())

const caminhoArquivo = './obras.json';


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

app.post('/obras/api', (req, res) => {
    const dadosRecebidos = req.body; // Dados JSON enviados no corpo da solicitação
  
    
    fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
        if (err) {
          console.error('Erro:', err);
          return res.status(500).json({ error: 'Erro ao escrever o arquivo JSON' });
        }
      try {
        const jsonObject = JSON.parse(jsonContent);
  
        // Atualiza o objeto com os dados recebidos
        // Por exemplo, você pode copiar os dados recebidos para o objeto existente
        Object.assign(jsonObject[0], dadosRecebidos);
  
        // Escreve o objeto atualizado de volta no arquivo JSON
        fs.writeFile(caminhoArquivo, JSON.stringify(jsonObject, null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Erro:', writeErr);
            return res.status(500).json({ error: 'Erro ao escrever o arquivo JSON' });
          }
  
          res.json({ message: 'Dados atualizados com sucesso' });
        });
      } catch (parseError) {
        console.error('Erro ao analisar o JSON:', parseError);
        return res.status(500).json({ error: 'Erro ao analisar o JSON' });
      }
    });
  });



app.post('/obras/api', (req, res) => {
    obras.push({
        nomeObra: req.body.nomeObra,
        responsavel: req.body.responsavel,
        local: req.body.local,
    })
    res.json("Obra salva")
})




app.put('/obras/api/:id', (req, res) => {
    const obrasId = req.params.id

    const obra = obras.find(obra => Number(obra.id) === Number(obrasId))

    if(!obra){
        return res.json("Obra nao encontrada")
    }

    const updateObra = {
        ...obra,
        nomeObra: req.body.nomeObra,
        responsavel: req.body.responsavel,
        local: req.body.local,
    }

    obras = obras.map(obra=> {
        if(Number(obra.id) === Number(obrasId)) {
            obra = updateObra
        }
        return obra
    })

    res.json("Obra atualizada")
})



app.delete('/obras/api/:id', (req, res) =>{
    const obrasId = req.params.id

    obras = obras.filter(obra => Number(obra.id) !== Number(obrasId))

    res.json("Obra deletada")
})



app.listen(port, ()=>{
    console.log(`http://localhost:${port}/obras/api`)
}) 





