import { useRef } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
// import image from '@/assets/images';
import Header from '../Header';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar(props) {
    return (
        <div className={cx('sidebar-container')}>
            <div className={cx('sidebar-header', 'd-flex', 'al-cent')}>
                <img alt="" className={cx('sidebar-logo')} />
                <div>{/* <h2 className={cx('sidebar-title')}>Apple</h2> */}</div>
                <svg
                    onClick={props.onClick}
                    className={cx('sidebar-close')}
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="43"
                    viewBox="0 0 42 43"
                    fill="none"
                >
                    <path
                        d="M5.25 32.25H36.75V28.6667H5.25V32.25ZM5.25 23.2917H36.75V19.7083H5.25V23.2917ZM5.25 10.75V14.3333H36.75V10.75H5.25Z"
                        fill="#fff"
                    />
                </svg>
            </div>
            <div className={cx('sidebar-content')}>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/personnel" className={cx('sidebar-link')}>
                        Quản lý tài khoản
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/userlist" className={cx('sidebar-link')}>
                        Quản lý khách hàng
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/product" className={cx('sidebar-link')}>
                        Quản lý sản phẩm
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/category" className={cx('sidebar-link')}>
                        Quản lý loại sản phẩm
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/order" className={cx('sidebar-link')}>
                        Quản lý đơn hàng
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/voucher" className={cx('sidebar-link')}>
                        Quản lý mã giảm giá
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link to="/admin/importproduct" className={cx('sidebar-link')}>
                        Quản lý nhập hàng
                    </Link>
                </div>
                <div className={cx('sidebar-item', 'al-cent', 'd-flex')}>
                    <Link href="" className={cx('sidebar-link')}>
                        Tài khoản của tôi
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
