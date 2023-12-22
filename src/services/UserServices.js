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
const getInfo = (userID) => {
    return axios.get(`/user/getbyid/${userID}`);
}

const updateInfo = (userID,fullName,address,phone) => {
    return axios.put(`user/update/${userID}`, {fullName,address,phone});
}
const updateAvatar = (userID,avatar) => {
    return axios.put(`user/updateavt/${userID}`,{avatar},{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
   });
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
    return axios.post("/cart/add", {idUser, idProduct});
}
const deleteCart = (idCart) => {
    return axios.delete(`/cart/delete/${idCart}`);
}
// CART

// VOUCHER
const fetchAllVoucher = () => {
    return axios.get('/voucher/get');
}
// VOUCHER

// ORDER
const createOrder = (idUser, idVoucher,total,products) => {
    return axios.post('order/create', {idUser, idVoucher, total, products});
}


// ORDER
export {
    fetchAllProduct,
    fetchAllCategory,
    registerUser,
    loginUser,
    getProductByID,
    getCart,
    addToCart,
    deleteCart,
    getInfo,
    updateInfo,
    updateAvatar,
    fetchAllVoucher,
    createOrder 
};