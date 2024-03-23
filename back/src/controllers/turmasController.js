const Turma = require("../models/turmaModel.js");

class TurmasController {
  static listarTurmas = async (req, res) => {
    try {
      const resultado = await Turma.pegarTurmas();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarTurmaPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Turma.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarTurma = async (req, res) => {
    const { body } = req;
    const turma = new Turma(body);
    try {
      const resposta = await turma.salvar(turma);
      return res.status(201).json({ message: 'turma criada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarTurma = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const turmaAtual = await Turma.pegarPeloId(params.id);
      const novaTurma = new Turma({ ...turmaAtual, ...body });
      const resposta = await novaTurma.salvar(novaTurma);
      return res.status(200).json({ message: 'Turma atualizada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

}

module.exports = TurmasController;