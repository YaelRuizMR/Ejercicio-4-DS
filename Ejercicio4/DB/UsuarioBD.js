
const ConectarBD = require("./ConectarBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async crearUsuario(usuario){
        const sql="INSERT INTO usuarios (nombre,celular,correo) VALUES('"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"')";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Registro creado correctamente");
        } catch (error) {
            console.error("Error al crear el registro "+error);
            console.error(sql);
        }
    }
    async mostrarUsuarios(){
        const sql="SELECT * FROM usuarios";
        try {
            await this.conectarMySql();
            const usuariosBD = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return usuariosBD;
        } catch (error) {
            console.error("Error al recuperar los usuarios "+error);
            console.error(sql);
            return null;
        }
    }
    async buscarUsuarioPorId(idUsuario){
        const sql="SELECT * FROM usuarios WHERE idusuario="+idUsuario;
        try {
            await this.conectarMySql();
            const usuario = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return usuario;
        } catch (error) {
            console.error("Error al recuperar al usuario "+error);
            console.error(sql);
            return null;
        }
    }
    async actualizarUsuario(usuario){
        const sql="UPDATE usuarios SET nombre='"+usuario.nombre+"', celular='"+usuario.celular+"', correo='"+usuario.correo+"' WHERE idusuario="+usuario.id;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Actualización exitosa.");
        } catch (error) {
            console.error("Error de actualizacion de usuario. "+error);
            console.error(sql);
            return null;
        }
    }
    async borrarUsuario(idUsuario){
        const sql="DELETE FROM usuarios WHERE idusuario="+idUsuario;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el usuario. "+error);
            console.error(sql);
            return null;
        }
    }
}

module.exports=UsuarioBD;
