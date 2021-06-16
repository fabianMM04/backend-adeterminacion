const mongoose = require('mongoose');

const asignarADSchema = new mongoose.Schema({
    activo: Boolean,
    peticion:{ type: mongoose.Schema.ObjectId, ref: 'peticion'} ,
    usu_abogado:{ type: mongoose.Schema.ObjectId, ref: 'User'} ,
    usu_ad: {type: mongoose.Schema.ObjectId, ref: 'User'},
    fecha_cre: Date,
    fecha_up: Date,
    status: String
})

const AsignarADeterminacion= mongoose.model('asignaradeterminacion', asignarADSchema);

module.exports = AsignarADeterminacion;