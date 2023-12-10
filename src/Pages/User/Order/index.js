import React, {useContext, useEffect, useState} from 'react';
import './Order.scss';
import { UserContext } from "@/context/UserContext";
import { createOrder } from "@/services/UserServices";
function Order() {
    const { user, order, newOrder } = useContext(UserContext);
    const [idUSer, setIdUser] = useState(localStorage.getItem('id'));
    const [voucher, setVoucher] = useState('');
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setProducts(
            [
                {
                    "id": order.prdID,
                    "quantity": order.sold,
                    "price": order.price
                }
            ]
        )
    },[])

    const handleOrder = async () => {
        let res = await createOrder(idUSer,voucher,order.total,products)
        .then(res => {
            alert("Mua hang thanh cong");
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
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
                        <div className="order-product-body-item">
                            <div className="order-prd-body-item-name">
                                <img src={`http://localhost:3001/imgProduct/${order.imgPrd}`} alt=""/>
                                <p>{order.namePrd}</p>
                            </div>
                            <div className="order-prd-body-item-unit-price">
                                <h4>{order.price}</h4>
                            </div>
                            <div className="order-prd-body-item-number">
                                <h4>{order.sold}</h4>
                            </div>
                            <div className="order-prd-body-item-total">
                                <h4>{order.total}</h4>
                            </div>
                        </div>

                    </div>
                    <div className="order-product-footer">
                        <div>
                            <input value={voucher} onChange={e => setVoucher(e.target.value)} type="text" placeholder="Nhap voucher"/>
                        </div>
                        <button>ÁP DỤNG</button>
                    </div>
                </div>
                <div className="order-footer-product">
                    <div className="order-footer-title-contaier">
                        <div className="order-footer-product-title">
                            <div>
                                <h3>Tổng tiền hàng</h3>
                                <p>{order.total} đ</p>
                            </div>
                            <div>
                                <h3>Phí vận chuyển</h3>
                                <p>0 đ</p>
                            </div>
                            <div>
                                <h3>Tổng thanh toán</h3>
                                <h2>{order.total} đ</h2>
                            </div>
                            <div className="order-footer-product-bottom">
                                <button onClick={handleOrder} >Đặt hàng</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Order;