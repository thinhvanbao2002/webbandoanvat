import {useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../GlobalCSS/Global.module.scss';
import styleModal from '../GlobalCSS/GlobalModal.module.scss';
import { fetchAllProduct,fetchAllCategory,createProduct, deleteProduct, updateProduct, searchProduct } from '@/services/AdminServices'
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    background: '#ddd',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function Product() {
    //style
    const cx = classNames.bind({ ...styles, ...styleModal });

    const myModal = useRef(null);
    const myModalUpdate = useRef(null);

    //List
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    //Product Info
    const [productID, setProductID] = useState('')
    const [imageSrc, setImageSrc] = useState(null);
    const [imageEncode, setImageEncode] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productAvalibable, setProductAvalibable] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [detailImage, setDetailImage] = useState([]);
    // Keyword Search
    const [keyword, setKeyword] = useState('');

    console.log(detailImage);

    useEffect(() => {
        getProduct();
        getCategory();
    }, []);


    // get list product
    const getProduct = async () => {
        let res = await fetchAllProduct();
        if(res && res.data) {
            setListProduct(res.data.data);
        }else{

        }
    }
    // get list category
    const getCategory = async () => {
        let res = await fetchAllCategory();
        if(res) {
            setListCategory(res.data.data);
        }else{

        }
    }

    // xu ly chon anh
    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        setImageSrc(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageEncode(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // xu ly chon anh chi tiet
    const handleChooseListImage = (e) => {
        const files = e.target.files;
         // Convert the FileList object to an array and update state
        setDetailImage((prevImages) => [...prevImages, ...files]);
    }
    
    //add product
    const handleAddProduct = async () => {
        if( productName === '' || imageSrc === ''|| price === '' || productAvalibable === '' || selectedCategoryId === '') {
            swal('Bạn cần nhập đầy đủ thông tin');
        }else{
            let res = await createProduct(productName,imageSrc,price,productAvalibable,description,selectedCategoryId);
            if(res) {
                getProduct();
                handleCloseModal();
                swal("Thêm thành công");
            }else{
                handleCloseModal();
                swal("Thêm thất bại");
            }
        }
    }

    // update product
    const handleUpdateProduct = async () =>{
        let res = await updateProduct(productID, productName,imageSrc,price,productAvalibable,description,selectedCategoryId);
        if(res) {
            swal("Cập nhật thành công");
            getProduct();
            handleCloseModal();
        }else{
            alert('ERROR!!');
        }
    }
   

    const handleCategoryChange = (event) => {
        const selectedId = event.target.value;
        setSelectedCategoryId(selectedId);
    };

    const handleDeleteProduct = async (productID) => {
        let res = await deleteProduct(productID)
        .then(res => {
            swal('Xóa thành công');
            getProduct();
        })
        .catch(err => {
            swal('Sản phẩm hiện đang có đơn hàng, không thể xóa!');
        })  
    }
    
    // search product
    const handleSearch = async () => {
        let res = await searchProduct(keyword)
            .then(res => {
                setListProduct(res.data.data);
            })
            .catch(err => {
                swal("Không tìm thấy sản phẩm nào");
            })
    }

    //load modal add product
    const addProduct = () => {
        myModal.current.classList.remove(styleModal.active);
    };

    // load modal update product
    const updateBtn = (product) => {
        setProductID(product._id)
        setImageSrc(product.image);
        setProductName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setProductAvalibable(product.productsAvailable);
        setSelectedCategoryId(product.idCategory);
        myModalUpdate.current.classList.remove(styleModal.active);
    }
    // close modal add/update
    const handleCloseModal = () => {
        myModal.current.classList.add(styleModal.active);
        myModalUpdate.current.classList.add(styleModal.active);
        setImageSrc('');
        setImageEncode('');
        setProductName('');
        setDescription('');
        setPrice('');
        setProductAvalibable('');
        setSelectedCategoryId('');
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('manager-title')}>
                <span style={{ color: '#A09A97' }}>Quản lý sản phẩm</span>/<span> Danh sách sản phẩm</span>
            </h3>
            <div className={cx('list-content')}>
                <div className={cx('list-content-header')}>
                    <div className={cx('content-header-search')}>
                        <input value={keyword} onChange={e=> setKeyword(e.target.value)} type="text" placeholder="Search" />
                        <button
                            onClick={handleSearch}
                            className={cx('search-btn')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.5483 9.80256C16.5483 13.5677 13.5072 16.6051 9.77417 16.6051C6.0411 16.6051 3 13.5677 3 9.80256C3 6.0374 6.0411 3 9.77417 3C13.5072 3 16.5483 6.0374 16.5483 9.80256ZM15.0139 18.079C13.4996 19.0453 11.702 19.6051 9.77417 19.6051C4.37604 19.6051 0 15.2164 0 9.80256C0 4.38876 4.37604 0 9.77417 0C15.1723 0 19.5483 4.38876 19.5483 9.80256C19.5483 12.1971 18.6922 14.3912 17.2702 16.0936L23.4844 22.3511L21.3704 24.4797L15.0139 18.079Z"
                                    fill="#C5C5C5"
                                />
                            </svg>
                        </button>
                    </div>
                    <button onClick={addProduct} className={cx('content-header-btn')}>
                        Thêm mới
                    </button>
                </div>
                <div className={cx('list-content-body')}>
                    <table className={cx('list-content-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Ảnh Sản Phẩm</th>
                                <th>Giá Tiền</th>
                                <th>Số Lượng Còn</th>
                                <th>Đã Bán</th>
                                <th>Mô Tả</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listProduct && listProduct.length > 0
                            && listProduct.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img
                                            className={cx('list-content-table-img')}
                                            src={"http://localhost:3001/imgProduct/"+item.image}
                                            alt=""
                                        />
                                    </td>
                                    <td>{item.price}.đ</td>
                                    <td>{item.productsAvailable}</td>
                                    <td>{item.sold}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div className={cx('list-content-operation', 'd-flex')}>
                                            <div className={cx('operation-update')}>
                                                <button
                                                    onClick={() => updateBtn(item)}
                                                    className={cx('operation-update-btn')}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="25"
                                                        viewBox="0 0 24 25"
                                                        fill="none"
                                                    >
                                                        <g clipPath="url(#clip0_24_2681)">
                                                            <path
                                                                d="M4 21.0807C3.45 21.0807 2.979 20.885 2.587 20.4937C2.195 20.1023 1.99934 19.6313 2 19.0807V5.08066C2 4.53066 2.196 4.05966 2.588 3.66766C2.98 3.27566 3.45067 3.08 4 3.08066H12.925L10.925 5.08066H4V19.0807H18V12.1307L20 10.1307V19.0807C20 19.6307 19.804 20.1017 19.412 20.4937C19.02 20.8857 18.5493 21.0813 18 21.0807H4ZM15.175 3.65566L16.6 5.05566L10 11.6557V13.0807H11.4L18.025 6.45566L19.45 7.85566L12.25 15.0807H8V10.8307L15.175 3.65566ZM19.45 7.85566L15.175 3.65566L17.675 1.15566C18.075 0.755664 18.5543 0.555664 19.113 0.555664C19.6717 0.555664 20.1423 0.755664 20.525 1.15566L21.925 2.58066C22.3083 2.964 22.5 3.43066 22.5 3.98066C22.5 4.53066 22.3083 4.99733 21.925 5.38066L19.45 7.85566Z"
                                                                fill="white"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_24_2681">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                    transform="translate(0 0.555664)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className={cx('operation-delete')}>
                                                <button
                                                    onClick={() => handleDeleteProduct(item._id)}
                                                    className={cx('operation-delete-btn')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <rect y="0.000244141" width="24" height="24" rx="6" fill="#D9534F" />
                                                        <path
                                                            d="M7 21.0002C6.45 21.0002 5.979 20.8042 5.587 20.4122C5.195 20.0202 4.99933 19.5496 5 19.0002V6.00024H4V4.00024H9V3.00024H15V4.00024H20V6.00024H19V19.0002C19 19.5502 18.804 20.0212 18.412 20.4132C18.02 20.8052 17.5493 21.0009 17 21.0002H7ZM9 17.0002H11V8.00024H9V17.0002ZM13 17.0002H15V8.00024H13V17.0002Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className={cx('operation-detail')}>
                                                <div className={cx('operation-detail-btn')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 512 512">
                                                        <path
                                                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className={cx('list-content-footer')}>
                    <div className={cx('content-footer-operation')}>
                        <div className={cx('show-quantity')}>
                            <h5>Hiển thị</h5>
                            <div className={cx('select-show-quantity')}>
                                <select className={cx('select-number-of-acc')} name="cars" id="cars">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('next-page-container')}>
                            <button className={cx('next-firstly-btn', 'next-page-item')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                >
                                    <path
                                        d="M3.50008 2.5C3.3572 2.50002 3.2193 2.55247 3.11253 2.64742C3.00576 2.74236 2.93755 2.87319 2.92083 3.01508L2.91675 3.08333V12.4167C2.91691 12.5653 2.97384 12.7084 3.07591 12.8165C3.17797 12.9246 3.31747 12.9896 3.46589 12.9984C3.61432 13.0071 3.76047 12.9588 3.87448 12.8633C3.9885 12.7679 4.06177 12.6326 4.07933 12.4849L4.08341 12.4167V3.08333C4.08341 2.92862 4.02196 2.78025 3.91256 2.67085C3.80316 2.56146 3.65479 2.5 3.50008 2.5ZM10.9125 2.67092C10.8121 2.57048 10.6784 2.51015 10.5366 2.50123C10.3949 2.49232 10.2547 2.53544 10.1425 2.6225L10.0877 2.67092L5.421 7.33758C5.32056 7.43803 5.26023 7.57167 5.25131 7.71344C5.2424 7.8552 5.28552 7.99535 5.37258 8.10758L5.421 8.16242L10.0877 12.8291C10.1926 12.9337 10.3335 12.9944 10.4816 12.999C10.6298 13.0035 10.7741 12.9515 10.8852 12.8534C10.9964 12.7554 11.0661 12.6188 11.0801 12.4712C11.0942 12.3237 11.0516 12.1763 10.9609 12.0591L10.9125 12.0043L6.65825 7.75L10.9125 3.49575C11.0219 3.38636 11.0833 3.23801 11.0833 3.08333C11.0833 2.92865 11.0219 2.78031 10.9125 2.67092Z"
                                        fill="#111111"
                                    />
                                </svg>
                            </button>
                            <button className={cx('go-left-one-btn', 'next-page-item')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                >
                                    <path
                                        d="M10.06 12.75L11 11.81L7.94667 8.75L11 5.69L10.06 4.75L6.06 8.75L10.06 12.75Z"
                                        fill="black"
                                    />
                                </svg>
                            </button>
                            <button className={cx('go-right-one-btn', 'next-page-item')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                >
                                    <path
                                        d="M6.94 4.75L6 5.69L9.05333 8.75L6 11.81L6.94 12.75L10.94 8.75L6.94 4.75Z"
                                        fill="black"
                                    />
                                </svg>
                            </button>
                            <button className={cx('next-final-btn', 'next-page-item')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                >
                                    <path
                                        d="M3.08709 4.07959C3.03285 4.02535 2.98983 3.96097 2.96048 3.8901C2.93112 3.81924 2.91602 3.74329 2.91602 3.66659C2.91602 3.58989 2.93112 3.51394 2.96048 3.44308C2.98983 3.37221 3.03285 3.30783 3.08709 3.25359C3.14132 3.19935 3.20571 3.15633 3.27657 3.12698C3.34743 3.09763 3.42338 3.08252 3.50009 3.08252C3.57679 3.08252 3.65274 3.09763 3.7236 3.12698C3.79446 3.15633 3.85885 3.19935 3.91309 3.25359L7.99642 7.33692C8.05074 7.39111 8.09384 7.45548 8.12325 7.52635C8.15266 7.59722 8.1678 7.67319 8.1678 7.74992C8.1678 7.82665 8.15266 7.90263 8.12325 7.9735C8.09384 8.04436 8.05074 8.10874 7.99642 8.16292L3.91309 12.2463C3.85885 12.3005 3.79446 12.3435 3.7236 12.3729C3.65274 12.4022 3.57679 12.4173 3.50009 12.4173C3.42338 12.4173 3.34743 12.4022 3.27657 12.3729C3.20571 12.3435 3.14132 12.3005 3.08709 12.2463C3.03285 12.192 2.98983 12.1276 2.96048 12.0568C2.93112 11.9859 2.91602 11.91 2.91602 11.8333C2.91602 11.7566 2.93112 11.6806 2.96048 11.6097C2.98983 11.5389 3.03285 11.4745 3.08709 11.4203L6.75859 7.74992L3.08709 4.07959ZM11.6668 3.66659C11.6668 3.51188 11.6053 3.36351 11.4959 3.25411C11.3865 3.14471 11.2381 3.08326 11.0834 3.08326C10.9287 3.08326 10.7803 3.14471 10.6709 3.25411C10.5615 3.36351 10.5001 3.51188 10.5001 3.66659V11.8333C10.5001 11.988 10.5615 12.1363 10.6709 12.2457C10.7803 12.3551 10.9287 12.4166 11.0834 12.4166C11.2381 12.4166 11.3865 12.3551 11.4959 12.2457C11.6053 12.1363 11.6668 11.988 11.6668 11.8333V3.66659Z"
                                        fill="#111111"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={myModal} className={cx('list-content-modal', 'active')}>
                <div className={cx('modal-container')}>
                    <div>
                        <div className={cx('modal-header')}>
                            <h2 className={cx('modal-header-title')}>Thêm / Sửa Sản Phẩm</h2>
                        </div>
                        <div className={cx('modal-body')}>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Tên Sản Phẩm <span style={{color: 'red'}}>*</span>
                                </h5>
                                <input
                                    value={productName}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    onChange={e => setProductName(e.target.value)}
                                />

                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Ảnh Sản Phẩm<span style={{color: 'red'}}>*</span>
                                </h5>
                                <div className="d-flex al-cent" style={{justifyContent: 'space-between'}}>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                                        Tải ảnh
                                        <VisuallyHiddenInput onChange={handleChooseImage} type="file"/>
                                    </Button>
                                    {<img alt="Bạn chưa chọn ảnh" style={{width: '100px', height: '100px'}}
                                          src={imageEncode}/>}
                                </div>
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Loại Sản Phẩm<span style={{color: 'red'}}>*</span>
                                </h5>
                                <select onChange={handleCategoryChange} className={cx('select-category')} name="cars"
                                        id="cars">
                                    <optgroup label="Chọn loại sản phẩm">
                                        {listCategory && listCategory.length > 0
                                            && listCategory.map((item, index) => (
                                                <option key={item._id} value={item._id}>{item.title}</option>
                                            ))
                                        }
                                    </optgroup>
                                </select>
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Giá Tiền<span style={{color: 'red'}}>*</span>
                                </h5>
                                <input
                                    value={price}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập giá tiền"
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Mô Tả<span style={{color: 'red'}}>*</span>
                                </h5>
                                <input
                                    value={description}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập mô tả"
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Đơn vị<span style={{color: 'red'}}>*</span>
                                </h5>
                                <input
                                    value={unit}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập đơn vị"
                                    onChange={e => setUnit(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Ảnh chi tiết sản phẩm
                                </h5>
                                <div className="d-flex al-cent" style={{justifyContent: 'space-between'}}>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                                        Tải ảnh
                                        <VisuallyHiddenInput onChange={handleChooseListImage} type="file"/>
                                    </Button>
                                    {detailImage.map((item,index) => (
                                        <img 
                                            key={index} 
                                            src={URL.createObjectURL(item)} 
                                            style={{width: '50px', height: '50px', border: '1px solid #ddd'}}
                                            alt={`Selected Image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal-footer')}>
                        <button onClick={handleCloseModal} className={cx('btn-primary-m', 'btn-close-m')}>Thoát</button>
                        <button onClick={handleAddProduct} className={cx('btn-primary-m', 'btn-confirm-m')}>Xác Nhận
                        </button>
                    </div>
                </div>
            </div>
            <div ref={myModalUpdate} className={cx('list-content-modal', 'active')}>
                <div className={cx('modal-container')}>
                    <div>
                        <div className={cx('modal-header')}>
                            <h2 className={cx('modal-header-title')}>Thêm / Sửa Sản Phẩm</h2>
                        </div>
                        <div className={cx('modal-body')}>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Tên Sản Phẩm <span style={{ color: 'red' }}>*</span>
                                </h5>
                                <input
                                    value={productName}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    onChange={e => setProductName(e.target.value)}
                                />

                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Ảnh Sản Phẩm<span style={{ color: 'red' }}>*</span>
                                </h5>
                                <div className="d-flex al-cent" style={{justifyContent: 'space-between'}}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload file
                                    <VisuallyHiddenInput onChange={handleChooseImage} type="file" />
                                </Button>
                                { imageEncode ? <img alt="Bạn chưa chọn ảnh" style={{width: '100px', height: '100px'}} src={imageEncode} /> : <img alt="Bạn chưa chọn ảnh" style={{width: '100px', height: '100px'}} src={"http://localhost:3001/imgProduct/"+imageSrc} />}
                                </div>
                                   
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Loại Sản Phẩm<span style={{ color: 'red' }}>*</span>
                                </h5>
                                <select onChange={handleCategoryChange} className={cx('select-category')} name="cars" id="cars">
                                    <optgroup  label="Chọn loại sản phẩm">
                                        {listCategory && listCategory.length > 0
                                            && listCategory.map((item,index)=> (
                                                <option key={item._id} value={item._id}>{item.title}</option>
                                            ))
                                        }
                                    </optgroup>
                                </select>
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Giá Tiền<span style={{ color: 'red' }}>*</span>
                                </h5>
                                <input
                                    value={price}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập giá tiền"
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Mô Tả<span style={{ color: 'red' }}>*</span>
                                </h5>
                                <input
                                    value={description}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập mô tả"
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className={cx('modal-body-item')}>
                                <h5 className={cx('modal-body-item-title')}>
                                    Số lượng<span style={{ color: 'red' }}>*</span>
                                </h5>
                                <input
                                    value={productAvalibable}
                                    className={cx('item-input-text')}
                                    type="text"
                                    placeholder="Nhập số lượng"
                                    onChange={e => setProductAvalibable(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div onClick={handleCloseModal} className={cx('modal-footer')}>
                        <button className={cx('btn-primary-m', 'btn-close-m')}>Thoát</button>
                        <button onClick={handleUpdateProduct}  className={cx('btn-primary-m', 'btn-confirm-m')}>Xác Nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
