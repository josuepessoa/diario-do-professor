const express = require("express");
const turmas = require("./turmasRoutes.js");
const alunos = require("./alunosRoutes.js");
const anotacoes = require("./anotacoesRoutes.js");

const routes = (app) => {
  app.route('/').get((_, res) => {
    res.status(200).send({ titulo: 'Olá Mundo' });
  });

  app.use(
    express.json(),
    turmas,
    alunos,
    anotacoes
  );
};

module.exports = routes;