const db = require("../db/dbconfig.js");

class Dashboard {
  constructor() {
  }

  static async pegarDashboard() {

    // Totalizadores de Alunos
    const alunosSnapshot = await db.collection('alunos').get();
    const alunosAtivos = alunosSnapshot.docs.filter(doc => doc.data().status === 'ativo').length;
    const alunosInativos = alunosSnapshot.docs.filter(doc => doc.data().status !== 'ativo').length;

    // Totalizadores de turmas
    const turmasSnapshot = await db.collection('turmas').get();
    const turmasAtivas = turmasSnapshot.docs.filter(doc => doc.data().status === 'ativo').length;
    const turmasInativas = turmasSnapshot.docs.filter(doc => doc.data().status !== 'ativo').length;

    // Totalizadores de anotações e vivências dos últimos 30 dias
    const currentDate = new Date();
    const last30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));

    const anotacoesSnapshot = await db.collection('anotacoes').get();
    const vivenciasSnapshot = await db.collection('vivencias').get();

    const anotacoesUltimoMes = anotacoesSnapshot.docs.filter(doc => {
      const dataCriacao = new Date(doc.data().dataCriacao);
      return dataCriacao >= last30Days;
    }).length;

    const anotacoesTotal= anotacoesSnapshot.docs.length

    const vivenciasUltimoMes = vivenciasSnapshot.docs.filter(doc => {
        const dataCriacao = new Date(doc.data().dataCriacao);
        return dataCriacao >= last30Days;
    }).length;

    const vivcenciasTotal = vivenciasSnapshot.docs.length

    let response = {
      alunos : {
        ativos : alunosAtivos,
        inativos : alunosInativos
      },
      turmas : {
        ativos: turmasAtivas,
        inativos: turmasInativas
      },
      vivencias : {
        total : vivcenciasTotal,
        ultimoMes : vivenciasUltimoMes,
      },
      anotacoes : {
        total : anotacoesTotal,
        ultimoMes : anotacoesUltimoMes,
      },
    };

    return response;
  }
  
}

module.exports = Dashboard;