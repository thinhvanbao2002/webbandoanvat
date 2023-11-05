import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        sold: {
            type: Number,
            required: true,
        },
        productsAvailable: {
            type: Number,
            require: false,
        },
        description: {
            type: String,
            require: false,
        },
        idCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'categorys'
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('products', productSchema);
export default Product;
