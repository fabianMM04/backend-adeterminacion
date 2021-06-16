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
    cedula: String,
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const SolicitudContribuyente = mongoose.model('scontribuyente', solicitudContribuyenteSchema);

module.exports = SolicitudContribuyente;