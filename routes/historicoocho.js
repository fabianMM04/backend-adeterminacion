const express = require('express');
const router = express.Router();
const  Historico  = require('../models/historico08');
const moment = require('moment');
var multer = require('multer');

var upload = multer({ dest: 'uploads/' });

app.post('/', upload.single('file'), (req, res, next) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        var historico = [];
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.REF_CATASTRAL_1=jsonObj[i]['REF_CATASTRAL_1'];
            obj.REF_CATASTRAL_2=jsonObj[i]['REF_CATASTRAL_2'];
            obj.No_RESOLUCION=jsonObj[i]['No_RESOLUCION'];
            obj.No_EXPEDIENTE=jsonObj[i]['No_EXPEDIENTE'];
            obj.FECHA=jsonObj[i]['FECHA'];
            obj.VIG_DETERMINADAS=jsonObj[i]['VIG_DETERMINADAS'];
            obj.HOJA=jsonObj[i]['HOJA'];
            obj.NOTIFICADO_DEVUELTO=jsonObj[i]['NOTIFICADO_DEVUELTO'];
            obj.TOTAL_DETERMINADO=jsonObj[i]['TOTAL_DETERMINADO'];

            historico.push(obj);
        }
        Historico.insertMany(historico).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
});


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
        REF_CATASTRAL_1: req.body.REF_CATASTRAL_1,
        REF_CATASTRAL_2: req.body.REF_CATASTRAL_2,
        No_RESOLUCION: req.body.No_RESOLUCION,
        No_EXPEDIENTE: req.body.No_EXPEDIENTE,
        FECHA: req.body.FECHA,
        VIG_DETERMINADAS: req.body.VIG_DETERMINADAS,
        HOJA: req.body.HOJA,
        NOTIFICADO_DEVUELTO: req.body.NOTIFICADO_DEVUELTO,
        TOTAL_DETERMINADO: req.body.TOTAL_DETERMINADO,
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