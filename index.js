'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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
    res.status(200).send({ message: 'todas las artesanas'})
})

// get by Id --> devuelve una artesana, busca por id
app.get('/artesanas/:id?', (req,res) => {
  res.status(200).send(`<b>Buscando artesana por id</b>`) 
})


// get by name or phone--> devuelve una artesana, busca por nombre o celu
app.get('/artesanas/:name/:phone?', (req,res) => {
  res.status(200).send(`<b>Buscando artesana por nombre o telefono</b>`) 
})

// get all --> devuelve todo el listado de pedidos de todas las comunidades

app.get('/pedidos', (req,res) => {
    res.status(200).send(`<b>Estos son todos los pedidos</b>`) 
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
    res.status(200).send(`<b style="color:crimson;">Se registro con exito a la artesana: ${body}</b>`)
})

// Registro de un pedido

app.post('/pedidos', (req,res) => {
    let body = req.body
    res.status(200).send(`<b style="color:crimson;">Se registro con exito el pedido: ${body}</b>`)
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
    res.status(200).send(`<b style="color:green;">La artesana con el id: ${id} fue actualizada en la db</b>`)
})

//Modificar un pedido por id
app.put('/pedidos/:id', (req,res) => {
    let id = req.params.id
    res.status(200).send(`<b style="color:green;">El pedido con el id: ${id} fue actualizado con éxito en la db</b>`)
})


 /***◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆*
 *                       DELETE
 **◇*◆*◇*◆*◇*◆*◇*◆*◇*◆**◇*◆*◇*◆*◇*◆*◇*◆*◇*◆* */

// Delete by Id --> Borra una artesana por Id

app.delete('/artesanas/:id', (req,res) => {
    let id = req.params.id
    res.status(200).send(`<b style="color:crimson;">La artesana con el id: ${id} fue borrada de la db</b>`)
})

// Borrar un pedido por id
app.delete('/pedidos/:id', (req,res) => {
    let id = req.params.id
    res.status(200).send(`<b style="color:crimson;">El pedido con el id: ${id} fue borrado de la db</b>`)
})


mongoose.connect('mongodb+srv://niwok:***********@cluster0.cyfup.mongodb.net/niwok?retryWrites=true&w=majority', (err, res) => {
    if(err) {
        return console.log('Error al conectar con la base de datos')
    }
    console.log('Conexion a la base de datos establecida')

    app.listen(port, () => {
        console.log(`Escuchando en http://localhost:${port}`)
    })
})
