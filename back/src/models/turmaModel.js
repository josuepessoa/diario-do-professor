const db = require("../db/dbconfig.js");

class Turma {
  constructor({
    id,
    descricao,
    ano ,
    idadeInicial,
    idadeFinal,
    periodo,
    dataCriacao
  }) {
    this.descricao = descricao;
    this.ano = ano;
    this.idadeInicial = idadeInicial;
    this.idadeFinal = idadeFinal;
    this.periodo = periodo
    this.dataCriacao = dataCriacao ;
  }

  static async pegarTurmas() {
    return  await db.collection("turmas")
    .get()
    .then((snapshot) => {
        const turmas = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        return turmas
    }
    );
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('livros').where({ id });
    return resultado[0];
  }

  async criar() {
    return db.collection('turmas').add({ ...this });
  }

  async atualizar(id) {
    return db.collection('turmas').doc(id).update({ ...this });
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

module.exports = Turma;