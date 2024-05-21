const express = require("express");
const VivenciasController = require("../controllers/vivenciasController.js");

const router = express.Router();

router
  .get('/vivencias', VivenciasController.listarVivencias)
  .get('/vivencias/:id', VivenciasController.listarVivenciaPorId)
  .post('/vivencias', VivenciasController.cadastrarVivencia)
  .put('/vivencias/:id', VivenciasController.atualizarVivencia)

module.exports = router;