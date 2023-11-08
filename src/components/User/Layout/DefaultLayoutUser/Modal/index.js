import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

function Modal({ children }, ref) {
    const cx = classNames.bind(styles);
    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
        openModal() {
            modalRef.current.style.display = 'flex';
        },
        closeModal() {
            modalRef.current.style.display = 'none';
        },
    }));

    const handleClose = () => {
        modalRef.current.style.display = 'none';
    };

    return (
        <div ref={modalRef} className={cx('modal-register')}>
            <div className={cx('modal-overlay')}></div>
            <div className={cx('modal-body')}>{children}</div>
        </div>
    );
}

export default forwardRef(Modal);
