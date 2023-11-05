const mongoose = require("mongoose");

const historicoochoSchema = new mongoose.Schema({
  REF_CATASTRAL_1: String,
  REF_CATASTRAL_2: String,
  No_RESOLUCION: String,
  No_EXPEDIENTE: String,
  FECHA: String,
  VIG_DETERMINADAS: String,
  HOJA: String,
  NOTIFICADO_DEVUELTO: String,
  TOTAL_DETERMINADO: String,
  status: String,
});

const HistoricoOcho = mongoose.model("historicoocho", historicoochoSchema);

module.exports = HistoricoOcho;
