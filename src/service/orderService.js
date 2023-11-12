import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

const getOrder = async ({ perPage, page }) => {
    const count = await OrderModel.count();
    const data = await OrderModel.find().limit(perPage).skip((page - 1) * perPage);;
    if (count === 0 || data.length === 0) {
        throw new Error("Can't get Product");
    }
    const result = { count, data };
    return result;
}

const searchOrder = async ({ perPage, keyword, page }) => {
    const getKeyword = {
        $or: [
            { username: { $regex: keyword, $options: 'i' } },
            { fullName: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
        ]
    };
    
    const users = await UserModel.find(getKeyword);

    if (users.length === 0) {
        throw new Error("Can't find any matching users.");
    }

    const userIds = users.map(user => user._id);

    const data = await OrderModel
        .find({ idUser: { $in: userIds } })
        .limit(perPage)
        .skip((page - 1) * perPage);

    if (data.length === 0) {
        throw new Error("Can't find any matching orders.");
    }

    return data;
}


const createOrder = async ({ title }) => {
    const createdCategory = await CategoryModel.create({
        title: title,
    });

    if (!createdCategory) {
        throw new Error("Can't create Category");
    }

    return { createdCategory };
};


const updateOrder = async ({ idCategory, title }) => {
    const exitstingCategory = await CategoryModel.findById(idCategory);
    if (!exitstingCategory) {
        throw new Error("Can't find Category");
    }

    exitstingCategory.title = title;

    const updatedCategory = await exitstingCategory.save();

    if (!updatedCategory) {
        throw new Error("Can't update Product");
    }

    return { updatedCategory };
}


const deleteOrder = async (idProduct) => {
    const deletedCategory = await CategoryModel.findByIdAndDelete({ idCategory });
    if (!deletedCategory) {
        throw new Error("Can't delete Category");
    }
    return { deletedCategory };
}

export default {
    getOrder,
    searchOrder,
    createOrder,
    updateOrder,
    deleteOrder
}