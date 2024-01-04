import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import boxStyles from '../Boxcategory/Box.module.scss';
import {useEffect, useState} from "react";
import { fetchAllProduct, fetchAllCategory, searchByCategory, searchProduct } from '@/services/UserServices'
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';

function Shop() {
    const cx = classNames.bind({ ...styles, ...boxStyles });
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(true);
    const [keyword, setKeyword] = useState('');
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
    const handleSearchByCategory = async (idCategory) => {
        try {
            let res = await searchByCategory(idCategory)
            if(res && res.data){
                setListProduct(res.data)
            }else{
                Swal.fire({
                    title: 'Rất tiếc!',
                    text: 'Không có sản phẩm nào cho loại này!',
                    icon: 'error', // Thêm biểu tượng success
                    confirmButtonText: 'OK',
                  });
            }
        } catch (error) {
            Swal.fire({
                title: 'Rất tiếc!',
                text: 'Không có sản phẩm nào cho loại này!',
                icon: 'error', // Thêm biểu tượng success
                confirmButtonText: 'OK',
              });
        }
    }
    const handleSearchProduct = async () => {
        try {
            let res = await searchProduct(keyword);
            if(res && res.data){
                console.log(res);
                setListProduct(res.data.data)
            }
        } catch (error) {
            
        }
    }
    console.log(keyword);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('shop-header')}>
                <h3 style={{cursor: 'pointer'}} onClick={getProduct} className={cx('shop-header-number-of')}>
                    Sản phẩm
                </h3>
                <div className={cx('shop-header-select')}>
                    <h3 className={cx('shop-header-sort-text')}>Tìm Kiếm: </h3>
                    <div className={cx('select-sort-container')}>
                        <input onChange={e => setKeyword(e.target.value)} value={keyword} className={cx('select-sort')} name="cars" id="cars"/>
                        <svg onClick={handleSearchProduct} className={cx('search-icon-shop')} xmlns="http://www.w3.org/2000/svg" height="24" width="20" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    </div>
                </div>
            </div>
            <div className={cx('shop-body')}>
                <div className={cx('shop-body-left')}>
                    <h2 className={cx('category-title')}>Danh Mục Sản Phẩm</h2>
                    {listCategory && listCategory.length > 0
                        && listCategory.map((item,index) => (
                            <div onClick={() => handleSearchByCategory(item._id)} key={item._id} className={cx('category-item')}>{item.title}</div>
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
