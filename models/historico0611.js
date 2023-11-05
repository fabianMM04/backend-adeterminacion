const mongoose = require("mongoose");

const historicoseisonceSchema = new mongoose.Schema({
  REFERENCIA: String,
  REF_CATASTRAL: String,
  No_RESOLUCION: String,
  No_EXPEDIENTE: String,
  FECHA: String,
  VIG_DETERMINADAS: String,
  GRUPO: String,
  NOTIFICADO_DEVUELTO: String,
  BUSQUEDA: String,
  TOTAL_DETERMINADO: String,
  NO_IMAGE_SCANED: String,
  status: String,
});

const HistoricoSeisOnce = mongoose.model(
  "historicoseisonce",
  historicoseisonceSchema
);

module.exports = HistoricoSeisOnce;
