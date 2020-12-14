const mongoose = require('mongoose');

const resolucionesSchema = new mongoose.Schema({
    resolucion_no: Number,
    no_expediente: Number,
    referencia_catastral: String,
    direccion: String,
    propietario: String,
    valor: Number,
    vigencias: Date,
    fecha: Date,
    notificacion: String,
    ciudad: String,
    usuario: String,
    fecha_cre: Date,
    fecha_up: Date
})

const Resoluciones = mongoose.model('resolucione', resolucionesSchema);

module.exports = Resoluciones;