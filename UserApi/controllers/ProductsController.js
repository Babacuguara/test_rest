var Products = require("../models/Products");


class ProductsController{
    async index(req, res){}

    async create(req,res){
        var {categoria_id, nome, unidade, quantidade, descricao, preco, foto, qtpessoas} = req.body;

        if(nome == undefined){
            res.status(400);
            res.json({err: "Cadastre o produto"})
            return;
        }

        await Products.new(categoria_id, nome, unidade, quantidade, descricao, preco, foto, qtpessoas);

        res.status(200);
        res.send("Tudo Ok")
    }



} 

module.exports = new ProductsController();