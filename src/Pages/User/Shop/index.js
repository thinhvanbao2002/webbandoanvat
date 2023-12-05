import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import boxStyles from '../Boxcategory/Box.module.scss';
import {useEffect, useState} from "react";
import { fetchAllProduct, fetchAllCategory } from '@/services/UserServices'
import {Link} from "react-router-dom";
function Shop() {
    const cx = classNames.bind({ ...styles, ...boxStyles });
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);


    useEffect(() => {
        getProduct();
        getCategory()
    }, []);
    const getProduct = async () => {
        let res = await fetchAllProduct();
        if(res){
            setListProduct(res.data.data);
        }
    }
    const getCategory = async () => {
        let res = await fetchAllCategory();
        if(res) {
            setListCategory(res.data.data);
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-header')}>
                <h3 className={cx('shop-header-number-of')}>
                    Sản phẩm
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
                    {listCategory && listCategory.length > 0
                        && listCategory.map((item,index) => (
                            <div key={item._id} className={cx('category-item')}>{item.title}</div>
                        ))
                    }
                </div>
                <div className={cx('shop-body-right')}>
                    <div className={cx('shop-body-item-container')}>
                        {listProduct && listProduct.length > 0
                            && listProduct.map((item,index) => (
                                <Link key={item._id} to={`/detailproduct/${item._id}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img
                                                src={"http://localhost:3001/imgProduct/"+item.image}
                                                className={cx('product-item-img')}
                                            />
                                            <div>
                                                <h3 className={cx('product-item-name')}>{item.name}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={cx('item-price-container')}>
                                                <h3 className={cx('product-item-price')}>
                                                    {item.price}<span>đ</span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
