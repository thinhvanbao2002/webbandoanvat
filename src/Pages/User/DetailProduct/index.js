import React, {useContext, useEffect, useState} from 'react';
import './DetailProduct.scss';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import { getProductByID, addToCart } from '@/services/UserServices'
import { UserContext } from "@/context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function DetailProduct() {
    const navigate = useNavigate();
    const { user, order, newOrder } = useContext(UserContext);
    const [quantitynum,setQuantityNum] = useState(1);
    const [product, setProduct] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        setTotalAmount(Number(product.price));
    }, [product]);
    const getProduct = async () => {
        let res = await getProductByID(id);
        setProduct(res.data);
    }
    const handleAddToCart = async () => {
        if(user.auth === true) {
            let res = addToCart(user.id, product._id)
                .then(res => {
                    toast.success('Thêm giỏ hàng thành công!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(err => {
                    toast.error('Thêm giỏ hàng thất bại!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        }else {
            swal("Bạn cần đăng nhập để sử dụng dịch vụ");
        }
    }
    const handlePrevQuantity = () => {
        if(quantitynum > 1) {
            setQuantityNum(quantitynum - 1);
        }
    }
    const handleNextQuantity = () => {
        if(quantitynum < product.productsAvailable) {
            setQuantityNum(quantitynum + 1);
            setTotalAmount(totalAmount + Number(product.price))
        }else {
            swal("Vượt quá số luượng cho phép");
        }
    }
    const handleOrder = () => {
        if(user.auth === true) {
            newOrder(totalAmount,product.image,product.name,product.price,quantitynum,id);
            navigate("/order");
        }else {
            swal("Bạn cần đăng nhập để sử dụng dịch vụ");
        }
    }
    return (
        <div>
            <div className="wrapper-detail-product">
                <div className="detail-product-header">
                    <h3>Chi tiết sản phẩm</h3>
                </div>
                <div className="detail-product-body">
                    <div className="product-body-image">
                        <div className="body-img-main">
                            <img className="img-main" src={`http://localhost:3001/imgProduct/${product.image}`} alt=""/>
                            <button className="btn-img-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></button>
                            <button className="btn-img-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></button>
                        </div>
                        <div className="body-img-list">
                            {/*<div><img className="img-list-item img-item-active" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                            {/*<div><img className="img-list-item" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljuotzdb7h8id8" alt=""/></div>*/}
                        </div>
                    </div>
                    <div className="product-body-infomation">
                        <div>
                            <h3>{product.name}</h3>
                            <div className="quantity-info">
                                <h5>{product.sold}<span>đã bán</span></h5>
                                <div>|</div>
                                <h5>{product.productsAvailable} <span>có sẵn </span></h5>
                            </div>
                            <div className="body-info-price">
                                <h4>Giá tiền</h4>
                                <h3>{product.price} đ</h3>
                            </div>
                            <div className="body-info-desc">
                                <h4>Mô tả</h4>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div>
                            <div className="body-info-quantity-num">
                                <h4>Số lượng</h4>
                                <button onClick={handlePrevQuantity} className="btn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                                <h5>{quantitynum}</h5>
                                <button onClick={handleNextQuantity} className="btn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                            </div>
                            <div className="body-info-controls">
                                <button
                                    onClick={handleAddToCart}
                                    className="btn-add-to-cart">
                                    <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                                    Giỏ hàng
                                </button>
                                <button onClick={handleOrder} className="btn-buy">Mua ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default DetailProduct;