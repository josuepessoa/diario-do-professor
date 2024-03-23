const express = require("express");
const AlunosController = require("../controllers/alunosController.js");

const router = express.Router();

router
  .get('/alunos', AlunosController.listarAlunos)
  .get('/alunos/:id', AlunosController.listarAlunoPorId)
  .post('/alunos', AlunosController.cadastrarAluno)
  .put('/alunos/:id', AlunosController.atualizarAluno)

module.exports = router;