'use strict'

const express = require('express')
const bodyParser = require('body-parser')

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
    res.send({ message: 'todas las artesanas'})
})

// get by Id --> devuelve una artesana, busca por id


app.get('/artesanas/:id?', (req,res) => {
  res.send(`<b>Buscando artesana por id</b>`) 
})


// get by name or phone--> devuelve una artesana, busca por nombre o celu
app.get('/artesanas/:name/:phone?', (req,res) => {
  res.send(`<b>Buscando artesana por nombre o telefono</b>`) 
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

/* ----------------------------------------------------- */
app.post('*', (req,res) => {
    let url = req.url
    let method = req.method
    res.status(500).send(`<b style="color:crimson;">La ruta ${method} ${url} no está implementada</b>`)
})


app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`)
})