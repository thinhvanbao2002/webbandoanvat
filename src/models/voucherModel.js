import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        off: {
            type: Number,
            require: true,
        },
        expiration_date: {
            type: Date,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

const Voucher = mongoose.Schema('vouchers', voucherSchema);
export default Voucher;