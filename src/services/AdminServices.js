import axios from './customize-axios'
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

export {
    fetchAddUser,
    axiosDeleteUser,
    fetchAllProduct,
    createProduct,
    deleteProduct,
    fetchAllCategory,
    createCategory,
    deleteCategory,
    fetchUpdateCategory
};