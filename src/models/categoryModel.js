import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            ref: 'products'
        },
        detailImage: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('categorys', categorySchema);
export default Category;
