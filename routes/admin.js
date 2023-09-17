const express = require('express')
const router = express.Router()


const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/',(req,res) => {
    res.render('admin/index')
})

router.get('/categorias',(req,res) => {
    Categoria.find().then(() => {
        res.render("admin/addcategorias",{categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Hou um erro ao listar as categorias!")
        res.redirect("/admin")
    })
    // res.render('admin/categorias')
})
router.get('/categorias/add',(req,res) => {
    res.render("admin/addcategorias")
})

router.post('/categorias/nova',(req,res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug invalido"})
    }

    if(req.body.nome.length < 2){
        erros.push({ texto: "O nome está muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
    }else{
        const novaCategira = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategira).save().then(() => {
            req.flash("success_msg","Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg","Houve algun erro ao salvar a categoria!, temte novamente.")
            res.redirect("/admin")
        })

    }

})

router.get('/posts', (req,res) => {
    res.send("Pagina de posts")
})



module.exports = router
