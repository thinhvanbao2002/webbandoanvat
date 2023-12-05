import axios from './customize-axios'
// LOGIN
const loginAdmin = (username, password) => {
    return axios.post("/admin/login", {username, password});
}
// LOGIN

// USER
const fetchAddUser = () => {
    return axios.get("/user/get");
}
const axiosDeleteUser = (userID) => {
    return axios.delete(`/user/delete/${userID}`);
}
// USER

// PRODUCT
const fetchAllProduct = () => {
    return axios.get("/product/get");
}
const updateProduct = (idProduct, name, image, price, productsAvailable, description, idCategory) => {
    //[POST] product
    return axios.put(`/product/update/${idProduct}`,{
       _id: idProduct, name: name, image: image, price: price, productsAvailable:productsAvailable, description:description, idCategory:idCategory}, {
         headers: {
             'Content-Type': 'multipart/form-data',
         },
    } );
}
const createProduct = (name, image, price, productsAvailable, description, idCategory) => {
    //[POST] product
    return axios.post("/product/create",{
        name: name, image: image, price: price, productsAvailable:productsAvailable, description:description, idCategory:idCategory}, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    } );
}
const deleteProduct = (productID) => {
    //[DELETE] product
    return axios.delete(`/product/delete/${productID}`);
}
// PRODUCT

// CATEGORY
const fetchAllCategory = () => {
    //[GET] category
    return axios.get("/category/get");
}
const createCategory = (categoryTitle) => {
    //[GET] category
    return axios.post("/category/create",{ title: categoryTitle });
}
const fetchUpdateCategory = (categoryTitle,categoryID) => {
    //[GET] category
    return axios.put(`/category/update/${categoryID}`,{ title: categoryTitle });
}
const deleteCategory = (categoryID) => {
    // ERROR--------------------------------------------------
    return axios.delete(`/category/delete/${categoryID}`);
}
// CATEGORY


// ORDER
const fetchAllOrder = () => {
    //[GET] category
    return axios.get("/order/get");
}
// ORDER

// Voucher
const fetchAllVoucher = () => {
    return axios.get("/voucher/get");
}
const voucherCreate = (title, off, expiration_date) => {
    return axios.post("/voucher/create", {title, off, expiration_date});
}
const voucherDelete = (voucherID) => {
    return axios.delete(`/voucher/delete/${voucherID}`);
}
const voucherUpdate = (voucherID, title, off, expiration_date) => {
    return axios.put(`/voucher/update/${voucherID}`,{title, off, expiration_date});
}
// Voucher
export {
    loginAdmin,
    fetchAddUser,
    axiosDeleteUser,
    fetchAllProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchAllCategory,
    createCategory,
    deleteCategory,
    fetchUpdateCategory,
    fetchAllOrder,
    fetchAllVoucher,
    voucherDelete,
    voucherCreate,
    voucherUpdate
};