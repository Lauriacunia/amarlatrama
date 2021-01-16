'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComunidadSchema = Schema({
    numeroDeComunidad: Number,
    provincia: String,
    localidad: String
})

module.exports = mongoose.model('Comunidad', ComunidadSchema)