const express = require('express');
const router = express.Router();
const  ResolucionConvenio  = require('../models/rconvenio');
const moment = require('moment');


router.get('/',  (req, res) =>{
    ResolucionConvenio.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado resoluciones de convenio."
                });
            }else{
                res.status(200).send({
                    resolucionconvenio: asignacionesAD
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucionconvenio = await ResolucionConvenio.findById(id);
    if(!resolucionconvenio) return res.status(404).send('La resolución de convenio no fue encontrada.');
     
    res.status(200).send({resolucionconvenio});
});

router.post('/', async(req, res) => {

    let resolucionconvenio = new ResolucionConvenio({
        reolucion_facilidad: req.body.reolucion_facilidad,
        propietario: req.body.propietario,
        no_expediente: req.body.no_expediente,
        cedula: req.body.cedula,
        referencia_catastral: req.body.referencia_catastral,
        valor: req.body.valor,
        vigencias: req.body.vigencias,
        no_cuotas: req.body.no_cuotas,
        pagare_no: req.body.pagare_no,
        notificacion: req.body.notificacion,
        ciudad: req.body.ciudad,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    resolucionconvenio = await resolucionconvenio.save();
    if(!resolucionconvenio) return res.status(404).send("No se guardó la resolución de convenio!");
    res.status(200).send({resolucionconvenio});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let resolucionconvenio = await ResolucionConvenio.findByIdAndUpdate(id, req.body, {new: true});
    if(!resolucionconvenio) return res.status(404).send('La resolución de convenio no se encontró.');    
    res.status(200).send({resolucionconvenio});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let resolucionconvenio = await ResolucionConvenio.findByIdAndRemove(id);
    if(!resolucionconvenio) return res.status(404).send('La resolución de convenio no se encontró.');
    res.status(200).send({resolucionconvenio});
});


module.exports = router;