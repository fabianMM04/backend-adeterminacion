const mongoose = require('mongoose');

const solicitudAbogadoSchema = new mongoose.Schema({
    odico_no: String,
    ciudad: String,
    fecha: Date,
    funcionario_archivo: String,
    asunto: String,
    referencia_catastral: String,
    abogado_solicitante: String,
    fecha_cre: Date,
    fecha_up: Date
})

const SolicitudAbogado = mongoose.model('sabogado', solicitudAbogadoSchema);

module.exports = SolicitudAbogado;