const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//create a new order
exports.newOrder = async (req, res, next) =>{
    try {
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;
    
        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt : Date.now(),
            user: req.user._id
        });
    
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

//get a single order
exports.getSingleOrder = async (req, res, next) =>{
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if(!order){
            return res.status(404).json("No order found with this id");
        }

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//get logged in user order
exports.getMyOrders = async (req, res, next) =>{
    try {
        const orders = await Order.find({user: req.user.id});

        res.status(200).json({
            success: true,
            orders
        });
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//get all orders by admin

exports.allOrders = async (req, res, next) =>{
    try {
        const orders = await Order.find({});

        res.status(200).json({
            success: true,
            orders
        });
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}