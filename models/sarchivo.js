const mongoose = require('mongoose');

const solicitudArchivoSchema = new mongoose.Schema({
    odico_no: String,
    ciudad: String,
    fecha: Date,
    asunto: String,
    abogado_solicitante: String,
    afuncionario_archivo: String,
    expediente_no: Number,
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const SolicitudArchivo = mongoose.model('sarchivo', solicitudArchivoSchema);

module.exports = SolicitudArchivo;