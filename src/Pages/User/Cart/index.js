import React, {useContext, useEffect, useState} from 'react';
import './Cart.scss'
import swal from 'sweetalert2';
import { Await, useParams } from 'react-router-dom';
import { getCart, getProductByID, deleteCart } from '@/services/UserServices'
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const [listCart, setListCart] = useState([]);
    const { id } = useParams();
    const { user, clearOrder } = useContext(UserContext);
    const [productDetails, setProductDetails] = useState([]);
    const [productNumber, setProductNumber] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    // State để quản lý số lượng cho từng mục
    const [productQuantities, setProductQuantities] = useState({});
    const [selectAll, setSelectAll] = useState(false);


    useEffect(() => {
        getListCart()
    }, []);

    const handleSelectAllChange = () => {
        // Đảo ngược trạng thái của selectAll
        setSelectAll(!selectAll);
    
        if (!selectAll) {
            // Nếu đang chưa chọn tất cả, thêm tất cả các mục vào danh sách đã chọn
            const selectedItems = listCart.map(item => ({
                ...item,
                quantity: productQuantities[item._id] || 1,
                totalAmount: (productQuantities[item._id] || 1) * item.productDetails.price
            }));
            setSelectedItems(selectedItems);
            // Tính tổng số tiền
            const total = selectedItems.reduce((total, item) => total + item.totalAmount, 0);
            setTotalAmount(total);
        } else {
            // Nếu đang chọn tất cả, xóa tất cả các mục khỏi danh sách đã chọn và đặt tổng số tiền về 0
            setSelectedItems([]);
            setTotalAmount(0);
        }
    };

    const getListCart = async () => {
        try {
            if (localStorage.getItem("id")) {
                let res = await getCart(localStorage.getItem("id"));
                if (res && res.data) {
                    const cartItems = res.data;
                    const productDetailsPromises = cartItems.map(async (item) => {
                        try {
                            const productDetailRes = await getProductByID(item.idProduct);
                            // Kiểm tra xem có thông tin sản phẩm hay không
                            if (productDetailRes && productDetailRes.data && productDetailRes.data.data) {
                                return {
                                    ...item,
                                    productDetails: productDetailRes.data.data,
                                    quantity: productQuantities[item._id] || 1,
                                };
                            } else {
                                console.error(`Không tìm thấy thông tin cho sản phẩm với ID: ${item.idProduct}`);
                                return null;
                            }
                        } catch (error) {
                            return null;
                        }
                        
                    });
                    const cartItemsWithDetails = await Promise.all(productDetailsPromises);
                    console.log(cartItemsWithDetails);
                    // Lọc ra các sản phẩm có thông tin
                    const updatedListCart = cartItemsWithDetails.filter(item => item !== null);
                    setListCart(updatedListCart.reverse());
                } else {
                    console.log("ERR");
                }
            } else {
                swal("Bạn cần đăng nhập để sử dụng dịch vụ");
            }
        } catch (error) {
            navigate('/');
        }
    };
    
    

    const handleDeleteCart = async (cartID) => {
        try {
            const confirmResult = await swal.fire({
                title: 'Xác nhận xóa',
                text: 'Bạn có chắc muốn xóa?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                confirmButtonColor: '#ff0000',
              });
              if(confirmResult.isConfirmed){
                let res = await deleteCart(cartID)
                .then(res => {
                    swal.fire({
                        title: 'Thành công!',
                        text: 'Xóa sản phẩm thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                    getListCart();
                })
                .catch(err => {
                    swal("Xoa that bai");
                })
              }else{
                
              }
        } catch (error) {
            
        }
        
    }

    const handleNextBtn = (item) => {
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item._id]: (prevQuantities[item._id] || 1) + 1,
          }));
    }   

    const handlePrevBtn = (item) => {
        if (productQuantities[item._id] > 1) {
            setProductQuantities((prevQuantities) => ({
              ...prevQuantities,
              [item._id]: prevQuantities[item._id] - 1,
            }));
          } else {
            swal('Số lượng phải lớn hơn 0');
          }
    }
    
    const handleCheckboxChange = (item) => {
        const isChecked = selectedItems.some((selectedItem) => selectedItem._id === item._id);
    
        // Tính toán số tiền dựa trên số lượng và giá
        const itemTotalAmount = item.productDetails.price * (productQuantities[item._id] || 1);
    
        if (isChecked) {
            // Bỏ chọn - loại bỏ sản phẩm khỏi danh sách
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((selectedItem) => selectedItem._id !== item._id)
            );
            // Giảm tổng số tiền
            setTotalAmount((prevTotalAmount) => prevTotalAmount - itemTotalAmount);
        } else {
            // Chọn - thêm sản phẩm vào danh sách
            setSelectedItems((prevSelectedItems) => [
                ...prevSelectedItems,
                {
                    ...item,
                    quantity: productQuantities[item._id] || 1,
                    totalAmount: itemTotalAmount
                }
            ]);
            // Tăng tổng số tiền
            setTotalAmount((prevTotalAmount) => prevTotalAmount + itemTotalAmount);
        }
    
        const allSelected = listCart.every((cartItem) =>
            selectedItems.some((selectedItem) => selectedItem._id === cartItem._id)
        );
        setSelectAll(allSelected);
    };
      
    const handleOrder = () => {
        clearOrder()
        navigate('/order', { state: { selectedItems, totalAmount } });
    }


    return (
        <div>
            <div className="wrapper-cart">
                <div className="cart-header">
                    <h3>Giỏ hàng của bạn</h3>
                </div>
                <div className="cart-body">
                    {listCart && listCart.length > 0
                    && listCart.map((item, index) => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-check">
                                    <input 
                                        type="checkbox"
                                        checked={selectedItems.some((selectedItem) => selectedItem._id === item._id)}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                    <span className="checkmark"></span>
                                </div>
                                <div className="cart-item-image-name">
                                    <img src={`http://localhost:3001/imgProduct/${item.productDetails.image}`} alt=""/>
                                    <h5>{item.productDetails.name}</h5>
                                </div>
                                <div className="cart-item-unit-price">
                                    <h3>Đơn giá</h3>
                                    <h4>{item.productDetails.price}<span>đ</span></h4>
                                </div>
                                <div className="cart-item-quantity-number">
                                    <button onClick={() => handlePrevBtn(item)} className="cart-item-brn-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg></button>
                                    <h5 className='quantity' >{productQuantities[item._id] || 1}</h5>
                                    <button onClick={() => handleNextBtn(item)} className="cart-item-brn-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
                                </div>
                                <div className="cart-item-total-amount">
                                    <h3>Số tiền</h3>
                                    <h4><span>{item.productDetails.price * (productQuantities[item._id] || 1)}đ</span></h4>
                                </div>
                                <div className="cart-item-operation">
                                    <button
                                        onClick={() => handleDeleteCart(item._id)}
                                    >
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                            <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="cart-footer">
                    <div className="cart-footer-top">
                        <div className="cart-footer-top-left">
                                <div className="cart-footer-top-choose-all">
                                    <input 
                                        type="checkbox"
                                        onChange={handleSelectAllChange}
                                    />
                                    <h5>Chọn tất cả</h5>
                                </div>
                            <div className="cart-footer-top-detele-all">
                                {/* <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                        <path d="M3 18.0002C2.45 18.0002 1.979 17.8042 1.587 17.4122C1.195 17.0202 0.999333 16.5496 1 16.0002V3.00024H0V1.00024H5V0.000244141H11V1.00024H16V3.00024H15V16.0002C15 16.5502 14.804 17.0212 14.412 17.4132C14.02 17.8052 13.5493 18.0009 13 18.0002H3ZM5 14.0002H7V5.00024H5V14.0002ZM9 14.0002H11V5.00024H9V14.0002Z" fill="white"/>
                                    </svg>
                                </button> */}
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
                        <h4>Tổng thanh toán <span>{totalAmount}</span><p>đ</p></h4>
                        <button onClick={   handleOrder} >Mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;