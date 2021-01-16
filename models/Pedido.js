'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PedidoSchema = Schema({
    media: String,
    name: String,
    descripcion: String,
    especificaciones: String,
    cantidad: Number,
    comunidad: Number,
    fechaDeEntrega: Date
})

module.exports = mongoose.model('Pedido', PedidoSchema)