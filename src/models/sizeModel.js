import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
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

const Size = mongoose.Schema('sizes', sizeSchema);
export default Size;