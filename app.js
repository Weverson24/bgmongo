const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./routes/admin")
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const session = require('express-session')
const flash = require("connect-flash")

// Configurações:
    //SESSION
        app.use(session({
            secret: "cursodenode",
            resave:true,
            saveUninitialized:true
        }))
        app.use(flash())
        
    //MIDDLEWARE
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash("Success_msg")
            res.locals.error_msg = req.flash("Error_msg")
            next()
        })    

    // BODYPARSER
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())


    //HANDLEBARS
        app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine','handlebars')


    //MONGOOSE
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://127.0.0.1/blogapp').then(() => {
            console.log("Conexão com o mongodb realizada com sucesso!..")
        }).catch((err) => {
            console.log("Erro ao se conectar ao servidor "+err)
        })


    //PUBLIC
        app.use(express.static(path.join(__dirname,"public")))
       

    //ROTAS

        app.get("/",(re,res) => {
            res.send("Ola meu arquivo princial, alias esse não é do admin ok!..")
        })
        
        app.use("/admin",admin)//DESSA FORMA CONSIGO MANTER MEUS AQUIVOS PROTEGIDOS:
const PORT = 8081
app.listen(PORT,() => {
    console.log("Servidor rodando com sucesso..")
})

