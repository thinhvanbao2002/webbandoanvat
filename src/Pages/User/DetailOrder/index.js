import React from 'react';
import './DetailOrder.scss';

function DetailOrer() {
    return (
        <div className="wrapper-detail-order">
            <div className="detail-order-header">
                <h3>Đơn hàng của bạn</h3>
            </div>
            <div className="detail-order-body">
                <div className="cart-item" style={{display: "flex", flexDirection: 'column'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <div className="cart-item-image-name">
                            <img style={{width: '80px', height: '80px', marginBottom: '20px'}} alt=""/>
                            <h5>djahdkahkdandaw</h5>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số lượng<h4>3</h4>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số tiền
                            <h4>47928342<span>đ</span></h4>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <div className="cart-item-image-name">
                            <img style={{width: '80px', height: '80px', marginBottom: '20px'}} alt=""/>
                            <h5>djahdkahkdandaw</h5>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số lượng<h4>3</h4>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số tiền
                            <h4>47928342<span>đ</span></h4>
                        </div>
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
                        Thành tiền: <span style={{fontSize: '24px', color: 'var(--primary-title)'}}>200.000 đ</span>
                    </div>
                </div>
                <div className="cart-item" style={{display: "flex", flexDirection: 'column'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <div className="cart-item-image-name">
                            <img style={{width: '80px', height: '80px', marginBottom: '20px'}} alt=""/>
                            <h5>djahdkahkdandaw</h5>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số lượng<h4>3</h4>
                        </div>
                        <div className="cart-item-total-amount" style={{padding: '0', display: 'flex'}}>
                            Số tiền
                            <h4>47928342<span>đ</span></h4>
                        </div>
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
                        Thành tiền: <span style={{fontSize: '24px', color: 'var(--primary-title)'}}>200.000 đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailOrer;