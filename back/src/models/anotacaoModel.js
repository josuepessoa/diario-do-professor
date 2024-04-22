const db = require("../db/dbconfig.js");

class Anotacao {
  constructor({
    id,
    idAluno,
    dataCriacao,
    descricao ,
  }) {
    this.id = id;
    this.idAluno = idAluno;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao ;
  }

  static async pegarAnotacoes(idAluno) {
    let query = db.collection("anotacoes");
    console.log(idAluno)
    if (idAluno) {
      query = query.where("idAluno", "==", idAluno);
    }

    return query.get()
      .then((snapshot) => {
        const anotacoes = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return anotacoes;
      })
      .catch((error) => {
        console.error("Erro ao buscar anotações:", error);
        throw error;
      });
}

  static async pegarPeloId(id) {
    const anotacaoRef = db.collection("anotacoes").doc(id);    
    return anotacaoRef.get()
      .then((doc) => {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
        } else {
          return {message : "ID não encontrado"};
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar anotação por ID:", error);
        throw error;
      });
  }

  async criar() {
    return db.collection('anotacoes').add({ ...this });
  }

  async atualizar(id) {
    return db.collection('anotacoes').doc(id).update({ ...this });
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

module.exports = Anotacao;