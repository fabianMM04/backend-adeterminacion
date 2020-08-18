const mongoose = require('mongoose');

const resolucionEmbargoSchema = new mongoose.Schema({
    reolucion_no: Number,
    no_expediente: Number,
    fecha: Date,
    propietario: String,
    cedula: String,
    referencia_catastral: String,
    direccion: String,
    matricula: String,
    valor: Number,
    fecha_cre: Date,
    fecha_up: Date
})

const ResolucionEmbargo = mongoose.model('rembargo', resolucionEmbargoSchema);

module.exports = ResolucionEmbargo;