import CategoryModel from "../models/categoryModel.js";

const getCategory = async () => {
    const count = await CategoryModel.count();
    const data = await CategoryModel.find();
    if (count === 0 || data.length === 0) {
        throw new Error("Can't get Product");
    }
    const result = { count, data };
    return result;
}

const createCategory = async ({ title }) => {
    const createdCategory = await CategoryModel.create({
        title: title,
    });

    if (!createdCategory) {
        throw new Error("Can't create Category");
    }

    return createdCategory;
};


const updateCategory = async ({ idCategory, title }) => {
    const exitstingCategory = await CategoryModel.findById(idCategory);
    if (!exitstingCategory) {
        throw new Error("Can't find Category");
    }

    exitstingCategory.title = title;

    const updatedCategory = await exitstingCategory.save();

    if (!updatedCategory) {
        throw new Error("Can't update Product");
    }

    return updatedCategory;
}


const deleteCategory = async ({ idCategory }) => {
    const deletedCategory = await CategoryModel.findByIdAndDelete(idCategory);
    if (!deletedCategory) {
        throw new Error("Can't delete Category");
    }
    return deletedCategory;
}

export default {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}