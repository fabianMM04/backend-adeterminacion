const express = require('express');
const router = express.Router();
const  ArchivoDeterminacion  = require('../models/asignararchivodeterminacion');
const moment = require('moment');


router.get('/',  (req, res) =>{
    ArchivoDeterminacion.find({}).populate({path: 'usu_abogado', select: 'nombre'}).populate({path: 'usu_recepcionista', select: 'nombre'}).populate({path: 'peticion'}).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado asignaciones a archivo de determinación."
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
    let archivodeterminacion = await ArchivoDeterminacion.findById(id).populate({path: 'user'});
    if(!archivodeterminacion) return res.status(404).send('La asignación de archivo determinación no fue encontrada.');
     
    res.send({archivodeterminacion});
});

router.post('/', async(req, res) => {

    let archivodeterminacion = new ArchivoDeterminacion({
        activo: req.body.activo,
        peticion: req.body.peticion,
        usu_abogado: req.body.usu_abogado,
        usu_ad: req.body.usu_ad,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    archivodeterminacion = await archivodeterminacion.save();
    if(!archivodeterminacion) return res.status(404).send("No se guardó la asignación de archivo determinación!");
    res.send({archivodeterminacion});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let archivodeterminacion = await ArchivoDeterminacion.findByIdAndUpdate(id, req.body, {new: true});
    if(!archivodeterminacion) return res.status(404).send('La asignación de archivo determinación no se encontró.');    
    res.status(200).send({archivodeterminacion});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let archivodeterminacion = await ArchivoDeterminacion.findByIdAndRemove(id);
    if(!archivodeterminacion) return res.status(404).send('La asignación de archivo determinación no se encontró.');
    res.send({archivodeterminacion});
});


module.exports = router;