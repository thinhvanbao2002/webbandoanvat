import axios from './customize-axios'

// VOUCHER
const fetchAllVoucher = () => {
    return axios.get("/voucher/get");
}
// VOUCHER
export {
    fetchAllVoucher
};