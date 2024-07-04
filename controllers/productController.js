const asyncHanlder = require("express-async-handler")
const Product = require("../models/productModel")

//create product
module.exports.createProduct = asyncHanlder(async(req, res, next)=>{
    const { 
        name, 
        category, 
        color, 
        sku, 
        quantity, 
        sold, 
        price, 
        brand,
        description,
        image,
        ratings
        } =req.body
        if(!name, !category, !color, !description, !brand, !quantity, !price)
        {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const product = await Product.create({
            name, 
            category, 
            color, 
            sku, 
            quantity, 
            sold, 
            price,  
            brand,
            description,
            image,
            ratings 
        })

        res.status(201).json(product)

})

//get all products
module.exports.getAllProducts = asyncHanlder(async(req, res, next)=>{
    const products = await Product.find().sort("-createdAt")
    res.status(200).json(products)
})

//get a single product
module.exports.getProduct = asyncHanlder(async(req, res, next)=>{
    const product = await Product.findById(req.params.id)
    if(product)
    {
        res.status(200).json(product)
    }
    else{
        res.status(404)
        throw new Error("Product with this id does not Exist.")
    }
})

//delete product
module.exports.deleteProduct = asyncHanlder( async(req, res, next)=>{
    const product = await Product.findById(req.params.id)
    if(!product)
    {
        res.status(404)
        throw new Error("Product with this id does not Exist.")
    }

    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Product Deleted Successfully."})
})

//updateProduct
module.exports.updateProduct = asyncHanlder(async(req, res, next)=>{
    const {
        name, 
        category, 
        color,
        quantity, 
        sold, 
        price, 
        brand,
        description,
        image,
        ratings
    } = req. body

    const product = await Product.findById(req.params.id)
    if(!product)
    {
        res.status(404)
        throw new Error("Cant find product with this id.")
    }
    const updatedProduct = await Product.findByIdAndUpdate({ _id:req.params.id},
    {
        name, 
        category, 
        color,
        quantity, 
        sold, 
        price, 
        brand,
        description,
        image,
        ratings
    })
    res.status(200).json({message: "Product Updated Successfully."})

})