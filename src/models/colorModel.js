import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

const Color = mongoose.Schema('colors', colorSchema);
export default Color;