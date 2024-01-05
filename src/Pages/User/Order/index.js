import React, {useContext, useEffect, useState} from 'react';
import './Order.scss';
import { UserContext } from "@/context/UserContext";
import { createOrder, fetchAllVoucher, updateSold, updateProductAvalibable } from "@/services/UserServices";
import { redirect, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '300px',
    overflow:'scroll',
    border: 'none'
  };

  const voucherStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between' 
  }
function Order() {
    const { user, order, newOrder } = useContext(UserContext);
    const [idUSer, setIdUser] = useState(localStorage.getItem('id'));
    const [voucher, setVoucher] = useState('');
    const [off, setOff] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [listVoucher, setListVoucher] = useState();
    const [total, setTotal] = useState(0);
    const [voucherApplied, setVoucherApplied] = useState(false);

    const listOrderCart = location.state?.selectedItems || [];
    const [totalListOrderCart,setTotalListOrderCart] = useState(location.state?.totalAmount || 0); 
    const [newTotalListOrderCart, setNewTotalListOrderCart] = useState(totalListOrderCart);
    const product = location.state?.product || '';
    const quantitynum = location.state?.quantitynum  || 0;
    const totalAmount = location.state?.totalAmount || 0;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    useEffect(() => {
        if(product != ''){
            setProducts(() => {
                return [
                    {
                        "id": product._id,
                        "amount": quantitynum,
                        "cost": totalAmount
                    }
                ]
        });
        }else{
            setProducts([...listOrderCart])
        }
        getVoucher();
        setTotal(order.total)
    },[])

    const getVoucher = async () => {
        let res = await fetchAllVoucher();
        if(res && res.data) {
            setListVoucher(res.data.data);
        }
    }

    console.log(product);
    const handleOrder = async () => {
        if(product != ''){
            let res = await createOrder(idUSer,voucher,totalAmount,products)
            .then(res => {
                updateSold(product._id,quantitynum);
                updateProductAvalibable(product._id,quantitynum);
                navigate("/ordersuccess");
            })
            .catch(err => {
                alert(err);
            })
        }else{
            const newListOrderCart =  listOrderCart.map(async (item, index) => {
                await updateSold(item.productDetails._id,item.quantity);
                await updateProductAvalibable(item.productDetails._id,item.quantity);
                return {
                    "id": item.productDetails._id,
                    "amount": item.quantity,
                    "cost": item.totalAmount
                }
            })
            const productsListOrder = await Promise.all(newListOrderCart);
            let res = await createOrder(idUSer,voucher,newTotalListOrderCart,productsListOrder)
            .then(res => {
                navigate("/ordersuccess");
            })
            .catch(err => {
                alert(err);
            })
        }
    }
    const addVoucher = (voucher) => {
        setOpen(false)
        setVoucher(voucher._id)
        setOff(voucher.off)
        setVoucherApplied(false)
        setTotal(order.total);
        setNewTotalListOrderCart(location.state?.totalAmount || 0)
    }


    const handleAddVoucher = () => {
        if (!voucherApplied) {
            setTotal(order.total - (total * off / 100));
            setNewTotalListOrderCart(totalListOrderCart - (newTotalListOrderCart * off / 100));
            setVoucherApplied(true);
        }else{
            swal("Mã này chỉ được áp dụng một lần");
        }
    }       
    console.log(products);
    return (
        <>
            <div className="wrapper-order">
                <div className="order-header">
                    <h3>Thanh toán</h3>
                </div>
                <div className="order-body">
                    <div className="order-body-address">
                        <div className="order-body-address-title">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                            <h4>Địa chỉ nhận hàng</h4>
                        </div>
                        <div className="order-body-address-body">
                        <span>{localStorage.getItem("phone")}</span>{localStorage.getItem("address")}
                        </div>
                    </div>
                    <div className="order-body-product">
                        <div className="order-body-product-header">
                            <div className="body-product-header-product">
                                <h3>Sản phẩm</h3>
                            </div>
                            <div className="body-product-header-unit-price">
                                <h3>Đơn giá</h3>
                            </div>
                            <div className="body-product-header-number">
                                <h3>Số lượng</h3>
                            </div>
                            <div className="body-product-header-total">
                                <h3>Thành tiền</h3>
                            </div>
                        </div>
                        <div className="order-body-product-body">
                            {products && products.length > 0 && product._id != undefined
                                && products.map((item, index) => (
                                <div key={index} className="order-product-body-item">
                                    <div className="order-prd-body-item-name">
                                        <img style={{objectFit: 'cover', objectPosition: 'center'}} src={`http://localhost:3001/imgProduct/${product.image}`} alt=""/>
                                        <p>{product.name}</p>
                                    </div>
                                    <div className="order-prd-body-item-unit-price">
                                        <h4>{product.price}</h4>
                                    </div>
                                    <div className="order-prd-body-item-number">
                                        <h4>{quantitynum}</h4>
                                    </div>
                                    <div className="order-prd-body-item-total">
                                        <h4>{totalAmount}</h4>
                                    </div>
                                </div>
                                ))
                               }
                               {
                                listOrderCart && listOrderCart.length > 0
                                && listOrderCart.map((item, index) => (
                                <div key={index} className="order-product-body-item">
                                    <div className="order-prd-body-item-name">
                                        <img style={{objectFit: 'cover', objectPosition: 'center'}} src={`http://localhost:3001/imgProduct/${item.productDetails.image}`} alt=""/>
                                        <p>{item.productDetails.name}</p>
                                    </div>
                                    <div className="order-prd-body-item-unit-price">
                                        <h4>{item.productDetails.price}</h4>
                                    </div>
                                    <div className="order-prd-body-item-number">
                                        <h4>{item.quantity}</h4>
                                    </div>
                                    <div className="order-prd-body-item-total">
                                        <h4>{item.totalAmount}</h4>
                                    </div>
                                </div>
                                ))
                               }
                        </div>
                        <div className="order-product-footer">
                            <button onClick={handleOpen} style={{marginRight: '30px'}} >CHỌN VOUCHER</button>
                            <div>
                                <input value={voucher} onChange={e => setVoucher(e.target.value)} type="text" placeholder="Nhap voucher"/>
                            </div>
                            <button onClick={handleAddVoucher}>ÁP DỤNG</button>
                        </div>
                    </div>
                    <div className="order-footer-product">
                        <div className="order-footer-title-contaier">
                            <div className="order-footer-product-title">
                                <div>
                                    <h3>Tổng tiền hàng</h3>
                                    <p>{totalListOrderCart} đ</p>
                                </div>
                                <div>
                                    <h3>Giảm giá</h3>
                                    <p>{off} %</p>
                                </div>
                                <div>
                                    <h3>Tổng thanh toán</h3>
                                    <h2>{total > 0 ?total:newTotalListOrderCart} đ</h2>
                                </div>
                                <div className="order-footer-product-bottom">
                                    <button onClick={handleOrder} >Đặt hàng</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        {listVoucher && listVoucher.length > 0
                        && listVoucher.map((item, index) => (
                            <Typography key={item._id} sx={voucherStyle} id="transition-modal-title" variant="h6" component="h2">
                                <span>{item.title}</span>
                                <div>
                                    <span>Off {item.off}%</span>
                                    <button onClick={() => addVoucher(item)} className='add-voucher-btn'>Sử dụng</button>
                                </div>
                            </Typography>
                        ))
                        }
                    </Box>
                    </Fade>
                </Modal>
        </>
    );
}

export default Order;