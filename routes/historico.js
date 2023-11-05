const express = require("express");
const router = express.Router();
const Historico = require("../models/historico");
const moment = require("moment");
var multer = require("multer");
const csv = require("csvtojson");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".csv");
  },
});

const upload = multer({ storage: storage });

router.post("/upload_files", upload.single("file"), (req, res, next) => {
  csv({ delimiter: "auto" })
    .fromFile(req.file.path)
    .then((jsonObj) => {
      var historico = [];
      for (var i = 0; i < jsonObj.length; i++) {
        var obj = {};
        obj.REF_CATASTRAL = jsonObj[i]["REF_CATASTRAL"];
        obj.No_RESOLUCION = jsonObj[i]["No_RESOLUCION"];
        obj.FECHA = jsonObj[i]["FECHA"];
        obj.VIG_DETERMINADAS = jsonObj[i]["VIG_DETERMINADAS"];
        obj.NOTIFICADO_DEVUELTO = jsonObj[i]["NOTIFICADO_DEVUELTO"];
        obj.BUSQUEDA = jsonObj[i]["BUSQUEDA"];
        obj.TOTAL_DETERMINADO = jsonObj[i]["TOTAL_DETERMINADO"];
        obj.status = "ACTIVO";

        historico.push(obj);
      }
      Historico.insertMany(historico)
        .then(function () {
          res.status(200).send({
            message: "Successfully Uploaded!",
          });
        })
        .catch(function (error) {
          res.status(500).send({
            message: "failure",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
});

router.get("/", (req, res) => {
  Historico.find({}).exec(async (err, asignacionesAD) => {
    if (err) {
      res.status(500).send({
        message: "Request error",
      });
    } else {
      if (!asignacionesAD) {
        res.status(404).send({
          message: "No se han encontrado datos historicos.",
        });
      } else {
        console.log("show historico");
        res.status(200).send({
          historico: asignacionesAD,
        });
      }
    }
  });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let historico = await Historico.findById(id);
  if (!historico)
    return res.status(404).send("El historico no fue encontrado.");

  res.send({ historico });
});

router.post("/", async (req, res) => {
  let historico = new Historico({
    REF_CATASTRAL: req.body.REF_CATASTRAL,
    No_RESOLUCION: req.body.No_RESOLUCION,
    No_EXPEDIENTE: req.body.No_EXPEDIENTE,
    FECHA: req.body.FECHA,
    VIG_DETERMINADAS: req.body.VIG_DETERMINADAS,
    NOTIFICADO_DEVUELTO: req.body.NOTIFICADO_DEVUELTO,
    BUSQUEDA: req.body.BUSQUEDA,
    TOTAL_DETERMINADO: req.body.TOTAL_DETERMINADO,
    status: "ACTIVO",
  });

  historico = await historico.save();
  if (!historico) return res.status(404).send("No se guardó el historico!");
  res.send({ historico });
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let historico = await Historico.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!historico) return res.status(404).send("El historico no se encontró.");
  res.status(200).send({ historico });
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let historico = await Historico.findByIdAndRemove(id);
  if (!historico) return res.status(404).send("El historico no se encontró.");
  res.send({ historico });
});

module.exports = router;
