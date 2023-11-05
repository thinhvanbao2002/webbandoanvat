import mongoose from "mongoose";

const detailSizeSchema = new mongoose.Schema(
    {
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "products"
        },
        idSize: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "sizes"
        },
    },
    {
        timestams: true,
    }
)

const Voucher = mongoose.Schema('vouchers', voucherSchema);
export default Voucher;