const express = require("express");
const TurmasController = require("../controllers/turmasController.js");

const router = express.Router();

router
  .get('/turmas', TurmasController.listarTurmas)
  .get('/turmas/:id', TurmasController.listarTurmaPorId)
  .post('/turmas', TurmasController.cadastrarTurma)
  .put('/turmas/:id', TurmasController.atualizarTurma)

module.exports = router;