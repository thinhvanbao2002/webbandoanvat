import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'users',
        },
        idVoucher: {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'vouchers',
        },
        total: {
            type: Number,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.Schema('orders', orderSchema);
export default Order;