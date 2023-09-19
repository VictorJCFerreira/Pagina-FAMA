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
          return;
        }
        const jsonObject = JSON.parse(jsonContent);

        res.json(jsonObject);
        
    })
});


let obras = [{
    id:0,
    nomeObra: "Shopping Funico",
    responsavel: "João Teste",
    local: "Piedade, Rua Algusta de Freitas ,262",
}]

/*app.get('/obras/api', (req, res) => res.json({
    obras
}))*/

app.get('/obras/api/:id', (req, res) => {
    const obrasId = req.params.id

    const obra = obras.find(obra => Number(obra.id) === Number(obrasId))

    if(!obra){
        return res.json("Obra nao encontrada")
    }

    res.json(obra)
})

app.post('/obras/api', (req, res) => {
    const lastId = obras[obras.length - 1].id
    obras.push({
        id: lastId + 1,
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





