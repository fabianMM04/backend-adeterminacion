const mongoose = require('mongoose');

const mandamientoPagoSchema = new mongoose.Schema({
    reolucion_no: Number,
    no_expediente: Number,
    fecha: Date,
    direccion: String,
    ciudad: String,
    referencia_catastral: String,
    propietario: String,
    vigencias: Date,
    valor: Number,
    mandamiento_no: String,
    notificacion: String,
    fecha_cre: Date,
    cedula: String,
    fecha_up: Date,
    status: String
})

const MandamientoPago = mongoose.model('mandamientopago', mandamientoPagoSchema);

module.exports = MandamientoPago;