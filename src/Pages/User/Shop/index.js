import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import boxStyles from '../Boxcategory/Box.module.scss';

function Shop() {
    const cx = classNames.bind({ ...styles, ...boxStyles });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-header')}>
                <h3 className={cx('shop-header-number-of')}>
                    <h5>Sản phẩm</h5>
                </h3>
                <div className={cx('shop-header-select')}>
                    <h3 className={cx('shop-header-sort-text')}>Sắp xếp: </h3>
                    <div className={cx('select-sort-container')}>
                        <select className={cx('select-sort')} name="cars" id="cars">
                            <option value="">Mặc Định</option>
                            <option value="">Tăng Dần</option>
                            <option value="">Giảm Dần</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={cx('shop-body')}>
                <div className={cx('shop-body-left')}>
                    <h2 className={cx('category-title')}>Danh Mục Sản Phẩm</h2>
                    <div className={cx('category-item')}>Hạt sấy khô</div>
                    <div className={cx('category-item')}>Thịt sấy khô</div>
                    <div className={cx('category-item')}>Hoa quả sấy khô</div>
                    <div className={cx('category-item')}>Kẹo dẻo</div>
                    <div className={cx('category-item')}>Kẹo mút</div>
                    <div className={cx('category-item')}>Laptop Acer</div>
                    <div className={cx('category-item')}>Laptop Asus</div>
                    <div className={cx('category-item')}>Laptop Asus</div>
                </div>
                <div className={cx('shop-body-right')}>
                    <div className={cx('shop-body-item-container')}>
                        <a href="">
                            <div className={cx('product-item')}>
                                <div>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljup2ugmdewk60"
                                        className={cx('product-item-img')}
                                    />
                                    <div>
                                        <h3 className={cx('product-item-name')}>ASUS Vivobook S 14 Flip ASUS Vivobook S 14 FlipASUS Vivobook S 14 FlipASUS Vivobook S 14 Flip </h3>
                                    </div>
                                </div>
                                <div>
                                    <div className={cx('item-price-container')}>
                                        <h3 className={cx('product-item-price')}>
                                            15.000.000 <span>đ</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
