//exportando biblioteca
const mysql = require("mysql2");
//passando informações do banco de dados para exportar
const pool = mysql.createConnection({
    //host significa hospedeiro
    host: "localhost",
    user: "root",
    password: "",
    database: "taskmanager"
}).promise();

// função assincrona esperando a primeira ser concluida
async function connection(){
    await pool.connect((err) => {
        if(err) {
            throw err
        }
        console.log("MySqL connected...")
    })
    pool.destroy()
}
module.exports = {connection, pool};