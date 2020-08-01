mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    nombre: String,
    usuario: String,
    contrasena: String,
    tipo: {
        type: String,
        enum : ['CONTRIBUYENTE', 'ABOGADO', 'ARCHIVO_DETERMINACION', 'RECEPCIONISTA'],
        default: 'CONTRIBUYENTE'
    },
    identificacion: String,
    apellido: String,
    celular: String,
    correo: String,
    fecha_cre: Date,
    fecha_up: Date
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

module.exports = User;