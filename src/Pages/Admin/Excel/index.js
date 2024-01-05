import React from 'react'
import { exportExcel } from '../../../services/AdminServices'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';

export default function Excel(keyword) {

    const navigate = useNavigate();
    console.log(keyword.keyword);

    const handleExportExcel = () => {
        try {
            let res = exportExcel(keyword.keyword)
            if(res) {
                swal.fire({
                    title: 'Thành công!',
                    text: 'Xuất thông tin ra excel thành công!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#ff0000',
                });
                window.location.href = `http://localhost:3001/api/${keyword.keyword}/export`;
            }else{
                alert('That bai');
            }
        } catch (error) {
            
        }
    }

    return (
        <>
            <button
                onClick={handleExportExcel}
                className='btn-export-excel'
                style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '12px',
                    background: '#33CC33',
                    marginRight: '20px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><path fill='#fff' d="M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"/></svg>
            </button>
        </>
    )
}
