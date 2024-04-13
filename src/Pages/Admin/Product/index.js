import {useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../GlobalCSS/Global.module.scss';
import styleModal from '../GlobalCSS/GlobalModal.module.scss';
import { fetchAllProduct,fetchAllCategory,createProduct, deleteProduct, updateProduct, searchProduct, getProductByID, createInventory } from '@/services/AdminServices'
import swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Excel from '../Excel'

import './Product.scss'
import { logDOM } from '@testing-library/react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    border: 'none',
    borderRadius: '10px',
    zIndex: 1, 
  };

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
    const priceRef = useRef();
    const priceUpdateRef = useRef();
    //List
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    // list

    //Check Format
    const [priceError, setPriceError] = useState(false);
    const [close, setClose] = useState(false);
    //Check Format
    
    //Product Info
    const [productID, setProductID] = useState('')
    const [imageSrc, setImageSrc] = useState(null);
    const [imageEncode, setImageEncode] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categoryID, setCategoryID] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productAvalibable, setProductAvalibable] = useState(0);
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [detailImages, setDetailImages] = useState([]);
    const [detailImagesUpdate, setDetailImagesUpdate] = useState([]);
    const [open, setOpen] = useState(false);
    

    // Keyword Search
    const [keyword, setKeyword] = useState('');

    // Inventory
    const [quantity, setQuantity] = useState('');
    const [note, setNote] = useState('');
    const idAdmin = localStorage.getItem("idAdmin");
    const [totalAmountImported, setTotalAmountImported] = useState('');


    

    const handleOpen = (product) => {
        console.log(product);
        setProductID(product._id);
        setProductName(product.name);
        setImageSrc(product.image);
        setCategoryID(product.idCategory);
        setPrice(product.price);
        if(product && product.unit) {
            setUnit(product.unit)
        }
        setDescription(product.description);
        setProductAvalibable(product.productsAvailable);
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
        setNote('');
        setQuantity('');
        setTotalAmountImported('');
    };
    const handleImportProduct = async () => {
        try {
            let res = await createInventory(idAdmin, productID, quantity, totalAmountImported, note);
            if(res && res.data) {
                setOpen(false);
                setNote('');
                setQuantity(null);
                setTotalAmountImported(null);
                const newQuantity = parseInt(productAvalibable) + parseInt(quantity);
                let res = await updateProduct(productID, productName,imageSrc,price,newQuantity,description,categoryID, unit, detailImages)
                .then(res => {
                    swal.fire({
                        title: 'Thành công!',
                        text: 'Nhập hàng thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                    setQuantity('');
                    setTotalAmountImported('');
                    getProduct();
                })
                .catch(err => {
                    swal.fire({
                        title: 'Thất bại!',
                        text: 'Nhập hàng thất bại!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                })
            }
        } catch (error) {
            // swal.fire({
            //     title: 'Thất bại!',
            //     text: 'Cần nhập đầy đủ thông tin!',
            //     icon: 'error',
            //     confirmButtonText: 'OK',
            //     confirmButtonColor: '#ff0000',
            // });
            // alert('Can nhap du');
        }
    }
    useEffect(() => {
        getProduct();
        getCategory();
    }, []);

    useEffect(() => {
        setSelectedCategoryId('');
    },[close])

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
            setDetailImagesUpdate([]);
            const files = e.target.files;
            // Convert the FileList object to an array and update state
            //  setDetailImages(files);
            setDetailImages((prevImages) => [...prevImages,...files]);

    }
    
    //add product
    const handleAddProduct = async () => {
        if( productName === '' || imageSrc === ''|| price === '' || productAvalibable === '' || selectedCategoryId === '' || selectedCategoryId === null  || unit === '') {
            swal.fire({
                title: 'Cảnh báo!',
                text: 'Bạn cần nhập đầy đủ thông tin!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff0000',
            });
        }else{
            if(priceError == false){
                let res = await createProduct(productName,imageSrc,price,productAvalibable,description,selectedCategoryId, unit, detailImages);
                if(res) {
                    getProduct();
                    handleCloseModal();
                    swal.fire({
                        title: 'Thành công!',
                        text: 'Thêm mới thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                }else{
                    handleCloseModal();
                    swal.fire({
                        title: 'Thất bại!',
                        text: 'Thêm mới thất bại!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                }
            }else{
                swal.fire({
                    title: 'Thất bại!',
                    text: 'Bạn chưa nhập đúng định dạng!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#ff0000',
                });
            }
        }
    }

    // update product
    const handleUpdateProduct = async () =>{
        try {
            if(priceError == false){
                let res = await updateProduct(productID, productName,imageSrc,price,productAvalibable,description,selectedCategoryId, unit, detailImages)
                .then(res => {
                    getProduct();
                    handleCloseModal();
                    swal.fire({
                        title: 'Thành công!',
                        text: 'Cập nhật thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                    
                })
                .catch(err => {
                    swal.fire({
                        title: 'Thất bại!',
                        text: 'Cập nhật thất bại!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                })
            }else{
                swal.fire({
                    title: 'Thất bại!',
                    text: 'Cần nhập đúng định dạng!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#ff0000',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
   

    const handleCategoryChange = (event) => {
        const selectedId = event.target.value;
        setSelectedCategoryId(selectedId);
    };

    const handleDeleteProduct = async (productID) => {

        const confirmResult = await swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc muốn xóa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy bỏ',
            confirmButtonColor: '#ff0000',
          });
        if(confirmResult.isConfirmed){
            try {
                let res = await deleteProduct(productID)
                .then(res => {
                    swal.fire({
                        title: 'Thành công!',
                        text: 'Xóa sản phẩm thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                    getProduct();
                })
                .catch(err => {
                    swal.fire({
                        title: 'Thất bại!',
                        text: 'Sản phẩm đang có đơn hàng không thể xóa!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff0000',
                    });
                })  
            } catch (error) {
                
            }
        }
        
    }
    
    // search product
    const handleSearch = async () => {
        try {
            let res = await searchProduct(keyword)
            .then(res => {
                setListProduct(res.data.data);
            })
            .catch(err => {
                swal("Không tìm thấy sản phẩm nào");
            })
        } catch (error) {
            swal.fire({
                title: 'Thất bại!',
                text: 'Không tìm thấy sản phẩm nào tương ứng!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff0000',
            });
        }
    }

    //load modal add product
    const addProduct = () => {
        myModal.current.classList.remove(styleModal.active);
    };

    // load modal update product
    const updateBtn = async (product) => {
        setProductID(product._id)
        setImageSrc(product.image);
        setProductName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setProductAvalibable(product.productsAvailable);
        setSelectedCategoryId(product.idCategory);
        setUnit(product.unit);
        let res = await getProductByID(product._id)
        .then(res => {
            setDetailImagesUpdate(res.data.detailImage);
        }) 
        .catch(err => {
            console.log(err);
        })
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
        setProductAvalibable(0);
        setSelectedCategoryId('');
        setDetailImages([]);
        setUnit('');
        setPriceError(false);
        setClose(!close);
        priceRef.current.style.border = '1px solid #ccc';
        priceUpdateRef.current.style.border = '1px solid #ccc';
    };

    const blurPrice = () => {
        const numberOnlyRegex = /^[0-9]+$/;
        if (!numberOnlyRegex.test(price) && price != '') {
            setPriceError(true);
            priceRef.current.style.border = '1px solid red';
            priceUpdateRef.current.style.border = '1px solid red';
        } else {
            setPriceError(false);
            priceRef.current.style.border = '1px solid #ccc';
            priceUpdateRef.current.style.border = '1px solid #ccc';
        }
    }

    const handleQuantityChange = (e) => {
        // Chỉ cho phép nhập số
        const value = e.target.value;
        if (/^\d*$/.test(value) || value === '') {
            setQuantity(value);
          }
      };

    const handleTotalAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) || value === '') {
          setTotalAmountImported(value);
        }
    }

    return (
        <>
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
                        <div>
                        <Excel keyword={'product'} />
                        <button onClick={addProduct} className={cx('content-header-btn')}>
                            Thêm mới
                        </button>
                        </div>
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
                                                    <div onClick={() => handleOpen(item)} className={cx('operation-detail-btn')}>
                                                        {/* <svg onClick={() => handleOpen(item)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 512 512">
                                                            <path
                                                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                                                fill="white"
                                                            />
                                                        </svg> */}
                                                        <svg  xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                                                            <path fill='#fff' d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"/>
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
                                        <optgroup >
                                        {listCategory && listCategory.length > 0 && (
                                            <>
                                            <option value="">-- Chọn một loại sản phẩm --</option>
                                            {listCategory.map((item, index) => (
                                                <option key={item._id} value={item._id}>
                                                {item.title}
                                                </option>
                                            ))}
                                            </>
                                        )}
                                        </optgroup>
                                    </select>
                                </div>
                                <div className={cx('modal-body-item')}>
                                    <h5 className={cx('modal-body-item-title')}>
                                        Giá Tiền<span style={{color: 'red'}}>*</span>
                                    </h5>
                                    <input
                                        ref={priceRef}
                                        value={price}
                                        onBlur={blurPrice}
                                        className={cx('item-input-text')}
                                        type="text"
                                        placeholder="Nhập giá tiền"
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>
                                {priceError === true ? <p style={{marginTop: '-15px',marginBottom: '10px', fontSize: '13px', marginLeft: '20px', color: 'red'}} >Giá tiền phải là số</p> : ''} 

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
                                        {detailImages && detailImages.length > 0 &&
                                        detailImages.map((item,index) => (
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
                                        Giá Tiền<span style={{color: 'red'}}>*</span>
                                    </h5>
                                    <input
                                        ref={priceUpdateRef}
                                        value={price}
                                        onBlur={blurPrice}
                                        className={cx('item-input-text')}
                                        type="text"
                                        placeholder="Nhập giá tiền"
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>
                                {priceError === true ? <p style={{marginTop: '-15px',marginBottom: '10px', fontSize: '13px', marginLeft: '20px', color: 'red'}} >Giá tiền phải là số</p> : ''} 
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
                                        {detailImagesUpdate.length > 0 ? detailImagesUpdate && detailImagesUpdate.length >= 0 &&
                                        detailImagesUpdate.map((item,index) => (
                                            <img 
                                                key={index} 
                                                src={`http://localhost:3001/imgProduct/${item.detailImage}`}
                                                style={{width: '50px', height: '50px', border: '1px solid #ddd'}}
                                                alt={`Selected Image ${index + 1}`}
                                            />
                                        )) : detailImages && detailImages.length > 0 &&
                                        detailImages.map((item,index) => (
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
                            <button onClick={handleCloseModal}  className={cx('btn-primary-m', 'btn-close-m')}>Thoát</button>
                            <button onClick={handleUpdateProduct}  className={cx('btn-primary-m', 'btn-confirm-m')}>Xác Nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
            <Fade in={open}>
            <Box sx={style}>
                <h3 className='inventory_title' >NHẬP HÀNG</h3>  
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px'
                    }}
                    >
                     <TextField
                        onChange={handleQuantityChange}
                        InputProps={{
                        error: !/^\d*$/.test(quantity),
                        }}
                        helperText={!/^\d*$/.test(quantity) ? 'Yêu cầu nhập số' : ''}
                        value={quantity}
                        fullWidth
                        label="Số lượng"
                        id="fullWidth"
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px'
                    }}
                    >
                    <TextField 
                        value={totalAmountImported} 
                        onChange={handleTotalAmountChange} 
                        InputProps={{
                            error: !/^\d*$/.test(quantity) && quantity !== '',
                            }}
                            helperText={!/^\d*$/.test(quantity) && quantity !== '' ? 'Yêu cầu nhập số' : ''}
                        fullWidth 
                        label="Tổng tiền" id="fullWidth" />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px'
                    }}
                    >
                    <TextField value={note} onChange={e => setNote(e.target.value)} fullWidth label="Ghi chú" id="fullWidth" />
                </Box>
               
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                    >
                    <Button sx={{
                       
                        }} 
                        onClick={handleImportProduct}
                        variant="contained" disableElevation>
                            Nhập hàng
                    </Button>
                </Box>
                
            </Box>
            </Fade>
        </Modal>
     </>
    );
}



export default Product;
