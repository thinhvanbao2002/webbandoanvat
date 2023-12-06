import {useContext, useState} from "react";
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {loginAdmin} from "@/services/AdminServices";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "@/context/AdminContext";

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [usernameAdmin, setUsernameAdmin] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    const { admin, loginContext, logout } = useContext(AdminContext);

    const handleLoginAdmin = async () => {
        setLoadingAPI(true);
        if(usernameAdmin === '' || passwordAdmin === '') {
            alert('Ban can nhap day du');
        }else {
            let res = await loginAdmin(usernameAdmin, passwordAdmin)
                .then(res => {
                    if(res && res.token) {
                        console.log(res);
                        loginContext(res.data._id,res.data.username);
                        navigate('/admin/userlist');
                    }

                })
                .catch(err => {
                    toast.error('Đăng nhập thất bại, sai username hoặc password!!!', {
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
        }
        setLoadingAPI(false);
    }
    return (
        <div className={cx('wrapper', 'd-flex')}>
            <div className={cx('login-section')}>
                <div className={cx('login-form-container')}>
                    <h2 className={cx('login-title')}>Đăng nhập</h2>
                    <h4 className={cx('login-description')}>Quản lý thông tin nội dung hệ thống</h4>
                    <div className={cx('form-input')}>
                        <div className={cx('input-container')}>
                            <h4 className={cx('title-input')}>Tên đăng nhập</h4>
                            <div className={cx('input-login')}>
                                <input
                                    onChange={(e)=> setUsernameAdmin(e.target.value)}
                                    value={usernameAdmin}
                                    placeholder="Nhập tên đăng nhập"
                                    type="text"
                                    className={cx('enter-input')} />
                                <svg
                                    className={cx('input-icon')}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                >
                                    <path
                                        d="M20.0001 6.66669C21.7682 6.66669 23.4639 7.36907 24.7141 8.61931C25.9644 9.86955 26.6667 11.5652 26.6667 13.3334C26.6667 15.1015 25.9644 16.7972 24.7141 18.0474C23.4639 19.2976 21.7682 20 20.0001 20C18.232 20 16.5363 19.2976 15.286 18.0474C14.0358 16.7972 13.3334 15.1015 13.3334 13.3334C13.3334 11.5652 14.0358 9.86955 15.286 8.61931C16.5363 7.36907 18.232 6.66669 20.0001 6.66669ZM20.0001 23.3334C27.3667 23.3334 33.3334 26.3167 33.3334 30V33.3334H6.66675V30C6.66675 26.3167 12.6334 23.3334 20.0001 23.3334Z"
                                        fill="#DFE2E6"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <h4 className={cx('title-input')}>Mật khẩu</h4>
                            <div className={cx('input-login')}>
                                <input
                                    value={passwordAdmin}
                                    onChange={(e)=> setPasswordAdmin(e.target.value)}
                                    placeholder="Nhập mật khẩu" type="password"
                                    className={cx('enter-input')} />
                                <svg
                                    style={{ margin: '0 5px' }}
                                    className={cx('input-icon')}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="18"
                                    viewBox="0 0 30 18"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.1138 6.35113C14.8604 2.69738 11.1663 0.238903 7.03675 1.08103C4.01547 1.70584 1.5615 4.19148 0.928222 7.30192C-0.153633 12.5584 3.72522 17.2173 8.65953 17.2173C12.103 17.2173 15.0319 14.949 16.1138 11.7842H21.8529V14.5008C21.8529 15.9949 23.0403 17.2173 24.4916 17.2173C25.9428 17.2173 27.1302 15.9949 27.1302 14.5008V11.7842C28.5815 11.7842 29.7689 10.5618 29.7689 9.06768C29.7689 7.57358 28.5815 6.35113 27.1302 6.35113H16.1138ZM8.65975 11.7842C7.20848 11.7842 6.02108 10.5618 6.02108 9.06768C6.02108 7.57358 7.20848 6.35114 8.65975 6.35114C10.111 6.35114 11.2984 7.57358 11.2984 9.06768C11.2984 10.5618 10.111 11.7842 8.65975 11.7842Z"
                                        fill="#DFE2E6"
                                    />
                                    <mask
                                        id="mask0_118_2252"
                                        style={{ maskType: 'luminance' }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="30"
                                        height="18"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.1138 6.35113C14.8604 2.69738 11.1663 0.238903 7.03675 1.08103C4.01547 1.70584 1.5615 4.19148 0.928222 7.30192C-0.153633 12.5584 3.72522 17.2173 8.65953 17.2173C12.103 17.2173 15.0319 14.949 16.1138 11.7842H21.8529V14.5008C21.8529 15.9949 23.0403 17.2173 24.4916 17.2173C25.9428 17.2173 27.1302 15.9949 27.1302 14.5008V11.7842C28.5815 11.7842 29.7689 10.5618 29.7689 9.06768C29.7689 7.57358 28.5815 6.35113 27.1302 6.35113H16.1138ZM8.65975 11.7842C7.20848 11.7842 6.02108 10.5618 6.02108 9.06768C6.02108 7.57358 7.20848 6.35114 8.65975 6.35114C10.111 6.35114 11.2984 7.57358 11.2984 9.06768C11.2984 10.5618 10.111 11.7842 8.65975 11.7842Z"
                                            fill="white"
                                        />
                                    </mask>
                                    <g mask="url(#mask0_118_2252)"></g>
                                </svg>
                            </div>
                        </div>
                        <button onClick={handleLoginAdmin} className={cx('btn-login')}>
                            {loadingAPI && <CircularProgress sx={{color:'#000', marginRight: '10px'}} size={20} /> }
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('background-logo')}></div>
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

export default Login;
