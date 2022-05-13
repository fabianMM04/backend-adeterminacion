const express = require('express');
const router = express.Router();
const  Historico  = require('../models/historico0611');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Historico.find({}).exec(async(err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado datos historicos."
                });
            }else{
                console.log("show historico")
                res.status(200).send({
                    historico: asignacionesAD,
                });
            }
        }
    });
    
});


router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let historico = await Historico.findById(id);
    if(!historico) return res.status(404).send('El historico no fue encontrado.');
     
    res.send({historico});
});

router.post('/', async(req, res) => {

    let historico = new Historico({
        REFERENCIA: req.body.REF_CATASTRAL,
        REF_CATASTRAL: req.body.REF_CATASTRAL,
        No_RESOLUCION: req.body.No_RESOLUCION,
        No_EXPEDIENTE: req.body.No_EXPEDIENTE,
        FECHA: req.body.FECHA,
        VIG_DETERMINADAS: req.body.VIG_DETERMINADAS,
        GRUPO: req.body.GRUPO,
        NOTIFICADO_DEVUELTO: req.body.NOTIFICADO_DEVUELTO,
        BUSQUEDA: req.body.BUSQUEDA,
        TOTAL_DETERMINADO: req.body.TOTAL_DETERMINADO,
        NO_IMAGE_SCANED: req.body.NO_IMAGE_SCANED,
    });
    
    historico = await historico.save();
    if(!historico) return res.status(404).send("No se guardó el historico!");
    res.send({historico});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let historico = await Historico.findByIdAndUpdate(id, req.body, {new: true});
    if(!historico) return res.status(404).send('El historico no se encontró.');    
    res.status(200).send({historico});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let historico = await Historico.findByIdAndRemove(id);
    if(!historico) return res.status(404).send('El historico no se encontró.');
    res.send({historico});
});


module.exports = router;