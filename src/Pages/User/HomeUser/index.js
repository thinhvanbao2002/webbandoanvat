import classNames from 'classnames/bind';
import './HomeUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function HomeUser() {

    return (
       <div className="wrapper-home">
           <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
               <div className="carousel-inner">
                   <div className="carousel-item active" data-bs-interval="10000">
                       <img src="https://down-bs-vn.img.susercontent.com/vn-11134210-7qukw-lf84ok3uxnref2.webp" className="d-block w-100" alt="..."/>
                   </div>
                   <div className="carousel-item" data-bs-interval="2000">
                       <img src="https://down-bs-vn.img.susercontent.com/vn-11134210-7qukw-lf6ntqyu22xj1e.webp" className="d-block w-100" alt="..."/>
                   </div>
               </div>
               <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span className="visually-hidden">Previous</span>
               </button>
               <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Next</span>
               </button>
           </div>
           <div className="home-category">
               
           </div>
       </div>
    );
}

export default HomeUser;
