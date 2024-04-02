require('dotenv').config()
const mongoose = require('mongoose')

// username banco: vitorlacobortolotti
// senha banco atlas: tjKg88C28yjNLgpt
// const DB = process.env.DATABASE_URL;
const DB = "mongodb+srv://vitorlacobortolotti:tjKg88C28yjNLgpt@cluster0.8tdu58r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(DB)
        .then(() => {
            console.log("Banco de dados conectado")
        })
        .catch(error => {
            console.log(`Erro ao conectar com o banco: ${error}`)
        })
    }
}

module.exports = new Database()