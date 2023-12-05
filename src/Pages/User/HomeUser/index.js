import classNames from 'classnames/bind';
import './HomeUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from  '../Boxcategory/Box.module.scss'
import {useEffect, useState} from "react";
import { fetchAllProduct } from '@/services/UserServices'
import {Link} from "react-router-dom";
function HomeUser() {
    const cx = classNames.bind(styles);
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        getProduct();
    }, []);
    const getProduct = async () => {
        let res = await fetchAllProduct();
        if(res && res.data.data) {
            setListCategory(res.data.data);
        }
    }

    return (
       <div className="wrapper-home">
           <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
               <div className="carousel-inner">
                   <div className="carousel-item active" data-bs-interval="10000">
                       <img src="https://down-bs-vn.img.susercontent.com/vn-11134210-7qukw-lf84ok3uxnref2.webp" className="d-block w-100" alt="..."/>
                   </div>
                   <div className="carousel-item" data-bs-interval="2000">
                       <img src="https://down-bs-vn.img.susercontent.com/vn-11134210-7qukw-lf6ntqyu22xj1e.webp" className="d-block w-100" alt="..."/>
                   </div>
               </div>
               <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span className="visually-hidden">Previous</span>
               </button>
               <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                   <span className="carousel-control-next-icon" aria-hidden="true"></span>
                   <span className="visually-hidden">Next</span>
               </button>
           </div>
           <div className="home-voucher">
               <div className="home-voucher-container">
                    <div className="home-voucher-header">
                        <h3>Mã giảm giá của shop</h3>
                    </div>
                    <div className="home-voucher-body">
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                        <div className="voucher-body-item">
                            <div className="voucher-body-item-info">
                                <h4>Qùa tặng 20/11</h4>
                                <h5>Off: <span>20%</span></h5>
                                <p>HSD <span>23/11/2023</span></p>
                            </div>
                            <div className="voucher-body-item-btn">
                                <button>XEM</button>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
           <div className="home-product">
               <div className="home-product-banner">
                   <img src="https://down-bs-vn.img.susercontent.com/vn-11134210-7qukw-lglmf9pxusmi7b.webp" alt=""/>
               </div>
               <div className="home-product-body">
                    <div className="home-product-body-header">
                        <h3>Sản phẩm bán chạy</h3>
                    </div>
                   <div className="home-product-body-body">
                        <div className="home-product-body-container">
                            {listCategory && listCategory.length > 0
                                && listCategory.map((item,index) => (
                                    <Link to={`/detailproduct/${item._id}`} key={item._id} href="">
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
                                                        {item.price} <span>đ</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                     </Link>
                                ))
                            }
                        </div>
                       <button className="product-body-prev">
                           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                       </button>
                       <button className="product-body-next">
                           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                       </button>
                   </div>
               </div>
           </div>
       </div>
    );
}

export default HomeUser;
