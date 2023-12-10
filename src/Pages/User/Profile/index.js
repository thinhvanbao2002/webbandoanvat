import React, {useEffect, useState} from 'react';
import './Profile.scss'
import { updateInfo } from '@/services/UserServices';
import swal from 'sweetalert';
function Profile() {
    const [userID, setUserID] = useState('')
    const [userFullName, setUserFullName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');


    useEffect(() => {
        setUserID(localStorage.getItem("id"));
        setUserEmail(localStorage.getItem("email"));
        setUserAddress(localStorage.getItem("address"));
        setUserPhone(localStorage.getItem("phone"));
        setUserFullName(localStorage.getItem("fullname"));
    }, []);



    const handleUpdateInfo = async () => {
        let res = await updateInfo(userID,userFullName,userAddress,userPhone)
            .then(res => {
                swal("Cập nhật thành công");
            })
            .catch(err => {
                swal("Cập nhật thất bại ");
            })
    }

    return (
        <div className="wrapper-profile">
            <div className="profile-header">
                <h3>Hồ sơ cá nhân</h3>
            </div>
            <div className="profile-body">
                <div className="profile-body-image">
                    <div>
                        <img src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" alt=""/>
                    </div>
                    <input type="file" name="file" id="file" className="inputfile" />
                    <label htmlFor="file">Tải ảnh <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg></label>
                </div>
                <div className="profile-body-info">
                    <div className="profile-email">
                        <h3>Email</h3>
                        <p>{userEmail}</p>
                    </div>
                    <div className="profile-fullname">
                        <h3>Tên</h3>
                        <div>
                            <input value={userFullName} onChange={e=> setUserFullName(e.target.value)} type="text" name="" id="" placeholder="Nhập họ tên"/>
                        </div>
                    </div>
                    <div className="profile-phone">
                        <h3>Số điện thoại</h3>
                        <div>
                            <input value={userPhone} onChange={e=> setUserPhone(e.target.value)} type="text" placeholder="Nhập số điện thoại"/>
                        </div>
                    </div>
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