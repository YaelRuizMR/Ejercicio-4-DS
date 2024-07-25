require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.MYSQL_ADDON_HOST,
                user:process.env.MYSQL_ADDON_USER,
                password:process.env.MYSQL_ADDON_PASSWORD,
                database:process.env.MYSQL_ADDON_DB,
                port:process.env.MYSQL_ADDON_PORT
            });
            console.log("Conexión creada a MySql");
        } catch (error) {
            console.error("Error al conectar con MySql "+error);
        }
    }
    async cerrarConexion(){
        try {
            await this.conexion.end();
            console.log("Desconexión de MySql");
        } catch (error) {
            console.error("Error al desconectar de MySql "+error);
        }
    }
}

module.exports = ConectarBD;