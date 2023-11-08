import classNames from 'classnames/bind';
import styles from './HomeUser.module.scss';


function HomeUser() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('content')}>
            <div className={cx('content-body')}>
                <div className={cx('content-body-header')}>
                    <h2 className={cx('content-body-title')}>Các Sản Phẩm Của Shop</h2>
                    <a className={cx('content-body-text')}>Xem chi tiết shop</a>
                </div>
            </div>
            <div className={cx('content-body-product')}>
                <div className={cx('product-item')}>
                    <img
                        src="https://dlcdnwebimgs.asus.com/gain/bd20f2d2-58bc-4c5c-b8af-f681a451aed5/w800"
                        className={cx('product-item-img')}
                    />
                    <h3 className={cx('product-item-name')}>ASUS Vivobook S 14 Flip</h3>
                    <div className={cx('item-price-container')}>
                        <h5>Giá trên shop</h5>
                        <h3 className={cx('product-item-price')}>
                            15.000.000 <span>đ</span>
                        </h3>
                    </div>
                    <div className={cx('product-controls')}>
                        <div className={cx('product-coltrol-top')}>
                            <button className={cx('control-top-cart')}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                    <path
                                        fill="#fff"
                                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                    />
                                </svg>
                            </button>
                            <button className={cx('control-top-detail')}>Chi tiết</button>
                        </div>
                        <div className={cx('product-control-bottom')}>
                            <button className={cx('control-bottom-buy')}>Mua hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeUser;
