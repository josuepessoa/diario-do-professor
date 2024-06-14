const Dashboard = require("../models/dashboardModel.js");

class DashboardController {
  static dadosDashboard = async (req, res) => {
    try {
      const resultado = await Dashboard.pegarDashboard();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

}

module.exports = DashboardController;