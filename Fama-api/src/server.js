const express = require('express')
const fs = require('fs')
const app = express() 
const cors = require('cors')

const port = 9000

app.use(cors())
const caminhoArquivo = './obras.json';
let jsonObject;

fs.readFile(caminhoArquivo, 'utf8', (err, jsonContent) => {
    if (err) {
        console.error('Erro:', err);
        return;
    }
    jsonObject = JSON.parse(jsonContent); 
});

app.get('/obras', function (req, res) {
  res.send(jsonObject)
})


app.listen(port, ()=>{
    console.log(`http://localhost:${port}/obras`)
}) 