const express = require("express");
var path = require("path");
var usuariosRutas=require("./routes/usuariosRutas");
const app = express();
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(express.urlencoded({extend:true}));
app.use("/", usuariosRutas);
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en https://localhost:"+port);
});