const express = require('express');
const router = express.Router();
const  SolicitudAbogado  = require('../models/sabogado');
const moment = require('moment');


router.get('/',  (req, res) =>{
    SolicitudAbogado.find({}).exec(async(err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado solicitudes de abogado."
                });
            }else{
                let activos = await SolicitudAbogado.find({status: 'ACTIVO'})
                let cerrados = await SolicitudAbogado.find({status: 'CERRADO'})
                res.status(200).send({
                    sabogado: asignacionesAD,
                    activos: activos.length,
                    cerrados: cerrados.length,
                    total: asignacionesAD.length
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let solicitudAbogado = await SolicitudAbogado.findById(id);
    if(!solicitudAbogado) return res.status(404).send('La solicitud del abogado no fue encontrado.');
     
    res.send({solicitudAbogado});
});

router.post('/', async(req, res) => {

    let solicitudAbogado = new SolicitudAbogado({
        odico_no: req.body.odico_no,
        ciudad: req.body.ciudad,
        fecha: req.body.fecha,
        funcionario_archivo: req.body.funcionario_archivo,
        asunto: req.body.asunto,
        referencia_catastral: req.body.referencia_catastral,
        abogado_solicitante: req.body.abogado_solicitante,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    solicitudAbogado = await solicitudAbogado.save();
    if(!solicitudAbogado) return res.status(404).send("No se guardó la solicitud del abogado!");
    res.send({solicitudAbogado});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let solicitudAbogado = await SolicitudAbogado.findByIdAndUpdate(id, req.body, {new: true});
    if(!solicitudAbogado) return res.status(404).send('La solicitud del abogado no se encontró.');    
    res.status(200).send({solicitudAbogado});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let solicitudAbogado = await SolicitudAbogado.findByIdAndRemove(id);
    if(!solicitudAbogado) return res.status(404).send('La solicitud del abogado no se encontró.');
    res.send({solicitudAbogado});
});


module.exports = router;