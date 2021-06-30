const express = require('express');
const router = express.Router();
const  SolicitudArchivo  = require('../models/sarchivo');
const moment = require('moment');


router.get('/',  (req, res) =>{
    SolicitudArchivo.find({}).exec(async(err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado solicitudes de archivo."
                });
            }else{
                let activos = await SolicitudArchivo.find({status: 'ACTIVO'})
                let cerrados = await SolicitudArchivo.find({status: 'CERRADO'})
                res.status(200).send({
                    sarchivo: asignacionesAD,
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
    let solicitudArchivo = await SolicitudArchivo.findById(id);
    if(!solicitudArchivo) return res.status(404).send('La solicitud del archivo no fue encontrado.');
     
    res.send({solicitudArchivo});
});

router.post('/', async(req, res) => {

    let solicitudArchivo = new SolicitudArchivo({
        odico_no: req.body.odico_no,
        ciudad: req.body.ciudad,
        fecha: req.body.fecha,
        afuncionario_archivo: req.body.funcionario_archivo,
        asunto: req.body.asunto,
        expediente_no: req.body.referencia_catastral,
        abogado_solicitante: req.body.abogado_solicitante,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    solicitudArchivo = await solicitudArchivo.save();
    if(!solicitudArchivo) return res.status(404).send("No se guardó la solicitud del archivo!");
    res.send({solicitudArchivo});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let solicitudArchivo = await SolicitudArchivo.findByIdAndUpdate(id, req.body, {new: true});
    if(!solicitudArchivo) return res.status(404).send('La solicitud del archivo no se encontró.');    
    res.status(200).send({solicitudArchivo});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let solicitudArchivo = await SolicitudArchivo.findByIdAndRemove(id);
    if(!solicitudArchivo) return res.status(404).send('La solicitud del archivo no se encontró.');
    res.send({solicitudArchivo});
});


module.exports = router;