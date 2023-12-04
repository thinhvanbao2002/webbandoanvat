import axios from './customize-axios'
// LOGIN/ REGISTER
const loginUser = (username, password) => {
    return axios.post('user/login', {username, password});
}
const registerUser = (username, email, password, confirmPassword, fullName) => {
    return axios.post("user/signin",{username, email, password, confirmPassword, fullName});
}

// LOGIN/ REGISTER


// PRODUCT
const fetchAllProduct = () => {
    return axios.get("/product/get");
}
// PRODUCT

// CATEGORY
const fetchAllCategory = () => {
    return axios.get("/category/get");
}
// CATEGORY
export {
    fetchAllProduct,
    fetchAllCategory,
    registerUser,
    loginUser
};