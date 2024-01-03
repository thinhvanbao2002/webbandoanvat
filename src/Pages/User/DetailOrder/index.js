import React, { useEffect, useState } from 'react';
import './DetailOrder.scss';
import { getById, getProductByID } from '@/services/UserServices'
function DetailOrer() {

    const [listPerchaseOrder, setListPerchaseOrder] = useState([]);

    useEffect(() => {
        getPurchaseOrder();
    },[])

    const getPurchaseOrder = async () => {
        let res = await getById(localStorage.getItem("id"));
        if (res && res.data) {
            console.log(res.data);
            const purchaseOrders = res.data.map(async (order) => {
                const products = await Promise.all(
                    order.detailOrder.map(async (productItem) => {
                        const productDetails = await getProductByID(productItem.idProduct);
                        let productDetail = productDetails.data.data;
                        return { ...productItem, productDetail };
                    })
                );
                return { ...order, products };
            });
            const updatedList = await Promise.all(purchaseOrders);
            setListPerchaseOrder(updatedList.reverse());
        }
    };

    
    console.log(listPerchaseOrder);
    return (
        <div className="wrapper-detail-order">
            <div className="detail-order-header">
                <h3>Đơn hàng của bạn</h3>
            </div>
            <div className="detail-order-body">
                {listPerchaseOrder && listPerchaseOrder.length > 0
                && listPerchaseOrder.map((item, index) => (
                    <div key={item._id} className="cart-item" style={{display: "flex", flexDirection: 'column'}}>
                         {item.products && item.products.length > 0
                         && item.products.map((productItem, index) => (
                            <div key={index} style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <div className="cart-item-image-name">
                                <img src={`http://localhost:3001/imgProduct/${productItem.productDetail .image}`} style={{width: '80px', height: '80px', marginBottom: '20px'}} alt=""/>
                                <h5>{productItem.productDetail.name}</h5>
                            </div>
                            <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                                Số lượng<h4>{productItem.amount}</h4>
                            </div>
                            <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                                Số tiền
                                <h4>{productItem.cost}<span>đ</span></h4>
                            </div>
                         </div>
                         ))
                         }
                        <div style={{
                            width: '100%',
                            textAlign: 'right',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginRight: '20px',
                            borderTop: '1px solid #eee',
                            paddingTop: '20px'
                        }}>
                            Giảm giá: <span style={{fontSize: '24px', color: 'var(--primary-title)'}}>{item.idVoucher ? item.idVoucher.off : 0} %</span>
                        </div>
                        <div style={{
                            width: '100%',
                            textAlign: 'right',
                            fontSize: '16px',
                            fontWeight: '600',
                            marginRight: '20px',
                            borderTop: '1px solid #eee',
                            paddingTop: '20px'
                        }}>
                            Thành tiền: <span style={{fontSize: '24px', color: 'var(--primary-title)'}}>{item.total} đ</span>
                        </div>
                </div>
                ))
                }
            </div>
        </div>
    );
}

export default DetailOrer;