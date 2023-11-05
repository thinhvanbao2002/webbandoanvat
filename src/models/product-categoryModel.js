import mongoose from "mongoose";

const product_categorySchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'users'
        },
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'products'
        }
    },
    {
        timestamps: true,
    }
)

const Product_Category = mongoose.Schema('product_category', product_categorySchema);
export default Product_Category;