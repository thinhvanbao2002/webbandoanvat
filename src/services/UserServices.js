import axios from './customize-axios'
// LOGIN/ REGISTER
const loginUser = (username, password) => {
    return axios.post('user/login', {username, password});
}
const registerUser = (username, email, password, confirmPassword, fullName) => {
    return axios.post('user/signin',{username, email, password, confirmPassword, fullName});
}

// LOGIN/ REGISTER

// PROFILE
const updateInfo = (userID,fullName,address,phone) => {
    return axios.put(`user/update/${userID}`, {fullName,address,phone});
}

//PROFILE

// PRODUCT
const fetchAllProduct = () => {
    return axios.get("/product/get");
}
const getProductByID = (productID) => {
    return axios.get(`/product/getbyid/${productID}`);
}
// PRODUCT

// CATEGORY
const fetchAllCategory = () => {
    return axios.get("/category/get");
}
// CATEGORY

// CART
const getCart = (idUSer) => {
    return axios.get(`/cart/get/${idUSer}`);
}
const addToCart = (idUser, idProduct) => {
    return axios.post("/cart/add", {idUser, idProduct})
}
// CART

// VOUCHER
const fetchAllVoucher = () => {
    return axios.get('/voucher/get');
}
// VOUCHER
export {
    fetchAllProduct,
    fetchAllCategory,
    registerUser,
    loginUser,
    getProductByID,
    getCart,
    addToCart,
    updateInfo,
    fetchAllVoucher
};