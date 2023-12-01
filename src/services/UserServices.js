import axios from './customize-axios'
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
    fetchAllCategory
};