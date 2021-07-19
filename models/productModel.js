const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [300, "Product name cannot exceeds 300 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Product price cannot exceeds 5 characters"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Please add category for this product"]
    },
    seller: {
        type: String,
        required: [true, "Please add seller for this product"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product Stock"],
        maxLength: [5, "Product stock cannot exceeds 5 character"],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);
