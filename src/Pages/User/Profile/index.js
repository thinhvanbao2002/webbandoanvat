import React, {useEffect, useRef, useState} from 'react';
import './Profile.scss'
import { getInfo, updateInfo, updateAvatar } from '@/services/UserServices';
import swal from 'sweetalert';
function Profile() {

    const fullnameContainerRef = useRef();
    const phoneRef = useRef();

    const [userID, setUserID] = useState('')
    const [userFullName, setUserFullName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [imageEncode, setImageEncode] = useState('');

    // Check format
    const [fullnameError,setFullnameError] = useState(false);
    const [phoneError,setPhoneError] = useState(false);
    const [addressError,setAddressError] = useState(false);
    // Check format

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        let res = await getInfo(localStorage.getItem("id"))
        .then(res => {
            setUserID(res.data.data._id)
            setUserFullName(res.data.data.fullName)
            setUserEmail(res.data.data.email);
            setUserAddress(res.data.data.address);
            setUserPhone(res.data.data.phone);
            setAvatar(res.data.data.avt);
        })
    }
    console.log(userID);
    console.log(avatar);
    const handleUpdateInfo = async () => {
        console.log("ab");
        let resp = await updateAvatar(userID,avatar)
        .then(res => {
        })
        .catch(err => {
        })
        let res = await updateInfo(userID,userFullName,userAddress,userPhone)
            .then(res => {
                swal("Cập nhật thành công");
                localStorage.setItem("address",userAddress)
                localStorage.setItem("phone",userPhone)
            })
            .catch(err => {
                swal("Cập nhật thất bại ");
            })
    }
    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageEncode(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    const blurFullName = () => {
        const fullNameRegex = /^[a-zA-Z\s.,!?áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]+$/;

        if (!fullNameRegex.test(userFullName) && userFullName != '') {
            setFullnameError(true);
            fullnameContainerRef.current.style.border = '1px solid red';
        } else {
            setFullnameError(false);
            fullnameContainerRef.current.style.border = '1px solid #f5f5f7';
        }
    }

    const blurPhone = () => {
        const numberOnlyRegex = /^[0-9]+$/;
        const maxDigits = 10;
        if (!numberOnlyRegex.test(userPhone) && userPhone != '' || userPhone.length != maxDigits) {
            setPhoneError(true);
            phoneRef.current.style.border = '1px solid red';
        } else {
            setPhoneError(false);
            phoneRef.current.style.border = '1px solid #f5f5f7';
        }
    } 
    return (
        <div className="wrapper-profile">
            <div className="profile-header">
                <h3>Hồ sơ cá nhân</h3>
            </div>
            <div className="profile-body">
                <div className="profile-body-image">
                    <div>
                        {imageEncode === '' ? <img src={"http://localhost:3001"+avatar} alt=""/> : <img src={imageEncode} alt=""/>}
                    </div>
                    <input onChange={handleChooseImage} type="file" name="file" id="file" className="inputfile" />
                    <label htmlFor="file">Tải ảnh <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg></label>
                </div>
                <div className="profile-body-info">
                    <div className="profile-email">
                        <h3>Email</h3>
                        <p>{userEmail}</p>
                    </div>
                    <div className="profile-fullname">
                        <h3>Tên</h3>
                        <div ref={fullnameContainerRef} >
                            <input onBlur={blurFullName} value={userFullName} onChange={e=> setUserFullName(e.target.value)} type="text" name="" id="" placeholder="Nhập họ tên"/>
                        </div>
                    </div>
                    {fullnameError === true ? <p style={{marginTop: '-35px', fontSize: '13px', marginLeft: '140px', color: 'red'}} >Họ tên của bạn không được chứa kí tự đặc biệt và số</p> : ''} 

                    <div className="profile-phone">
                        <h3>Số điện thoại</h3>
                        <div ref={phoneRef}>
                            <input onBlur={blurPhone} value={userPhone} onChange={e=> setUserPhone(e.target.value)} type="text" placeholder="Nhập số điện thoại"/>
                        </div>
                    </div>
                    {phoneError === true ? <p style={{marginTop: '-35px', fontSize: '13px', marginLeft: '140px', color: 'red'}} >Chỉ được nhập số và số điện thoại là 10 số</p> : ''} 
                    <div className="profile-phone">
                        <h3>Địa chỉ</h3>
                        <div>
                            <input value={userAddress} onChange={e=> setUserAddress(e.target.value)} type="text" placeholder="Nhập địa chỉ"/>
                        </div>
                    </div>
                    <div className="profile-btn-confirm">
                        <button onClick={handleUpdateInfo} >Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;