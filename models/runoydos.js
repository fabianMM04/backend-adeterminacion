const mongoose = require('mongoose');

const resolucionUnoyDosSchema = new mongoose.Schema({
    reolucion_no: Number,
    propietario: String,
    referencia_catastral: String,
    no_expediente: Number,
    fecha: Date,
    direccion: String,
    ciudad: String,
    vigencias: Date,
    matricula: String,
    cedula: String,
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const ResolucionUnoyDos = mongoose.model('runoydo', resolucionUnoyDosSchema);

module.exports = ResolucionUnoyDos;