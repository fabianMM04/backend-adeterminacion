const express = require('express');
const router = express.Router();
const  ResolucionEmbargo  = require('../models/rembargo');
const moment = require('moment');


router.get('/',  (req, res) =>{
    ResolucionEmbargo.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado resoluciones de embargos."
                });
            }else{
                res.status(200).send({
                    rembargo: asignacionesAD
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucionembargo = await ResolucionEmbargo.findById(id);
    if(!resolucionembargo) return res.status(404).send('La resolución de embargo no fue encontrado.');
     
    res.send({resolucionembargo});
});

router.post('/', async(req, res) => {

    let resolucionembargo = new ResolucionEmbargo({
        reolucion_no: req.body.reolucion_no,
        no_expediente: req.body.no_expediente,
        fecha: req.body.fecha,
        propietario: req.body.propietario,
        cedula: req.body.cedula,
        referencia_catastral: req.body.referencia_catastral,
        direccion: req.body.direccion,
        matricula: req.body.matricula,
        valor: req.body.valor,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    resolucionembargo = await resolucionembargo.save();
    if(!resolucionembargo) return res.status(404).send("No se guardó la resolución de embargo!");
    res.send({resolucionembargo});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let resolucionembargo = await ResolucionEmbargo.findByIdAndUpdate(id, req.body, {new: true});
    if(!resolucionembargo) return res.status(404).send('La resolución de embargo no se encontró.');    
    res.status(200).send({resolucionembargo});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucionembargo = await ResolucionEmbargo.findByIdAndRemove(id);
    if(!resolucionembargo) return res.status(404).send('La resolución de embargo no se encontró.');
    res.send({resolucionembargo});
});


module.exports = router;