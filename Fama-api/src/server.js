const express = require('express')
const fs = require('fs')
const app = express() 
const cors = require('cors')

const port = 9000

app.use(cors())
const caminhoArquivo = './obras.json';

app.get('/obras', function (req, res) {
    const fileStream = fs.createReadStream(caminhoArquivo, { encoding: 'utf8' });

    fileStream.on('error', (err) => {
        console.error('Erro:', err);
        res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
    });

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    fileStream.pipe(res);
});

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/obras`)
}) 