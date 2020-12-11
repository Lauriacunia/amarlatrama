'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PedidoSchema = Schema({
    name: String,
    qty: Number,
    comunidad: String,
    fechaDeEntrega: Date
})

module.exports = mongoose.model('Pedido', PedidoSchema)