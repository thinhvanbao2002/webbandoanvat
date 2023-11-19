import { useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const mySidebar = useRef(null);
    const myHeader = useRef(null);
    const myContainer = useRef(null);
    const wrapperHeader = useRef(null);
    const myContent = useRef(null);

    const handleClick = () => {
        wrapperHeader.current.style.marginLeft = '0';
        mySidebar.current.style.display = 'none';
        myHeader.current.myRefIcon.current.style.display = 'block';
        myContent.current.style.fontSize = '16px';
    };

    const handleHeaderClick = () => {
        // myContainer.current.style.marginLeft = '270px';
        wrapperHeader.current.style.marginLeft = '270px';
        mySidebar.current.style.display = 'block';
        myHeader.current.myRefIcon.current.style.display = 'none';
        // myContent.current.style.fontSize = '13px';
    };

    return (
        <div className={cx('wrapper')}>
            <div ref={mySidebar} className={cx('sidebar')}>
                <Sidebar onClick={handleClick} />
            </div>
            <div ref={myContainer} className={cx('container')}>
                <div ref={wrapperHeader} className={cx('header')}>
                    <Header ref={myHeader} onClick={handleHeaderClick} />
                </div>
                <div ref={myContent} className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
