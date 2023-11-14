import HomeAdmin from '@/Pages/Admin/Home';
import Userlist from '@/Pages/Admin/User';
import Personnellist from '@/Pages/Admin/Personnel';
import Login from '@/Pages/Admin/Login';
import Voucher from '@/Pages/Admin/Voucher';
import Order from '@/Pages/Admin/Order';
import Product from '@/Pages/Admin/Product';
import Category from '@/Pages/Admin/Category';

//User
import HomeUser from '@/Pages/User/HomeUser';
import { DefaultLayoutUser } from '@/components/User/Layout';
import  CartUser from  '@/Pages/User/Cart'
import DetailProduct from '@/Pages/User/DetailProduct';
import Shop from '@/Pages/User/Shop';
import Profile from '@/Pages/User/Profile';
import ChangePass from '@/Pages/User/ChangePassword';
import OrderUser from '@/Pages/User/Order';
import DetailOrer from "@/Pages/User/DetailOrder";

const publicRoutes = [
    // Admin
    { path: '/admin', component: Login, layout: null },
    { path: '/admin/userlist', component: Userlist },
    { path: '/admin/personnel', component: Personnellist },
    { path: '/admin/voucher', component: Voucher },
    { path: '/admin/order', component: Order },
    { path: '/admin/product', component: Product },
    { path: '/admin/category', component: Category },
    //User
    { path: '/', component: HomeUser, layout: DefaultLayoutUser },
    { path: '/shop', component: Shop, layout: DefaultLayoutUser },
    { path: '/detailproduct', component: DetailProduct, layout: DefaultLayoutUser },
    { path: '/cart', component: CartUser, layout: DefaultLayoutUser },
    { path: '/profile', component: Profile, layout: DefaultLayoutUser },
    { path: '/changepassword', component: ChangePass, layout: DefaultLayoutUser },
    { path: '/order', component: OrderUser, layout: DefaultLayoutUser },
    { path: '/detailorder', component: DetailOrer, layout: DefaultLayoutUser }

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
