const Anotacao = require("../models/anotacaoModel.js");

class AnotacoesController {
  static listarAnotacoes = async (req, res) => {
    const { idAluno } = req.query;
    try {
      const resultado = await Anotacao.pegarAnotacoes(idAluno);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarAnotacaoPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Anotacao.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarAnotacao = async (req, res) => {
    const { body } = req;
    const anotacao = new Anotacao(body);
    try {
      const resposta = await anotacao.salvar(anotacao);
      return res.status(201).json({ message: 'Anotação criada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarAnotacao = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const anotacaoAtual = await Anotacao.pegarPeloId(params.id);
      const novaAnotacao = new Anotacao({ ...anotacaoAtual, ...body });
      const resposta = await novaAnotacao.salvar(novaAnotacao);
      return res.status(200).json({ message: 'Anotação atualizada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

}

module.exports = AnotacoesController;