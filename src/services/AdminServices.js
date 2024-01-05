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
const searchUser = (keyword) => {
    //[GET] search product
    return axios.get(`/user/search/?keyword=${keyword}`);
}
// USER

// PRODUCT
const fetchAllProduct = () => {
    return axios.get("/product/get");
}
const getProductByID = (productID) => {
    return axios.get(`/product/getbyid/${productID}`);
}
const updateProduct = (idProduct, name, image, price, productsAvailable, description, idCategory, unit, detailImages) => {
    //[POST] product
    const formData = new FormData();
    formData.append('_id', idProduct);
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('productsAvailable', productsAvailable);
    formData.append('description', description);
    formData.append('idCategory', idCategory);
    formData.append('unit', unit);
    // formData.append('detailImages', detailImages);
 
    detailImages.forEach((detailImage, index) => {
        formData.append(`detailImages`, detailImage);
    });
    return axios.put(`/product/update/${idProduct}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    // return axios.put(`/product/update/${idProduct}`,{
    //    _id: idProduct, name: name, image: image, price: price, productsAvailable:productsAvailable, description:description, idCategory:idCategory}, {
    //      headers: {
    //          'Content-Type': 'multipart/form-data',
    //      },
    // } );
}
const createProduct = (name, image, price, productsAvailable, description, idCategory , unit, detailImages) => {
    //[POST] product
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('productsAvailable', productsAvailable);
    formData.append('description', description);
    formData.append('idCategory', idCategory);
    formData.append('unit', unit);
    // formData.append('detailImages', detailImages);
 
    detailImages.forEach((detailImage, index) => {
        formData.append(`detailImages`, detailImage);
    });
    console.log(detailImages[0]);
    return axios.post("/product/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
const deleteProduct = (productID) => {
    //[DELETE] product
    return axios.delete(`/product/delete/${productID}`);
}
const searchProduct = (keyword) => {
    //[GET] search product
    return axios.get(`/product/search?keyword=${keyword}`);
}

// PRODUCT

// CATEGORY
const fetchAllCategory = () => {
    //[GET] category
    return axios.get("/category/get");
}
const fetchAllCategoryPage = (page, perPage) => {
    //[GET] category
    return axios.get(`/category/get?page=${page}&perpage=${perPage}`);
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
    //[DELETE] category
    return axios.delete(`/category/delete/${categoryID}`);
}

const categorySearch = (keyword) => {
    return axios.get(`/category/search?keyword=${keyword}`)
}
// CATEGORY


// ORDER
const fetchAllOrder = () => {
    //[GET] category
    return axios.get("/order/get");
}
const fetchAllOrderPage = (page, perpage) => {
    //[GET] category
    return axios.get(`/order/get?page=${page}&perpage=${perpage}`);
}
const deleteOrder = (orderID) => {
    return axios.delete(`order/delete/${orderID}`);
}
const searchOrder = (keyword) => {
    return axios.get(`/order/search?keyword=${keyword}`);
}
// ORDER

// Voucher
const fetchAllVoucher = () => {
    return axios.get("/voucher/get");
}
const fetchAllVoucherPage = (page, perPage) => {
    return axios.get(`/voucher/get?page=${page}&perpage=${perPage}`);
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

// Inventory

const fetchAllInventory = () => {
    return axios.get("/inventory/get");
}
const fetchAllInventoryPage = (page, perPage) => {
    return axios.get(`/inventory/get?page=${page}&perpage=${perPage}`);
}
const createInventory = (idAdmin, idProduct, amount, price, description) => {
    return axios.post('/inventory/create',{idAdmin, idProduct, amount,price, description});
}
const deleteInventory = (inventoryID) => {
    return axios.delete(`/inventory/delete/${inventoryID}`)
}
// Inventory

// Export excel
const exportExcel = (keyword) => {
    return axios.get(`/${keyword}/export`);
}
// Export excel
export {
    loginAdmin,
    fetchAddUser,
    searchUser,
    axiosDeleteUser,
    fetchAllProduct,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct,
    searchProduct,
    fetchAllCategory,
    createCategory,
    deleteCategory,
    categorySearch,
    fetchUpdateCategory,
    fetchAllOrder,
    deleteOrder,
    searchOrder,
    fetchAllVoucher,
    voucherDelete,
    voucherCreate,
    voucherUpdate,
    fetchAllInventory,
    createInventory,
    deleteInventory,
    exportExcel,
    fetchAllOrderPage,
    fetchAllInventoryPage,
    fetchAllVoucherPage,
    fetchAllCategoryPage
};