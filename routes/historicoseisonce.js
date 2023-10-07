const express = require('express');
const router = express.Router();
const  Historico  = require('../models/historico0611');
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
            obj.REFERENCIA=jsonObj[i]['REFERENCIA'];
            obj.REF_CATASTRAL=jsonObj[i]['REF_CATASTRAL'];
            obj.No_RESOLUCION=jsonObj[i]['No_RESOLUCION'];
            obj.No_EXPEDIENTE=jsonObj[i]['No_EXPEDIENTE'];
            obj.FECHA=jsonObj[i]['FECHA'];
            obj.VIG_DETERMINADAS=jsonObj[i]['VIG_DETERMINADAS'];
            obj.GRUPO=jsonObj[i]['GRUPO'];
            obj.NOTIFICADO_DEVUELTO=jsonObj[i]['NOTIFICADO_DEVUELTO'];
            obj.BUSQUEDA=jsonObj[i]['BUSQUEDA'];
            obj.TOTAL_DETERMINADO=jsonObj[i]['TOTAL_DETERMINADO'];
            obj.NO_IMAGE_SCANED=jsonObj[i]['NO_IMAGE_SCANED'];

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
        REFERENCIA: req.body.REFERENCIA,
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