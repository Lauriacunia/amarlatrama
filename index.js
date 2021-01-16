/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *        API Rest realizada en la 1er ADATHON 
 *               Diciembre 2020
 * 
 * Problematica: Mejorar la comunicación entre las artesanas
 * de la comunidad Wichi en Formosa.
 * Propuesta: Crear una Red Social que facilite la comunicacion
 * entre las delegadas y las artesanas, que incluya los pedidos
 * de productos por comunidad.
 * 
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Artesana = require('./models/artesana')
const Pedido = require('./models/Pedido')
const Comunidad = require('./models/comunidad')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
    console.log('*******************************************')
    console.log( 'URL:    ', req.url )
    console.log( 'MÉTODO: ', req.method )
    console.log( 'QUERY:  ', req.query )
    console.log( 'BODY:   ', req.body )
    console.log('*******************************************')
    next()
})


/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                    COMUNIDADES
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

//get all comunidades--> devuelve todas las comunidades

app.get('/comunidades', (req, res) =>{
    Comunidad.find({}, (err, comunidades) => {
        if(err) return res.status(500).send({message: `Error al buscar  a todas las comunidades`})
        if(!comunidades) return res.status(404).send({message: 'La comunidades buscadas no existen en nuestra base de datos'})

        res.status(200).send({ comunidades })
    })
})

// get comunidad by Id --> devuelve una comunidad, buscada por id
/*
app.get('/comunidades/id/:id', (req,res) => {
  
    let comunidadId = req.params.id

    Comunidad.findById(comunidadId, (err, comunidad) =>{
        if(err) return res.status(500).send({message: `Error al buscar la comunidad por Id: ${comunidadId} `})
        if(!comunidad) return res.status(404).send({message: 'La comunidad buscada no existe en nuestra base de datos'})

        res.status(200).send({ comunidad })
    })
}) */

//post comunidad --> Registro de una comunidad

app.post('/comunidades', (req,res) => {

    let body = req.body

    let comunidad = new Comunidad()
    comunidad.numeroDeComunidad = body.numeroDeComunidad
    comunidad.provincia = body.provincia
    comunidad.localidad = body.localidad

    comunidad.save((err, comunidadStored) => {
        if(err) res.status(500).send({message: `error al guardar en la db: ${err}`})

        res.status(200).send({comunidad: comunidadStored})
    })
})

// get comunidad by numero de comunidad  --> devuelve una comunidad, buscada por su numero (Ej: Comunidad 12)

app.get('/comunidades/:numeroDeComunidad', (req,res) => {

    let comunidadNumero = req.params.numeroDeComunidad
    
    Comunidad.find({numeroDeComunidad: comunidadNumero}, (err, comunidad) =>{
        if(err) return res.status(500).send({message: `Error al buscar la comunidad por nombre: ${comunidadNumero}`})
        if(!comunidad) return res.status(404).send({message: 'La comunidad buscada no existe en nuestra base de datos'})

        res.status(200).send({ comunidad })
    })
})

/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       PEDIDOS
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

// get all --> devuelve todo el listado de pedidos de todas las comunidades

app.get('/pedidos', (req,res) => {

    Pedido.find({}, (err, pedidos) => {
        if(err) return res.status(500).send({message: `Error al buscar  a todos los pedidos`})
        if(!pedidos) return res.status(404).send({message: 'Los pedidos buscados no existen en nuestra base de datos'})

        res.status(200).send({ pedidos })
    })
  })

// get pedidos por id --> Devuelve un pedido, busca por su id

app.get('/pedidos/:id', (req,res) => {

    let pedidoId = req.params.id

    Pedido.findById(pedidoId, (err, pedido) =>{
        if(err) return res.status(500).send({message: `Error al buscar el pedido por Id: ${id} `})
        if(!pedido) return res.status(404).send({message: 'El pedido buscado no existe en nuestra base de datos'})

        res.status(200).send({ pedido })
    })
  })

// get pedidos por comunidad  --> devuelve un pedido, buscado por comunidad

app.get('/pedidos/comunidad/:numeroDeComunidad', (req,res) => {

    let numeroComunidad = req.params.numeroDeComunidad

    Pedido.find({comunidad: numeroComunidad}, (err, pedido) =>{
        if(err) return res.status(500).send({message: `Error al buscar el pedido por comunidad por: ${numeroComunidad}`})
        if(!pedido) return res.status(404).send({message: 'El pedido buscado no existe en nuestra base de datos'})

        res.status(200).send({ pedido})
    })
})


// post de pedido  ---> Crea un registro de un pedido

app.post('/pedidos', (req,res) => {

    let body = req.body
    let pedido = new Pedido()

    pedido.media = body.media
    pedido.name = body.name
    pedido.descripcion = body.descripcion
    pedido.especificaciones = body.especificaciones
    pedido.cantidad = body.cantidad
    pedido.comunidad = body.comunidad
    pedido.fechaDeEntrega = new Date(body.fechaDeEntrega)

    pedido.save((err, pedidoStored) => {
        if(err) res.status(500).send({message: `error al guardar en la db: ${err}`})

        res.status(200).send({pedido: pedidoStored})
    })   
})



/***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                   OTROS ENDPOINTS
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

 // Funcionalidades a desarrollar en proximamente

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


// get by name y phone--> devuelve una artesana, busca por nombre y celu

app.get('/artesanas/:name/:phone', (req,res) => {

    const nameArtesana =req.params.name
    const phoneArtesana = req.params.phone

    Artesana.find({name: nameArtesana}, {phone: phoneArtesana}, (err, artesana) => {
        if(err) return res.status(500).send({message: `Error al buscar  a la artesana por nombre y telefono`})
        if(!artesana) return res.status(404).send({message: 'La artesana buscada no existen en nuestra base de datos'})

        res.status(200).send({ artesana })
    })
})


/* ----------------------------------------------------- */

app.get('*', (req,res) => {
    let url = req.url
    let method = req.method
    res.status(500).send(`<b style="color:red;">La ruta ${method} ${url} no está implementada</b>`)
})


//post de artesana  --> Registro de una artesana

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

 // post de comunidad ----> Registro de comunidadidad

 app.post('/comunidades', (req,res) => {

    let body = req.body

    let comunidad = new Comunidad()
    comunidad.name = body.name
    comunidad.provincia = body.provincia
    comunidad.localidad = body.localidad

    comunidad.save((err, comunidadStored) => {
        if(err) res.status(500).send({message: `error al guardar en la db: ${err}`})

        res.status(200).send({comunidad: comunidadStored})
    })
})


/* ----------------------------------------------------- */
app.post('*', (req,res) => {
    let url = req.url
    let method = req.method
    res.status(500).send(`<b style="color:crimson;">La ruta ${method} ${url} no está implementada</b>`)
})


//put de artesana ---> Modificacion de un registro de artesana por id

app.put('/artesanas/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Artesana.findByIdAndUpdate(id, bodyUpdate, (err, artesanaUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos de la artesana: ${err}`})

        res.status(200).send({ artesanaUpdated })
    })
})

//put de artesana  ---> Modificar un pedido por id

app.put('/pedidos/:id', (req,res) => {
    let id = req.params.id
    let bodyUpdate = req.body

    Pedido.findByIdAndUpdate(id, bodyUpdate, (err, pedidoUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar los datos del pedido: ${err}`})

        res.status(200).send({ pedidoUpdated })
    })
})

// Delete de artesana by Id --> Borra una artesana de la db por Id

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

// Delete pedido por id  ----> Borrar un pedido por id

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


mongoose.connect('mongodb+srv://niwok:**************@cluster0.cyfup.mongodb.net/niwok?retryWrites=true&w=majority', (err, res) => {
    if(err) {
        return console.log('Error al conectar con la base de datos')
    }
    console.log('Conexion a la base de datos establecida')

    app.listen(port, () => {
        console.log(`Escuchando en http://localhost:${port}`)
    })
})
