import CategoryModel from "../models/categoryModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const signin = async ({ username, password, fullName, email, userToken }) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        throw new Error("Username already exists");
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    const createUser = await UserModel.create({
        username: username,
        password: hashPassword,
        fullName: fullName,
        email: email,
        isVerified: false,
        phone: "",
        avt: "src\\files\\images\\avt.jpg",
        address: ""
    })

    createUser.password = "*****";

    const createUserToken = await UserToken.create({
        userID: createUser.id,
        token: userToken
    })

    if (!createUser || !createUserToken) {
        throw new Error("Can't create User");
    }

    console.log(createUser.id, `---`, userToken);
    return createUser;
}

const verifyEmail = async ({ userID, token }) => {
    const existingUser = await UserModel.findById(userID);
    if (!existingUser) {
        throw new Error("User not exists");
    }

    const existingToken = await UserToken.findOne({ userID: existingUser._id, token: token });

    if (!existingToken) {
        throw new Error("Token not exists");
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.exp < Date.now() / 1000) {
        throw new Error(`Link has expired`);
    } else {
        existingUser.isVerified = true;
        await existingUser.save();
        await UserToken.findByIdAndRemove(existingToken._id);
        return existingUser;
    }
}

const login = async ({ username, password }) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Password');
        } if (existingUser.isVerified == false) {
            throw new Error('Email not verify');
        } else {
            return existingUser;
        }
    } else {
        throw new Error("User not already");
    }
}

const getUser = async (page, perPage) => {
    const count = await UserModel.count();
    const data = await UserModel.find().limit(perPage).skip((page - 1) * perPage);
    if (count === 0 || data.length === 0) {
        throw new Error("Can't get Users");
    }
    const result = { count, data };
    return result;
}

const searchUser = async (perPage, page, keyword) => {
    const getKeyword = {
        $or: [ //tìm bản ghi phù hợp ở cả 3 trường dữ liệu
            { username: { $regex: keyword, $options: 'i' } }, //regex: biểu thức tìm chuỗi khớp, option "i": k phân biệt hoa thường
            { fullName: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },

        ]
    };
    console.log(keyword);
    const count = await UserModel.countDocuments(getKeyword);
    const data = await UserModel.find(getKeyword).limit(perPage).skip((page - 1) * perPage);
    if (count === 0 || data.length === 0) {
        throw new Error("Can't find Users");
    }
    const result = { count, data };
    return result;
}

const updateAvtUser = async ({ userID, filePath }) => {
    console.log(userID, filePath);
    const existingUser = await UserModel.findById(userID);
    if (!existingUser) {
        throw new Error("User not exists");
    }

    existingUser.avt = filePath;
    const result = await existingUser.save();
    return result;
}

const updateUser = async ({ userID, fullName, address }) => {
    const exitstingUser = await UserModel.findById(userID);
    if (!exitstingUser) {
        throw new Error("User not't exitst");
    }

    exitstingUser.fullName = fullName;
    exitstingUser.address = address;
    const data = await exitstingUser.save();
    return data;
}

const deleteUser = async (userID) => {
    const deletedUser = await UserModel.findByIdAndDelete(userID);
    if (!deletedUser) {
        throw new Error("Can't delete User");
    }
    return deletedUser;
}

export default {
    signin,
    verifyEmail,
    login,
    getUser,
    searchUser,
    updateAvtUser,
    updateUser,
    deleteUser
}