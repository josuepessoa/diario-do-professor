const routes = require("./routes/routes.js");
const express = require("express");

const app = express();
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:4200",
};

app.use(express.json());

app.use(cors(corsOptions));

routes(app);

module.exports = app;