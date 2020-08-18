const mongoose = require('mongoose');

const asignarAbogadoSchema = new mongoose.Schema({
    activo: String,
    peticion:{ type: mongoose.Schema.ObjectId, ref: 'peticion'} ,
    usu_abogado:{ type: mongoose.Schema.ObjectId, ref: 'User'} ,
    usu_recepcionista: {type: mongoose.Schema.ObjectId, ref: 'User'},
    fecha_cre: Date,
    fecha_up: Date
})

const AsignarAbogado = mongoose.model('asignarabogado', asignarAbogadoSchema);

module.exports = AsignarAbogado;