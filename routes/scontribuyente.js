const express = require('express');
const router = express.Router();
const  SolicitudContribuyente  = require('../models/scontribuyente');
const moment = require('moment');


router.get('/',  (req, res) =>{
    SolicitudContribuyente.find({}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado solicitudes de contribuyentes."
                });
            }else{
                res.status(200).send({
                    scontribuyente: asignacionesAD
                });
            }
        }
    });
    
});

router.get('/users/:id',  (req, res) =>{
    let id = req.params.id;
    SolicitudContribuyente.find({ usuario: id }).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado solicitudes de contribuyentes."
                });
            }else{
                res.status(200).send({
                    scontribuyente: asignacionesAD
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let solicitudContribuyente = await SolicitudContribuyente.findById(id);
    if(!solicitudContribuyente) return res.status(404).send('La solicitud del contribuyente no fue encontrado.');
     
    res.send({solicitudContribuyente});
});

router.post('/', async(req, res) => {

    let solicitudContribuyente = new SolicitudContribuyente({
        reolucion_no: req.body.reolucion_no,
        no_expediente: req.body.no_expediente,
        referencia_catastral: req.body.referencia_catastral,
        direccion: req.body.direccion,
        propietario: req.body.propietario,
        vigencias: req.body.vigencias,
        fecha: req.body.fecha,
        ciudad: req.body.ciudad,
        matricula: req.body.matricula,
        usuario: req.body.usuario,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss')
    });
    
    solicitudContribuyente = await solicitudContribuyente.save();
    if(!solicitudContribuyente) return res.status(404).send("No se guardó la solicitud del contribuyente!");
    res.send({solicitudContribuyente});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let solicitudContribuyente = await SolicitudContribuyente.findByIdAndUpdate(id, req.body, {new: true});
    if(!solicitudContribuyente) return res.status(404).send('La solicitud del contribuyente no se encontró.');    
    res.status(200).send({solicitudContribuyente});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let solicitudContribuyente = await SolicitudContribuyente.findByIdAndRemove(id);
    if(!solicitudContribuyente) return res.status(404).send('La solicitud del contribuyente no se encontró.');
    res.send({solicitudContribuyente});
});


module.exports = router;