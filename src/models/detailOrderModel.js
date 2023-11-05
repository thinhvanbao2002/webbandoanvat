import mongoose from "mongoose";

const detailOrderSchema = new mongoose.Schema(
    {
        idOrder: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'orders',
        },
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'products',
        },
        amount: {
            type: Number,
            require: true,
        },
        cost: {
            type: Number,
            require: true
        }
    }
)

const DetailOrder = mongoose.Schema('detailOrders', detailOrderSchema);
export default DetailOrder;