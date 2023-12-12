import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

function Footer() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer')}>
                <div className={cx('footer-header', 'd-flex')}>
                    <div className={cx('footer-shopping')}>
                        <h5>Mua sắm và tìm hiểu</h5>
                        <a href="" className={cx('footer-shoping-link')}>
                            Snack sieu cay
                        </a>
                        <a href="" className={cx('footer-shoping-link')}>
                            Thach tui
                        </a>
                        <a href="" className={cx('footer-shoping-link')}>
                            Do an nhanh
                        </a>
                        <a href="" className={cx('footer-shoping-link')}>
                            Banh trang tron
                        </a>
                        <a href="" className={cx('footer-shoping-link')}>
                            Banh da
                        </a>
                        <a href="" className={cx('footer-shoping-link')}>
                            Sua chua
                        </a>
                    </div>
                    <div className={cx('footer-account')}>
                        <h5>Tài khoản</h5>
                        <a href="" className={cx('footer-acc-link')}>
                            Quản lý tài khoản của bạn
                        </a>
                        <a href="" className={cx('footer-acc-link')}>
                            Tài khoản mua sắm
                        </a>
                    </div>
                    {/* <div className={cx('footer-entertainment')}>
                        <h5>Giải trí</h5>
                        <a href="" className={cx('footer-entertaiment-link')}>
                            Gamming
                        </a>
                        <a href="" className={cx('footer-entertaiment-link')}>
                            TV
                        </a>
                        <a href="" className={cx('footer-entertaiment-link')}>
                            Music
                        </a>
                        <a href="" className={cx('footer-entertaiment-link')}>
                            Books
                        </a>
                    </div> */}
                    <div className={cx('footer-overview')}>
                        <h5>Tổng quan về shop</h5>
                        <a href="" className={cx('footer-overview-link')}>
                            Thành viên
                        </a>
                        <a href="" className={cx('footer-overview-link')}>
                            Nhà đầu tư
                        </a>
                        <a href="" className={cx('footer-overview-link')}>
                            Đạo đức & quy tắc
                        </a>
                        <a href="" className={cx('footer-overview-link')}>
                            Sự kiện
                        </a>
                    </div>
                </div>
                <div className={cx('footer-bottom', 'd-flex')}>
                    <p className={cx('footer-support')}>
                        Xem thêm cách để mua hàng: <span>Tìm cửa hàng bán lẻ gần bạn</span>. Hoặc gọi 1800 1192.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
