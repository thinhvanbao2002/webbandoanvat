import mongoose from "mongoose";

const detailColorSchema = new mongoose.Schema(
    {
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "products"
        },
        idSize: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "colors"
        },
    },
    {
        timestams: true,
    }
)

const Voucher = mongoose.Schema('vouchers', voucherSchema);
export default Voucher;