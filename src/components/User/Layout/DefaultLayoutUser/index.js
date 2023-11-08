import Header from './Header';
import Footer from './Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayoutUser.module.scss';
import { Children } from 'react';

function DefaultLayoutUser({ children }) {
    const cx = classNames.bind(styles);

    return (
        <div>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayoutUser;
