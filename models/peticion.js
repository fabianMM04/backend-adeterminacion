const mongoose = require('mongoose');

const peticionSchema = new mongoose.Schema({
    ciudad: String,
    tipo_solicitud: String,
    oficina: String,
    usu_oficina:{ type: mongoose.Schema.ObjectId, ref: 'User'} ,
    fecha_cre: Date,
    tipo_peticion: String,
    usu_contribuyente: {type: mongoose.Schema.ObjectId, ref: 'User'},
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const Peticion = mongoose.model('peticion', peticionSchema);

module.exports = Peticion;