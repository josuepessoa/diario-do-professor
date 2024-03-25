const db = require("../db/dbconfig.js");

class Aluno {
  constructor({
    id,
    nome,
    idade,
    sexo ,
    turma,
    status,
    dataCriacao,
    avatar,
  }) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.sexo = sexo;
    this.turma = turma;
    this.dataCriacao = dataCriacao ;
    this.status = status;
    this.avatar=avatar;
  }

  static async pegarAlunos() {
    return  await db.collection("alunos")
    .get()
    .then((snapshot) => {
        const alunos = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        return alunos
    }
    );
  }

  static async pegarPeloId(id) {
    const alunoRef = db.collection("alunos").doc(id);    
    return alunoRef.get()
      .then((doc) => {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id };
        } else {
          return {message : "ID não encontrado"};
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar aluno por ID:", error);
        throw error;
      });
  }

  async criar() {
    return db.collection('alunos').add({ ...this });
  }

  async atualizar(id) {
    return db.collection('alunos').doc(id).update({ ...this });
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

module.exports = Aluno;