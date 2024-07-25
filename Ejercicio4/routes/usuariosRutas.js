const ruta = require("express").Router();
const axios = require("axios");
const Usuario = require("../class/UsuarioClase");
const UsuarioBD = require("../DB/UsuarioBD");

async function acceder(req,res,next){
    const ip= await axios.get("https://api.ipify.org/?format=json");
    console.log(ip.data.ip);
    var ipString=ip+"";
    console.log(ipString);
    if (ip=="200.188.14.2"){
        console.log("Hola");
        next();
    }else{
        console.log("No bienvenido");
        next();
    }
}

ruta.get("/ip",acceder, async(req,res)=>{//obtiene la ip del visitante
    try {
        console.log("Ya se ejecutó el middleware");
        res.end();
    } catch (error) {
        console.log(error);
    }
});

ruta.get("/",async (req, res)=>{
    try {
        const usuariobd=new UsuarioBD();
        const [usuariosBD]=await usuariobd.mostrarUsuarios();
        //console.log(usuariosBD);
        res.render("mostrarUsuarios",{usuariosBD});
    } catch (error) {
        console.log("Error al recuperar los usuarios "+ error);
    }
});

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new Usuario(req.body);
    //console.log(usuario1.obtenerDatos);
    if(usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render("error");
    }else{
        const usuariobd = new UsuarioBD();
        usuariobd.crearUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
    //console.log(usuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario",async(req,res)=>{
    const usuario1 = new Usuario(req.body);
    //console.log(usuario1);
    if(usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render(error);
    }else{
        const usuariobd=new UsuarioBD();
        await usuariobd.actualizarUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/borrarUsuario/:id", async (req,res)=>{
    const usuariobd=new UsuarioBD();
    usuariobd.borrarUsuario(req.params.id);
    res.redirect("/");
});

module.exports=ruta;