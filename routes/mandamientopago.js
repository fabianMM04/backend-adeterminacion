const express = require('express');
const router = express.Router();
const  MandamientoPago  = require('../models/mandamientopago');
const moment = require('moment');


router.get('/',   (req, res) =>{
    MandamientoPago.find({}).exec( async (err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado mandamientos de pagos."
                });
            }else{
                let activo = await MandamientoPago.find({status: 'ACTIVO'})
                let cerrado = await MandamientoPago.find({status: 'CERRADO'})
                res.status(200).send({
                    mandamientopago:asignacionesAD,
                    activos: activo.length,
                    cerrados: cerrado.length,
                    total: asignacionesAD.length
                });
            }
        }
    });
    
});

router.get('/users/:id',  (req, res) =>{
    let id = req.params.id;
    MandamientoPago.find({ cedula: id }).exec((err, asignacionesAD) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!asignacionesAD){
                res.status(404).send({
                    message: "No se han encontrado mandamientos de pagos."
                });
            }else{
                res.status(200).send({
                    mandamientopago:asignacionesAD



                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let mandamientopago = await MandamientoPago.findById(id);
    if(!mandamientopago) return res.status(404).send('El mandamiento de pago no fue encontrado.');
     
    res.send({mandamientopago});
});

router.post('/', async(req, res) => {

    let mandamientopago = new MandamientoPago({
        reolucion_no: req.body.reolucion_no,
        no_expediente: req.body.no_expediente,
        fecha: req.body.fecha,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        referencia_catastral: req.body.referencia_catastral,
        propietario: req.body.propietario,
        vigencias: req.body.vigencias,
        valor: req.body.valor,
        madamiento_no: req.body.madamiento_no,
        notificacion: req.body.notificacion,
        cedula: req.body.usuario,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    mandamientopago = await mandamientopago.save();
    if(!mandamientopago) return res.status(404).send("No se guardó el mandamiento de pago!");
    res.send({mandamientopago});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let mandamientopago = await MandamientoPago.findByIdAndUpdate(id, req.body, {new: true});
    if(!mandamientopago) return res.status(404).send('El mandamiento de pago no se encontró.');    
    res.status(200).send({mandamientopago});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    console.log("id eliminar")
    let mandamientopago = await MandamientoPago.findByIdAndRemove(id);
    if(!mandamientopago) return res.status(404).send('El mandamiento de pago no se encontró.');
    res.status(200).send({mandamientopago});
});


module.exports = router;