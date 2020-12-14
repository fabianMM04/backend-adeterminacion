const express = require('express');
const router = express.Router();
const  User  = require('../models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');

router.post('/', async(req, res) => {
    let user = await User.findOne({ correo: req.body.correo });
    if (!user) return res.status(400).send({message: 'correo o contraseña invalida.'});
    const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena);
    if (!validPassword) return res.status(400).send({message: 'correo o contraseña invalida.'});
    const token = user.generateAuthToken();
    res.status(200).send({token, user});  
    
});

module.exports = router;