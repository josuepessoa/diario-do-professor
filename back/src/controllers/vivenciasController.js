const Vivencia = require("../models/vivenciaModel.js");

class VivenciasController {
  static listarVivencias = async (req, res) => {
    const { idAluno } = req.query;
    try {
      const resultado = await Vivencia.pegarVivencias(idAluno);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarVivenciaPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Vivencia.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarVivencia = async (req, res) => {
    const { body } = req;
    const vivencia = new Vivencia(body);
    try {
      const resposta = await vivencia.salvar(vivencia);
      return res.status(201).json({ message: 'Vivencia criada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarVivencia = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const vivenciaAtual = await Vivencia.pegarPeloId(params.id);
      const novaVivencia = new Vivencia({ ...vivenciaAtual, ...body });
      const resposta = await novaVivencia.salvar(novaVivencia);
      return res.status(200).json({ message: 'Vivencia atualizada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

}

module.exports = VivenciasController;