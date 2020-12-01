const express = require('express');
const router = express.Router();
const  Runoydos  = require('../models/runoydos');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Runoydos.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado resoluciones 2001 y 2002."
                });
            }else{
                res.status(200).send({
                    runoydos: asignacionesAD
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let runoydos = await Runoydos.findById(id);
    if(!runoydos) return res.status(404).send('La resolución 2001 y 2002 no fue encontrado.');
     
    res.send({runoydos});
});

router.post('/', async(req, res) => {

    let runoydos = new Runoydos({
        reolucion_no: req.body.reolucion_no,
        no_expediente: req.body.no_expediente,
        referencia_catastral: req.body.referencia_catastral,
        direccion: req.body.direccion,
        propietario: req.body.propietario,
        vigencias: req.body.vigencias,
        fecha: req.body.fecha,
        ciudad: req.body.ciudad,
        matricula: req.body.matricula,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    runoydos = await runoydos.save();
    if(!runoydos) return res.status(404).send("No se guardó la resolución 2001 y 2002!");
    res.send({runoydos});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let runoydos = await Runoydos.findByIdAndUpdate(id, req.body, {new: true});
    if(!runoydos) return res.status(404).send('La resolución 2001 y 2002 no se encontró.');    
    res.status(200).send({runoydos});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let runoydos = await Runoydos.findByIdAndRemove(id);
    if(!runoydos) return res.status(404).send('La resolución 2001 y 2002 no se encontró.');
    res.send({runoydos});
});


module.exports = router;