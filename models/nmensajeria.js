const mongoose = require('mongoose');

const notificacionMensajeriaSchema = new mongoose.Schema({
    empresa: String,
    nombre: String,
    direccion: String,
    firma: String,
    id: String,
    fecha_cre: Date,
    fecha_up: Date
})

const NotificacionMensajeria = mongoose.model('nembargo', notificacionMensajeriaSchema);

module.exports = NotificacionMensajeria;