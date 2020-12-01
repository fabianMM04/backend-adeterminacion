const express = require('express');
const router = express.Router();
const  User  = require('../models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', async (req, res) =>{
    let users = await User.find();
    if(!users) return res.status(404).send({ message: "No se encontraron usuarios!"});
    res.status(200).send({users})
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user) return res.status(404).send({ message: 'El usuario no fue encontrado'});
     
    res.status(200).send({user});
});

router.post('/', async(req, res) => {
    let user = await User.findOne({correo: req.body.correo});
    if (user) return res.status(400).send({ message: 'usuario registrado'});
    user = new User({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        contrasena: req.body.contrasena,
        usuario: req.body.usuario,
        identificacion: req.body.identificacion,
        apellido: req.body.apellido,
        celular: req.body.celular,
        correo: req.body.correo,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    const salt = await bcrypt.genSalt(10);
    user.contrasena = await bcrypt.hash(user.contrasena, salt);        
    user = await user.save();
    if(!user) return res.status(404).send({ message: "No se guardó el usuario!"});
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(200).send({user});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    if(req.body.contrasena){
        const salt = await bcrypt.genSalt(10);
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        let user = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!user) return res.status(404).send({ message: 'El usuario no fue encontrado'});    
        res.status(200).send({user});
    }else{
        let user = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!user) return res.status(404).send({ message: 'El usuario no fue encontrado'});    
        res.status(200).send({user});
    }
    
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let user =await User.findByIdAndRemove(id);
    if(!user) return res.status(404).send({ message: 'El usuario no fue encontrado'});
    res.status(200).send({user});
});


module.exports = router;