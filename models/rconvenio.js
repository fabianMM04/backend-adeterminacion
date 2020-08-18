const mongoose = require('mongoose');

const resolucionConvenioSchema = new mongoose.Schema({
    reolucion_facilidad: Number,
    propietario: String,
    no_expediente: Number,
    cedula: String,
    referencia_catastral: String,
    valor: Number,
    vigencias: Date,
    no_cuotas: Number,
    pagare_no: Date,
    notificacion: String,
    ciudad: String,
    fecha_cre: Date,
    fecha_up: Date
})

const ResolucionConvenio = mongoose.model('resolconvenio', resolucionConvenioSchema);

module.exports = ResolucionConvenio;