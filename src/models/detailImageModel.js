import mongoose from "mongoose";

const detailImageSchema = new mongoose.Schema(
    {
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
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

const DetailImage = mongoose.model('detailImages', detailImageSchema);
export default DetailImage;