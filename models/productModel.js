const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [ true, "Please add product name"],
        trim: true
    },
    category: {
        type: String,
        required: [ true, "Please add category name"],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: 'SKU',
        trim: true
    },
    brand: {
        type: String,
        required: [ true, "Please add a brand"],
        trim: true
    },
    color: {
        type: String,
        required: [ true, "Please add a color"],
        default: 'As seen',
        trim: true
    },
    quantity: {
        type: Number,
        required: [ true, "Please add quantity"],
        trim: true
    }, 
    sold: {
        type: Number,
        default: 0,
        trim: true
    },
    regularPrice: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        required: [ true, "Please add price"],
        trim: true
    },
    description: {
        type: String,
        required: [ true, "Please add product description"],
        trim: true
    },
    image: {
        type: [String],
    },
    ratings: {
        type: [Object],
    }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)