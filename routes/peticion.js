const express = require('express');
const router = express.Router();
const  Peticion  = require('../models/peticion');
const moment = require('moment');


router.get('/',  (req, res) =>{
    Peticion.find({}).populate({path: 'usu_oficina', select: 'nombre'}).populate({path: 'usu_contribuyente', select: 'nombre'}).exec((err, peticiones) =>{
        if(err){
            res.status(500).send({
                message: "Request error"
            });
        }else{
            if(!peticiones){
                res.status(404).send({
                    message: "Error to finds peticiones"
                });
            }else{
                res.status(200).send({
                    peticiones
                });
            }
        }
    });
    
});

router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    let peticion = await Peticion.findById(id).populate({path: 'user'});
    if(!peticion) return res.status(404).send('La petición no fue encontrada');
     
    res.send({peticion});
});

router.post('/', async(req, res) => {

    let peticion = new Peticion({
        ciudad: req.body.ciudad,
        tipo_solicitud: req.body.tipo_solicitud,
        oficina: req.body.oficina,
        usu_oficina: req.body.usu_oficina,
        tipo_peticion: req.body.tipo_peticion,
        usu_contribuyente: req.body.usu_contribuyente,
        fecha_cre: moment().format('YYYY MM DD HH:mm:ss'),
        fecha_up: moment().format('YYYY MM DD HH:mm:ss'),
        status: 'ACTIVO'
    });
    
    peticion = await peticion.save();
    if(!peticion) return res.status(404).send("No se guardó la petición!");
    res.send({peticion});
});

router.put('/:id', async (req, res) =>{

    let id = req.params.id;
    let peticion = await Peticion.findByIdAndUpdate(id, req.body, {new: true});
    if(!peticion) return res.status(404).send('La petición no se encontró.');    
    res.status(200).send({peticion});
});

router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let peticion = await Peticion.findByIdAndRemove(id);
    if(!peticion) return res.status(404).send('La petición no se encontró.');
    res.send({peticion});
});


module.exports = router;