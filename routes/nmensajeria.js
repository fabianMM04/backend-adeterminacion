const express = require('express');
const router = express.Router();
const  Nmensajeria  = require('../models/nmensajeria');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Nmensajeria.find({}).exec(async(err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado notificación de mensajeria."
                });
            }else{
                let activos = await Nmensajeria.find({status: "ACTIVO"})
                let cerrados = await Nmensajeria.find({status: "CERRADO"})
                res.status(200).send({
                    nmensajeria:asignacionesAD,
                    activos: activos.length,
                    cerrados: cerrados.length,
                    total: asignacionesAD.length
                });
            }
        }
    });
    
});

router.get('/users/:id',  (req, res) =>{
    let id = req.params.id;
    Nmensajeria.find({ cedula: id }).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado notificación de mensajeria."
                });
            }else{
                res.status(200).send({
                    nmensajeria:asignacionesAD



                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let nmensajeria = await Nmensajeria.findById(id);
    if(!nmensajeria) return res.status(404).send('La notificación de mensajeria no fue encontrada.');
     
    res.send({nmensajeria});
});

router.post('/', async(req, res) => {

    let nmensajeria = new Nmensajeria({
        empresa: req.body.empresa,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        firma: req.body.firma,
        id: req.body.id,
        cedula: req.body.usuario,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    nmensajeria = await nmensajeria.save();
    if(!nmensajeria) return res.status(404).send("No se guardó la notificación de mensajería!");
    res.send({nmensajeria});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let nmensajeria = await Nmensajeria.findByIdAndUpdate(id, req.body, {new: true});
    if(!nmensajeria) return res.status(404).send('La notificación de mensajeria no se encontró.');    
    res.status(200).send({nmensajeria});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let nmensajeria = await Nmensajeria.findByIdAndRemove(id);
    if(!nmensajeria) return res.status(404).send('La notificación de mensajeria no se encontró.');
    res.status(200).send({nmensajeria});
});


module.exports = router;