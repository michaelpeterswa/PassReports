// clsl v1.0.0
// Michael Peters

const express = require("express");
const cors = require("cors");
const path = require("path");
const bp = require("body-parser");
const axios = require("axios");

require('dotenv').config()

let url = `http://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode=${process.env.apiKey}`

// port the app is currently serving to
const app_port = 6981;
const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(
  bp.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

async function getPassReport() {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error(error);
    }
}

app.get("/", function (req, res) {
    getPassReport().then((passData) => {
        res.render("index", {passData: passData}); 
    })
  
});

app.use(function (req, res) {
    res.status(404).render("404")
  })

const app_server = app.listen(app_port, () =>
  console.log(`passreports server app listening on port ${app_port}!\n`)
);

module.exports = app_server;