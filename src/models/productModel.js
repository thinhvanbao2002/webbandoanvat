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
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        sold: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: false,
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('products', productSchema);
export default Product;
