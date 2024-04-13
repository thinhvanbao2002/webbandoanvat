import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import stylesModal from '../Modal/Modal.module.scss';
import Modal from '../Modal';
import {useContext, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { registerUser, loginUser, checkUsernameOrEmail } from '@/services/UserServices';
import Swal from 'sweetalert2';
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Swal.css';
function Header() {
    const cx = classNames.bind({ ...styles, ...stylesModal });
    const [stateSearch, setStateSearch] = useState(true);
    const navigate = useNavigate();
    const {user, logout, loginContext } = useContext(UserContext);

    // Định nghĩa userRef
    const modalRegister = useRef();
    const modalLogin = useRef();
    const modalSearch = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const usernameLoginRef = useRef();
    const usernameInputloginRef = useRef();
    const emailRefContainer = useRef();
    const userNameRegisterRef = useRef();
    const fullnameContainerRef = useRef();
    const fullnameRef = useRef();
    const rePasswordRefContainer = useRef();
    const passwordRefContainer = useRef();
    const rePasswordRef = useRef();
    const passwordRef = useRef();
     // Định nghĩa userRef

     // State Loading
    const [loadingAPI, setLoadingAPI] = useState(false);
    // State Loading

    // Thông tin user 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
     // Thông tin user 

    // Check format
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [fullnameError, setFullnameError] = useState(false);
    const [passwordError, setPasswordEror] = useState(false);
    // Check format

    const handleSearchModal = () => {
        console.log(stateSearch);
        if (stateSearch) {
            modalSearch.current.style.display = 'flex';
        } else {
            modalSearch.current.style.display = 'none';
        }
        setStateSearch(!stateSearch);

    };
    const register = () => {
        handleCloseLogin();
        modalRegister.current.openModal();
    };
    const handleRegister = async () => {
        if(username === '' || password === '' || fullname === '' || confirmPassword === '' || email === '') {
            Swal.fire({
                title: 'Thất bại!',
                text: 'Vui lòng nhập đầy đủ thông tin!',
                icon: 'error', // Thêm biểu tượng success
                confirmButtonText: 'OK',
              });
        }else{
            if(usernameError === true || emailError === true || fullnameError === true){
                Swal.fire({
                    title: 'Thất bại!',
                    text: 'Vui lòng nhập đúng định dạng!',
                    icon: 'error', // Thêm biểu tượng success
                    confirmButtonText: 'OK',
                  });
            }else{
                if(password === confirmPassword){
                    setLoadingAPI(true);
                    let res = await registerUser(username, email, password, confirmPassword, fullname)
                    .then(res=> {
                        handleCloseRegister();
                        setLoadingAPI(false);
                        Swal.fire({
                            title: 'Đăng kí thành công!',
                            text: 'Chào mừng bạn đến với bà tuyết shop!',
                            icon: 'success', // Thêm biểu tượng success
                            confirmButtonText: 'OK',
                            confirmButtonColor: "#ee4d2d"
                        });
                    })
                    .catch(err=> {
                        console.log(err);
                        alert('Đăng kí that bai');
                    })
                }else{
                    passwordRefContainer.current.style.border ='1px solid red';
                    rePasswordRefContainer.current.style.border='1px solid red';
                    setPasswordEror(true);
                }
                
            }
            
        }
    }
    const login = () => {
        modalLogin.current.openModal();
    };

    const handleLogin = async () => {
        setLoadingAPI(true);
        if(!username || !password) {
            Swal.fire({
                title: 'Thất bại!',
                text: 'Vui lòng điền tên đăng nhập và mật khẩu!',
                icon: 'warning', // Thêm biểu tượng success
                confirmButtonText: 'Cool',
              });
            setLoadingAPI(false);
        }else{
            let res = await loginUser(username, password)
            .then(res => {
                console.log(res);
                if(res && res.token) {
                    loginContext(res.data._id,res.data.username)
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("fullname",res.data.fullName);
                    localStorage.setItem("phone",res.data.phone);
                    localStorage.setItem("address",res.data.address);
                    localStorage.setItem("avt",res.data.avt);
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Chào mừng bạn đến với bà tuyết shop!',
                        icon: 'success', // Thêm biểu tượng success
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#ee4d2d"
                      });
                    handleCloseLogin();
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Thất bại!',
                    text: 'Sai tên đăng nhập hoặc mật khẩu!',
                    icon: 'error', // Thêm biểu tượng success
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#ee4d2d"
                  });
            })
        setLoadingAPI(false);
        }
    }
    const handleLogout = () => {
        logout();
        navigate("/");
        localStorage.removeItem("email");
        localStorage.removeItem("fullname");
        localStorage.removeItem("phone");
        localStorage.removeItem("address");
        localStorage.removeItem("avt");
        Swal.fire({
            title: 'Hẹn gặp lại!',
            icon: 'success', // Thêm biểu tượng success
            confirmButtonText: 'OK',
            confirmButtonColor: "#ee4d2d"
          });
        // setName('');
       
    }
    const handleCloseRegister = () => {
        modalRegister.current.closeModal();
        setUsername('');
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
    const handleCloseLogin = () => {
        modalLogin.current.closeModal();
        setUsername('');
        setPassword('');
    };
    const handleOpenCart = () => {
        if(user.auth === true) {
            navigate(`/cart/${user.id}`);
        }else{
            Swal.fire({
                text: 'Vui lòng đăng nhập để xem giỏ hàng!',
                icon: 'error', // Thêm biểu tượng success
                confirmButtonText: 'OK',
                confirmButtonColor: "#ee4d2d" // Thêm lớp CSS tùy chỉnh vào nút "Cool"
              });
        }
    }

    const handleBlurUsername = async () => {
       try {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const minText = 3;
        if (!usernameRegex.test(username) && username != '' || username.length < minText) {
          setUsernameError(true);
          userNameRegisterRef.current.style.border = '1px solid red';
            // setUsername('');
            // usernameInputloginRef.current.focus();
        } else {
          setUsernameError(false);
            userNameRegisterRef.current.style.border = '1px solid #f5f5f7'
            if(username != ''){
                setLoadingAPI(true);
                let res = await checkUsernameOrEmail(username)
                .then(res => {
                    setUsername('');
                    usernameRef.current.focus();
                    setLoadingAPI(false);
                    toast.error('Tên đăng nhập đã tồn tại!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(err => {
                    setLoadingAPI(false)
                })
                
            }else{
               
            }
        }

      
       } catch (error) {
        
       }
    }
    
    const handleBlurEmail = async () => {
        try {
           
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailRegex.test(email) && email != '') {
                setEmailError(true);
                // emailRef.current.focus();
                emailRefContainer.current.style.border = '1px solid red'
            } else {
                setEmailError(false);
                emailRefContainer.current.style.border = '1px solid #f5f5f7'
                if(email != ''){
                    setLoadingAPI(true);
                    let res = await checkUsernameOrEmail(email)
                    .then(res => {
                        setEmail('');
                        emailRef.current.focus();
                        setLoadingAPI(false);
                        toast.error('Email đã tồn tại!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    })
                    .catch(err => {
                        setLoadingAPI(false)
                    })
                    
                }else{
                   
                }
            }
            
           } catch (error) {
            
           }
    }
    const blurUsername = () => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username) && username != '') {
          setUsernameError(true);
            usernameLoginRef.current.style.border = '1px solid red';
            setUsername('');
            usernameInputloginRef.current.focus();
        } else {
          setUsernameError(false);
            usernameLoginRef.current.style.border = '1px solid #f5f5f7'
        }
    }
    const blurFullName = () => {
        const fullNameRegex = /^[a-zA-Z0-9\s.,!?áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/;

        if (!fullNameRegex.test(fullname) && fullname != '') {
            setFullnameError(true);
            fullnameContainerRef.current.style.border = '1px solid red';
        } else {
            setFullnameError(false);
            fullnameContainerRef.current.style.border = '1px solid #f5f5f7';
        }
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-link')}>
                    <Link to="/" className={cx('header-link-item')}>
                        Home
                    </Link>
                    <Link to="/shop" className={cx('header-link-item')}>
                        Shop
                    </Link>
                    <a href="" className={cx('header-link-item')}>
                        Notification
                    </a>

                    <a href="" className={cx('header-link-item')}>
                        Support
                    </a>
                </div>
                <div className="d-flex">
                    <div className={cx('header-final')}>
                        <div className={cx('header-final-cart')}>
                            <a onClick={handleOpenCart} >
                                <svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z" fill="#fff"></path>
                                </svg>
                            </a>
                        </div>
                        
                        {user && user.auth === true ? <a onClick={handleLogout} className={cx('header-final-login')}>Logout</a> : <a onClick={login} className={cx('header-final-login')}>Login</a>}
                        {user.auth === false && <a onClick={register} className={cx('header-final-login')}>Register</a>}
                    </div>
                    <div className={cx('header-info')}>
                        <h5 className={cx('info-name')}>{localStorage.username}</h5>
                        <div className={cx('info-img-container', 'header__navbar-item--noti')}>
                            {user.auth === true && <img src={"http://localhost:3001/"+localStorage.getItem("avt")} className={cx('info-image')} />}
                            <div className={cx('header-noti')}>
                                <ul className={cx('header-noti-list')}>
                                    <li className={cx('header-noti-item')}>
                                        <Link to={"/profile"} className={cx('header-noti-link')}>Tài khoản</Link>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <Link to={"/DetailOrder"} className={cx('header-noti-link')}>Đơn mua</Link>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <a className={cx('header-noti-link')}>Đổi mật khẩu</a>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <a onClick={handleLogout} className={cx('header-noti-link')}>Đăng xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal ref={modalRegister}>
                <div className={cx('modal-body-header')}>
                    <h1 className={cx('modal-body-header-title')}>Đăng Kí</h1>
                    <div onClick={handleCloseRegister} className={cx('modal-body-header-icon')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
                <div className={cx('modal-body-content')}>
                    <div ref={userNameRegisterRef} className={cx('modal-body-content-item')}>
                        <input
                            ref={usernameRef}
                            onBlur={handleBlurUsername}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text" placeholder="Tên đăng nhập"
                        />
                    </div>
                    {usernameError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Không chứa kí tự đặc biệt và tối thiểu 3 kí tự</p> : ''} 
                    <div ref={emailRefContainer} className={cx('modal-body-content-item')}>
                        <input
                           ref={emailRef}
                           onBlur={handleBlurEmail}
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"
                           placeholder="Email"
                        />
                    </div>
                    {emailError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Bạn phải nhập đúng định dạng name@gmail.com</p> : ''} 
                    <div ref={fullnameContainerRef} className={cx('modal-body-content-item')}>
                        <input
                            ref={fullnameRef}
                            value={fullname}
                            onBlur={blurFullName}
                            onChange={e => setFullname(e.target.value)}
                            type="text"
                            placeholder="Họ và tên" />
                    </div>
                    {fullnameError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Họ tên của bạn không được chứa kí tự đặc biệt</p> : ''} 
                    <div ref={passwordRefContainer} className={cx('modal-body-content-item')}>
                        <input value={password}
                               onChange={e => {
                                    setPassword(e.target.value)
                                    
                               }}
                               type="password"
                               placeholder="Mật khẩu"
                        />
                    </div>
                    {passwordError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Mật khẩu phải giống nhau</p> : ''} 

                    <div ref={rePasswordRefContainer} className={cx('modal-body-content-item')}>
                        <input value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                               type="password"
                               placeholder="Nhập lại mật khẩu" />
                    </div>
                    {passwordError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Mật khẩu phải giống nhau</p> : ''} 

                </div>
                <div className={cx('modal-body-content-footer')}>
                    <button onClick={handleRegister} className={cx('btn-primary-m-user')}>Đăng Kí</button>
                </div>
                {loadingAPI && <CircularProgress className={cx('icon-loading')} size={40} sx={{ color: '#ee4d2d'}} />}
            </Modal>
            <Modal ref={modalLogin}>
                <div className={cx('modal-body-header')}>
                    <h1 className={cx('modal-body-header-title')}>Đăng Nhập</h1>
                    <div onClick={handleCloseLogin} className={cx('modal-body-header-icon')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
                <div className={cx('modal-body-content')}>
                    <div ref={usernameLoginRef} className={cx('modal-body-content-item')}>
                        <input
                            ref={usernameInputloginRef}
                            onBlur={blurUsername}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Tên đăng nhập" />
                            
                    </div>
                    {usernameError === true ? <p style={{marginTop: '-18px', fontSize: '13px', marginLeft: '15px', color: 'red'}} >Không chứa kí tự đặc biệt</p> : ''} 
                    <div className={cx('modal-body-content-item')}>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Mật khẩu" />
                    </div>
                </div>
                <div className={cx('modal-body-content-footer')}>
                    <button onClick={handleLogin} className={cx('btn-primary-m-user')}>
                        Đăng Nhập</button>
                </div>
                <div
                    style={{ textAlign: 'center', marginTop: '20px' }}
                    className={cx('modal-body-content-footer-login')}
                >
                    Bạn chưa có tài khoản?
                    <span
                        onClick={register}
                        style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                    >
                        Đăng kí tại đây
                    </span>
                </div>
                {loadingAPI && <CircularProgress className={cx('icon-loading')} size={40} sx={{ color: '#ee4d2d'}} />}
            </Modal>
            <div ref={modalSearch} className={cx('modal-search')}>
                <div className={cx('modal-inp-container')}>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Header;
