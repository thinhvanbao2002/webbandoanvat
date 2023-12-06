import React from 'react';
import './Order.scss';
function Order() {
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
                       <span> 0384609456</span> nhung Từ Sơn, Bắc Ninh
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
                                <img src="https://down-vn.img.susercontent.com/file/04c92bf0ba4930b88f80636eebfae0a7" alt=""/>
                                <p>Hộp Đựng Cơm Cặp Lồng Cơm Giữ Nhiệt Lúa Mạch Ruột Inox Chất Lượng Số 1</p>
                            </div>
                            <div className="order-prd-body-item-unit-price">
                                <h4>35.000</h4>
                            </div>
                            <div className="order-prd-body-item-number">
                                <h4>4</h4>
                            </div>
                            <div className="order-prd-body-item-total">
                                <h4>143.000</h4>
                            </div>
                        </div>

                    </div>
                    <div className="order-product-footer">
                        <div>
                            <input type="text"/>
                        </div>
                        <button>ÁP DỤNG</button>
                    </div>
                </div>
                <div className="order-footer-product">
                    <div className="order-footer-title-contaier">
                        <div className="order-footer-product-title">
                            <div>
                                <h3>Tổng tiền hàng</h3>
                                <p>235.082 đ</p>
                            </div>
                            <div>
                                <h3>Phí vận chuyển</h3>
                                <p>0 đ</p>
                            </div>
                            <div>
                                <h3>Tổng thanh toán</h3>
                                <h2>235.082 đ</h2>
                            </div>
                            <div className="order-footer-product-bottom">
                                <button>Đặt hàng</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Order;