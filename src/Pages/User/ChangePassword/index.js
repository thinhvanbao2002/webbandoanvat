import React from 'react';
import './ChangePassword.scss'
function ChangePassword(props) {
    return (
        <div className="wrapper-change-password">
            <div className="change-pass-header">
                <h3>Đổi mật khẩu</h3>
            </div>
            <div className="change-pass-body">
                <div className="pass-body-username">
                    <h4>Tên đăng nhập</h4>
                    <p>thinhbao@gmail.com</p>
                </div>
                <div className="pass-body-old-password">
                    <h4>Mật khẩu cũ</h4>
                    <div>
                        <input type="password" placeholder="Nhập mật khẩu cũ" />
                    </div>
                </div>
                <div className="pass-body-new-password">
                    <h4>Mật khẩu mới</h4>
                    <div>
                        <input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                </div>
                <div className="pass-body-enter-new-password">
                    <h4>Nhập lại mật khẩu</h4>
                    <div>
                        <input type="password" placeholder="Nhập lại mật khẩu mới" />
                    </div>
                </div>
                <div className="pass-body-change-password">
                    <button>Xác nhận</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;