const Product = require("../models/productModel");

//create a new product
exports.createProduct = async (req, res, next) =>{
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//get all the products
exports.getProducts = async(req, res, next) =>{
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//get single products details
exports.getProduct = async (req, res, next) =>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
