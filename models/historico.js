const mongoose = require("mongoose");

const historicoSchema = new mongoose.Schema({
  REF_CATASTRAL: String,
  No_RESOLUCION: String,
  No_EXPEDIENTE: String,
  FECHA: String,
  VIG_DETERMINADAS: String,
  NOTIFICADO_DEVUELTO: String,
  BUSQUEDA: String,
  TOTAL_DETERMINADO: String,
  status: String,
});

const Historico = mongoose.model("historico", historicoSchema);

module.exports = Historico;
