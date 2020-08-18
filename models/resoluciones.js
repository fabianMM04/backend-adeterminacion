const mongoose = require('mongoose');

const resolucionesSchema = new mongoose.Schema({
    reolucion_no: Number,
    no_expediente: Number,
    referencia_catastral: String,
    direccion: String,
    propietario: String,
    valor: Number,
    vigencias: Date,
    fecha: Date,
    notificacion: String,
    ciudad: String,
    fecha_cre: Date,
    fecha_up: Date
})

const Resoluciones = mongoose.model('resoluciones', resolucionesSchema);

module.exports = Resoluciones;