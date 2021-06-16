const mongoose = require('mongoose');

const notificacionMensajeriaSchema = new mongoose.Schema({
    empresa: String,
    nombre: String,
    direccion: String,
    firma: String,
    id: String,
    cedula: String,
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const NotificacionMensajeria = mongoose.model('nmensajeria', notificacionMensajeriaSchema);

module.exports = NotificacionMensajeria;