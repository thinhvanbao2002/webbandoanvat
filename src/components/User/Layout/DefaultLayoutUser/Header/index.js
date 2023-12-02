import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import stylesModal from '../Modal/Modal.module.scss';
import Modal from '../Modal';
import { useEffect, useRef, useState } from 'react';
import {Link} from "react-router-dom";

function Header() {
    const cx = classNames.bind({ ...styles, ...stylesModal });
    const [stateSearch, setStateSearch] = useState(true);
    const modalRegister = useRef();
    const modalLogin = useRef();
    const modalSearch = useRef();

    // State Register
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const handleSearchModal = () => {
        console.log(stateSearch);
        if (stateSearch) {
            modalSearch.current.style.display = 'flex';
        } else {
            modalSearch.current.style.display = 'none';
        }
        setStateSearch(!stateSearch);

    };
    const handleRegister = () => {
        handleCloseLogin();
        modalRegister.current.openModal();
    };

    const handleLogin = () => {
        modalLogin.current.openModal();
    };

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-link')}>
                    <Link to="/" className={cx('header-link-item')}>
                        Trang chủ
                    </Link>
                    <Link to="/shop" className={cx('header-link-item')}>
                        Cửa hàng
                    </Link>
                    <a href="" className={cx('header-link-item')}>
                        Thông báo
                    </a>

                    <a href="" className={cx('header-link-item')}>
                        Hỗ Trợ
                    </a>
                </div>
                <div className="d-flex">
                    <div className={cx('header-final')}>
                        <div className={cx('header-final-cart')}>
                            <svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg">
                                <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z" fill="#fff"></path>
                            </svg>
                        </div>
                        <div onClick={handleSearchModal} className={cx('header-final-search')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="44px" viewBox="0 0 15 44">
                                <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z" fill="#fff"></path>
                            </svg>
                        </div>
                        <a onClick={handleLogin} className={cx('header-final-login')}>
                            Đăng nhập
                        </a>

                        <a onClick={handleRegister} className={cx('header-final-login')}>
                            Đăng kí
                        </a>
                    </div>
                    <div className={cx('header-info')}>
                        <h5 className={cx('info-name')}>Thịnh Văn Bảo</h5>
                        <div className={cx('info-img-container', 'header__navbar-item--noti')}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1tv-IxwZzm5j34o7kHA8Kb5k1AbMiWPDtHk4Tvb71&s' className={cx('info-image')} />
                            <div className={cx('header-noti')}>
                                <ul className={cx('header-noti-list')}>
                                    <li className={cx('header-noti-item')}>
                                        <a className={cx('header-noti-link')}>Tài khoản</a>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <a className={cx('header-noti-link')}>Đơn mua</a>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <a className={cx('header-noti-link')}>Đổi mật khẩu</a>
                                    </li>
                                    <li className={cx('header-noti-item')}>
                                        <a className={cx('header-noti-link')}>Đăng xuất</a>
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
                    <div className={cx('modal-body-content-item')}>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text" placeholder="Tên đăng nhập"
                        />
                    </div>
                    <div className={cx('modal-body-content-item')}>
                        <input
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"
                           placeholder="Email"
                        />
                    </div>
                    <div className={cx('modal-body-content-item')}>
                        <input
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            type="text"
                            placeholder="Họ và tên" />
                    </div>
                    <div className={cx('modal-body-content-item')}>
                        <input value={password}
                               onChange={e => setPassword(e.target.value)}
                               type="password"
                               placeholder="Mật khẩu"
                        />
                    </div>
                    <div className={cx('modal-body-content-item')}>
                        <input value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                               type="password"
                               placeholder="Nhập lại mật khẩu" />
                    </div>
                </div>
                <div className={cx('modal-body-content-footer')}>
                    <button className={cx('btn-primary-m-user')}>Đăng Kí</button>
                </div>
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
                    <div className={cx('modal-body-content-item')}>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Tên đăng nhập" />
                    </div>
                    <div className={cx('modal-body-content-item')}>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Mật khẩu" />
                    </div>
                </div>
                <div className={cx('modal-body-content-footer')}>
                    <button className={cx('btn-primary-m-user')}>Đăng Nhập</button>
                </div>
                <div
                    style={{ textAlign: 'center', marginTop: '20px' }}
                    className={cx('modal-body-content-footer-login')}
                >
                    Bạn chưa có tài khoản?
                    <span
                        onClick={handleRegister}
                        style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                    >
                        Đăng kí tại đây
                    </span>
                </div>
            </Modal>
            <div ref={modalSearch} className={cx('modal-search')}>
                <div className={cx('modal-inp-container')}>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    );
}

export default Header;
