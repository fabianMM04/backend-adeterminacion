const express = require('express');
const router = express.Router();
const  Abogado  = require('../models/asignarabogado');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Abogado.find({}).populate({path: 'usu_abogado', select: 'nombre'}).populate({path: 'usu_recepcionista', select: 'nombre'}).populate({path: 'peticion'}).exec((err, asignacionesabogados) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesabogados){
                res.status(404).send({
                    message: "No se han encontrado asignaciones a abogados"
                });
            }else{
                res.status(200).send({
                    asignacionesabogados
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let abogados = await Abogado.findById(id).populate({path: 'user'});
    if(!abogados) return res.status(404).send('La asignación de abogado no fue encontrada.');
     
    res.send({abogados});
});

router.post('/', async(req, res) => {

    let abogado = new Abogado({
        activo: req.body.activo,
        peticion: req.body.peticion,
        usu_abogado: req.body.usu_abogado,
        usu_recepcionista: req.body.usu_recepcionista,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    abogado = await abogado.save();
    if(!abogado) return res.status(404).send("No se guardó la asignación de abogado!");
    res.send({abogado});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let abogado = await Abogado.findByIdAndUpdate(id, req.body, {new: true});
    if(!abogado) return res.status(404).send('La asignación de abogado no se encontró.');    
    res.status(200).send({abogado});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let abogado = await Abogado.findByIdAndRemove(id);
    if(!abogado) return res.status(404).send('La asignación de abogado no se encontró.');
    res.send({abogado});
});


module.exports = router;