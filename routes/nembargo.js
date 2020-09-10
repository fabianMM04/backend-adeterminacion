const express = require('express');
const router = express.Router();
const  NotificacionEmbargo  = require('../models/nembargo');
const moment = require('moment');


router.get('/',  (req, res) =>{
    NotificacionEmbargo.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado notificaciones de embargo."
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
    let notificacionEmbargo = await NotificacionEmbargo.findById(id);
    if(!notificacionEmbargo) return res.status(404).send('La notificación de embargo no fue encontrada.');
     
    res.send({notificacionEmbargo});
});

router.post('/', async(req, res) => {

    let notificacionEmbargo = new NotificacionEmbargo({
        reolucion_no: req.body.reolucion_no,
        cdt: req.body.cdt,
        fecha: req.body.fecha,
        matricula: req.body.matricula,
        referencia_catastral: req.body.referencia_catastral,
        propietario: req.body.propietario,
        vigencias: req.body.vigencias,
        valor: req.body.valor,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    notificacionEmbargo = await notificacionEmbargo.save();
    if(!notificacionEmbargo) return res.status(404).send("No se guardó la notificación de embargo!");
    res.send({notificacionEmbargo});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let notificacionEmbargo = await NotificacionEmbargo.findByIdAndUpdate(id, req.body, {new: true});
    if(!notificacionEmbargo) return res.status(404).send('La notificación de embargo no se encontró.');    
    res.status(200).send({notificacionEmbargo});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let notificacionEmbargo = await NotificacionEmbargo.findByIdAndRemove(id);
    if(!notificacionEmbargo) return res.status(404).send('La resolución de convenio no se encontró.');
    res.send({notificacionEmbargo});
});


module.exports = router;