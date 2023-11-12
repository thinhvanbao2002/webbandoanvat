import React from 'react';
import './Cart.scss'
function Cart() {
    return (
        <div>
            <div className="wrapper-cart">
                <div className="cart-header">
                    <h3>Giỏ hàng của bạn</h3>
                </div>
                <div className="cart-body">
                    <div className="cart-item">
                        <div className="cart-item-check">
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </div>
                        <div className="cart-item-image-name">
                            <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                            <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                        </div>
                        <div className="cart-item-unit-price">
                            <h3>Đơn giá</h3>
                            <h4>323287<span>đ</span></h4>
                        </div>
                        <div className="cart-item-quantity-number">
                            <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                            <h5>1</h5>
                            <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                        </div>
                        <div className="cart-item-total-amount">
                            <h3>Số tiền</h3>
                            <h4>37.283.200<span>đ</span></h4>
                        </div>
                        <div className="cart-item-operation">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                    <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="cart-item">
                        <div className="cart-item-check">
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </div>
                        <div className="cart-item-image-name">
                            <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                            <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                        </div>
                        <div className="cart-item-unit-price">
                            <h3>Đơn giá</h3>
                            <h4>323287<span>đ</span></h4>
                        </div>
                        <div className="cart-item-quantity-number">
                            <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                            <h5>1</h5>
                            <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                        </div>
                        <div className="cart-item-total-amount">
                            <h3>Số tiền</h3>
                            <h4>37.283.200<span>đ</span></h4>
                        </div>
                        <div className="cart-item-operation">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                    <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div> <div className="cart-item">
                    <div className="cart-item-check">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </div>
                    <div className="cart-item-image-name">
                        <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                        <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                    </div>
                    <div className="cart-item-unit-price">
                        <h3>Đơn giá</h3>
                        <h4>323287<span>đ</span></h4>
                    </div>
                    <div className="cart-item-quantity-number">
                        <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                        <h5>1</h5>
                        <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                    </div>
                    <div className="cart-item-total-amount">
                        <h3>Số tiền</h3>
                        <h4>37.283.200<span>đ</span></h4>
                    </div>
                    <div className="cart-item-operation">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div> <div className="cart-item">
                    <div className="cart-item-check">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </div>
                    <div className="cart-item-image-name">
                        <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                        <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                    </div>
                    <div className="cart-item-unit-price">
                        <h3>Đơn giá</h3>
                        <h4>323287<span>đ</span></h4>
                    </div>
                    <div className="cart-item-quantity-number">
                        <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                        <h5>1</h5>
                        <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                    </div>
                    <div className="cart-item-total-amount">
                        <h3>Số tiền</h3>
                        <h4>37.283.200<span>đ</span></h4>
                    </div>
                    <div className="cart-item-operation">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div> <div className="cart-item">
                    <div className="cart-item-check">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </div>
                    <div className="cart-item-image-name">
                        <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                        <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                    </div>
                    <div className="cart-item-unit-price">
                        <h3>Đơn giá</h3>
                        <h4>323287<span>đ</span></h4>
                    </div>
                    <div className="cart-item-quantity-number">
                        <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                        <h5>1</h5>
                        <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                    </div>
                    <div className="cart-item-total-amount">
                        <h3>Số tiền</h3>
                        <h4>37.283.200<span>đ</span></h4>
                    </div>
                    <div className="cart-item-operation">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div> <div className="cart-item">
                    <div className="cart-item-check">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </div>
                    <div className="cart-item-image-name">
                        <img src="https://down-vn.img.susercontent.com/file/3f8a8baea0e9ab252303cb1b5ffa2d58" alt=""/>
                        <h5>Khô 3 Vị Mix hộp 300gr : KHÔ GÀ + KHÔ HEO + MỰC SỢI HẤP DỪA đo ăn văt ngon rẻ sài gòn │ Gia Lai market</h5>
                    </div>
                    <div className="cart-item-unit-price">
                        <h3>Đơn giá</h3>
                        <h4>323287<span>đ</span></h4>
                    </div>
                    <div className="cart-item-quantity-number">
                        <button className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                        <h5>1</h5>
                        <button className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                    </div>
                    <div className="cart-item-total-amount">
                        <h3>Số tiền</h3>
                        <h4>37.283.200<span>đ</span></h4>
                    </div>
                    <div className="cart-item-operation">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
                </div>
                <div className="cart-footer">
                    <div className="cart-footer-top">
                        <div className="cart-footer-top-left">
                            <div className="cart-footer-top-choose-all">
                                <input type="checkbox"/>
                                <h5>Chọn tất cả</h5>
                            </div>
                            <div className="cart-footer-top-detele-all">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                        <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="cart-footer-top-voucher">
                            <h3>Mã giảm giá</h3>
                            <div>
                                <input type="text"/>
                            </div>
                            <button>ÁP DỤNG</button>
                        </div>
                    </div>
                    <div className="cart-footer-bottom">
                        <h4>Tổng thanh toán <span>1.432.543</span><p>đ</p></h4>
                        <button>Mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;