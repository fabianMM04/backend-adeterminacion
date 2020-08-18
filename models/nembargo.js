const mongoose = require('mongoose');

const notificacionEmbargoSchema = new mongoose.Schema({
    reolucion_no: Number,
    cdt: String,
    fecha: Date,
    matricula: String,
    referencia_catastral: String,
    propietario: String,
    vigencias: Date,
    valor: Number,
    fecha_cre: Date,
    fecha_up: Date
})

const NotificacionEmbargo = mongoose.model('nembargo', notificacionEmbargoSchema);

module.exports = NotificacionEmbargo;