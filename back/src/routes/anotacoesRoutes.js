const express = require("express");
const AnotacoesController = require("../controllers/anotacoesController.js");

const router = express.Router();

router
  .get('/anotacoes', AnotacoesController.listarAnotacoes)
  .get('/anotacoes/:id', AnotacoesController.listarAnotacaoPorId)
  .post('/anotacoes', AnotacoesController.cadastrarAnotacao)
  .put('/anotacoes/:id', AnotacoesController.atualizarAnotacao)

module.exports = router;