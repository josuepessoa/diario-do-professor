const express = require("express");
const DashboardController = require("../controllers/dashboardController.js");

const router = express.Router();

router
  .get('/dashboard', DashboardController.dadosDashboard)

module.exports = router;