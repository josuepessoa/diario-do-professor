const Aluno = require("../models/alunoModel.js");

class AlunosController {
  static listarAlunos = async (req, res) => {
    try {
      const resultado = await Aluno.pegarAlunos();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarAlunoPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Aluno.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarAluno = async (req, res) => {
    const { body } = req;
    const aluno = new Aluno(body);
    try {
      const resposta = await aluno.salvar(aluno);
      return res.status(201).json({ message: 'aluno criado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarAluno = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const alunoAtual = await Aluno.pegarPeloId(params.id);
      const novoAluno = new Aluno({ ...alunoAtual, ...body });
      const resposta = await novoAluno.salvar(novoAluno);
      return res.status(200).json({ message: 'Aluno atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

}

module.exports = AlunosController;