const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())

app.get("/", function(req, res) {
    res.send("Hello migrfacode")
});


const port = process.env.PORT


app.listen(port, () => {
   console.log(`http://localhost:${port}/`)
  });