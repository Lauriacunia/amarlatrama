'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtesanaSchema = Schema({
    name: String,
    phone: Number
})

module.exports = mongoose.model('Artesana', ArtesanaSchema)