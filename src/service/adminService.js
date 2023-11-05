import AdminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

const login = async ({ username, password }) => {
    const existingUser = await AdminModel.findOne({ username });
    if (existingUser) {
        if (existingUser.password != password) {
            throw new Error('Invalid Password');
        } else {
            return existingUser;
        }
    } else {
        throw new Error("User not already");
    }
}



export default {
    login
}