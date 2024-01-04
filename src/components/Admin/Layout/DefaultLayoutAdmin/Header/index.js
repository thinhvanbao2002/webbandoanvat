import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = forwardRef((props, ref) => {
    const myRefIcon = useRef(null);
    const location = useLocation();

    let headerTitle = '';

    if (location.pathname == '/admin/userlist') {
        headerTitle = 'Quản Lý Khách Hàng';
    } else if (location.pathname == '/admin/personnel') {
        headerTitle = 'Quản Lý Nhân Viên';
    } else if (location.pathname == '/admin/voucher') {
        headerTitle = 'Quản Lý Mã Giảm Giá';
    } else if (location.pathname == '/admin/order') {
        headerTitle = 'Quản Lý Đơn Hàng';
    } else if (location.pathname == '/admin/product') {
        headerTitle = 'Quản Lý Sản Phẩm';
    } else if (location.pathname == '/admin/category') {
        headerTitle = 'Quản Lý Loại Sản Phẩm';
    }else if (location.pathname == '/admin/importproduct') {
        headerTitle = 'Quản Lý Nhập Hàng';
    }else {
        headerTitle = 'Error';
    }

    useImperativeHandle(ref, () => ({
        myRefIcon,
    }));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('admin-header', 'd-flex')}>
                <div className={cx('d-flex', 'al-cent')}>
                    <svg
                        ref={myRefIcon}
                        onClick={props.onClick}
                        className={cx('admin-header-icon', 'admin-header-none')}
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="43"
                        viewBox="0 0 42 43"
                        fill="none"
                    >
                        <path
                            d="M5.25 32.25H36.75V28.6667H5.25V32.25ZM5.25 23.2917H36.75V19.7083H5.25V23.2917ZM5.25 10.75V14.3333H36.75V10.75H5.25Z"
                            fill="#000"
                        />
                    </svg>
                    <h2 className={cx('admin-header-title')}>{headerTitle}</h2>
                </div>
                <div className={cx('admin-header-info', 'd-flex ', 'al-cent')}>
                    <h3 className={cx('admin-header-name')}>
                        <span>admin</span>
                    </h3>
                    {/* <img src='' alt="" className={cx('admin-avatar')} /> */}
                </div>
            </div>
        </div>
    );
});

export default Header;
