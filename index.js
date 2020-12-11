'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Artesana = require('./models/artesana')
const Pedido = require('./models/Pedido')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    console.log('*******************************************')
    console.log( 'URL:    ', req.url )
    console.log( 'MÉTODO: ', req.method )
    console.log( 'QUERY:  ', req.query )
    console.log( 'BODY:   ', req.body )
    console.log('*******************************************')
    next()
})

/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       GET
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

// get all --> devuelve todas las artesanas
app.get('/artesanas', (req, res) =>{
    Artesana.find({}, (err, artesanas) => {
        if(err) return res.status(500).send({message: `Error al buscar  a todas las artesanas`})
        if(!artesanas) return res.status(404).send({message: 'La artesanas buscadas no existen en nuestra base de datos'})

        res.status(200).send({ artesanas })
    })



})

// get by Id --> devuelve una artesana, busca por id
app.get('/artesanas/:id', (req,res) => {
  
    let artesanaId = req.params.id

    Artesana.findById(artesanaId, (err, artesana) =>{
        if(err) return res.status(500).send({message: `Error al buscar la artesana por Id: ${id} `})
        if(!artesana) return res.status(404).send({message: 'La artesana buscada no existe en nuestra base de datos'})

        res.status(200).send({ artesana })
    })

})


// get by name or phone--> devuelve una artesana, busca por nombre o celu
app.get('/artesanas/:name/:phone?', (req,res) => {
  res.status(200).send(`<b>Buscando artesana por nombre o telefono</b>`) 
})

// get all --> devuelve todo el listado de pedidos de todas las comunidades

app.get('/pedidos', (req,res) => {
    Pedido.find({}, (err, pedidos) => {
        if(err) return res.status(500).send({message: `Error al buscar  a todos los pedidos`})
        if(!pedidos) return res.status(404).send({message: 'Los pedidos buscados no existen en nuestra base de datos'})

        res.status(200).send({ pedidos })
    })
  })

// get pedidos por id

app.get('/pedidos/:id', (req,res) => {
    let pedidoId = req.params.id

    Pedido.findById(pedidoId, (err, pedido) =>{
        if(err) return res.status(500).send({message: `Error al buscar el pedido por Id: ${id} `})
        if(!pedido) return res.status(404).send({message: 'El pedido buscado no existe en nuestra base de datos'})

        res.status(200).send({ pedido })
    })
  })

// get pedidos por comunidad

app.get('/pedidos/:comunidad', (req,res) => {
    res.status(200).send(`<b>Estos son todos los pedidos de tu comunidad</b>`) 
  })

/* ----------------------------------------------------- */

app.get('*', (req,res) => {
    let url = req.url
    let method = req.method
    res.status(500).send(`<b style="color:red;">La ruta ${method} ${url} no está implementada</b>`)
})

 /***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       POST
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

//Registro de una artesana
app.post('/artesanas', (req,res) => {
    let body = req.body

    let artesana = new Artesana()
    artesana.name = body.name
    artesana.phone = body.phone

    artesana.save((err, artesanaStored) => {
        if(err) res.status(500).send({message: `error al guardar en la db: ${err}`})

        res.status(200).send({artesana: artesanaStored})
    })
})

// Registro de un pedido

app.post('/pedidos', (req,res) => {
    let body = req.body

    let pedido = new Pedido()

    pedido.name = body.name
    pedido.qty = body.qty
    pedido.comunidad = body.comunidad
    pedido.fechaDeEntrega = new Date(body.fechaDeEntrega)

    pedido.save((err, pedidoStored) => {
        if(err) res.status(500).send({message: `error al guardar en la db: ${err}`})

        res.status(200).send({pedido: pedidoStored})
    })
   
  })

/* ----------------------------------------------------- */
app.post('*', (req,res) => {
    let url = req.url
    let method = req.method
    res.status(500).send(`<b style="color:crimson;">La ruta ${method} ${url} no está implementada</b>`)
})


/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       PUT
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

// Modificacion de un registro de artesana por id

app.put('/artesanas/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Artesana.findByIdAndUpdate(id, bodyUpdate, (err, artesanaUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos de la artesana: ${err}`})

        res.status(200).send({ artesanaUpdated })
    })
})

//Modificar un pedido por id
app.put('/pedidos/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Pedido.findByIdAndUpdate(id, bodyUpdate, (err, pedidoUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos del pedido: ${err}`})

        res.status(200).send({ pedidoUpdated })
    })
})


 /***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       DELETE
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

// Delete by Id --> Borra una artesana por Id

app.delete('/artesanas/:id', (req,res) => {
    let artesanaId = req.params.id

    Artesana.findById(artesanaId, (err, artesana) =>{
        if(err) return res.status(500).send({message: `Error al buscar a la artesana por Id: ${id} `})

        artesana.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar a la artesana de la DB: ${err}`})
            res.status(200).send({message: 'La artesana ha sido borrada de nuestra DB'})
        })
        
    })
})

// Borrar un pedido por id
app.delete('/pedidos/:id', (req,res) => {
    let pedidoId = req.params.id

    Pedido.findById(pedidoId, (err, pedido) =>{
        if(err) return res.status(500).send({message: `Error al buscar el pedido por Id: ${id} `})

        pedido.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar el pedido: ${err}`})
            res.status(200).send({message: 'El pedido ha sido borrado'})
        })
        
    })
})


mongoose.connect('mongodb+srv://niwok:*************@cluster0.cyfup.mongodb.net/niwok?retryWrites=true&w=majority', (err, res) => {
    if(err) {
        return console.log('Error al conectar con la base de datos')
    }
    console.log('Conexion a la base de datos establecida')

    app.listen(port, () => {
        console.log(`Escuchando en http://localhost:${port}`)
    })
})
