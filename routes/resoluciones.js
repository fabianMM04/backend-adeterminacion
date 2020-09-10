const express = require('express');
const router = express.Router();
const  Resolucion  = require('../models/resoluciones');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Resolucion.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado resoluciones."
                });
            }else{
                res.status(200).send({
                    asignacionesAD
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucion = await Resolucion.findById(id);
    if(!resolucion) return res.status(404).send('La resolución no fue encontrado.');
     
    res.send({resolucion});
});

router.post('/', async(req, res) => {

    let resolucion = new Resolucion({
        resolucion_no: req.body.reolucion_no,
        no_expediente: req.body.no_expediente,
        referencia_catastral: req.body.referencia_catastral,
        direccion: req.body.direccion,
        propietario: req.body.propietario,
        valor: req.body.valor,
        vigencias: req.body.vigencias,
        fecha: req.body.fecha,
        notificacion: req.body.notificacion,
        ciudad: req.body.ciudad,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    resolucion = await resolucion.save();
    if(!resolucion) return res.status(404).send("No se guardó la resolución!");
    res.send({resolucion});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let resolucion = await Resolucion.findByIdAndUpdate(id, req.body, {new: true});
    if(!resolucion) return res.status(404).send('La resolución no se encontró.');    
    res.status(200).send({resolucion});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucion = await Resolucion.findByIdAndRemove(id);
    if(!resolucion) return res.status(404).send('La resolución no se encontró.');
    res.send({resolucion});
});


module.exports = router;