const mongoose = require('mongoose');

const solicitudContribuyenteSchema = new mongoose.Schema({
    ciudad: String,
    fecha: Date,
    propietario: String,
    referencia_catastral: String,
    vigencias: Date,
    matricula: String,
    notificacion: String,
    codigo_no: Number,
    fecha_cre: Date,
    fecha_up: Date
})

const SolicitudContribuyente = mongoose.model('scontribuyente', solicitudContribuyenteSchema);

module.exports = SolicitudContribuyente;