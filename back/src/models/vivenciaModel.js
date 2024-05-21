const db = require("../db/dbconfig.js");

class Vivencia {
  constructor({
    id,
    titulo,
    dataCriacao,
    descricao,
    categorias
  }) {
    this.id = id;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao ;
    this.titulo = titulo;
    this.categorias = categorias;
  }

  static async pegarVivencias(idAluno) {
    let query = db.collection("vivencias");

    return query.get()
      .then((snapshot) => {
        const vivencias = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return vivencias;
      })
      .catch((error) => {
        console.error("Erro ao buscar vivencias:", error);
        throw error;
      });
}

  static async pegarPeloId(id) {
    const vivenciaRef = db.collection("vivencias").doc(id);    
    return vivenciaRef.get()
      .then((doc) => {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
        } else {
          return {message : "ID não encontrado"};
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar vivencia por ID:", error);
        throw error;
      });
  }

  async criar() {
    return db.collection('vivencias').add({ ...this });
  }

  async atualizar(id) {
    return db.collection('vivencias').doc(id).update({ ...this });
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }
}

module.exports = Vivencia;