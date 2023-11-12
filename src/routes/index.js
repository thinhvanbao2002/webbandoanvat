import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRoute.js";
import orderRouter from "./orderRouter.js";

const routes = (app) => {
    app.use('/api/admin', adminRouter);
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/order', orderRouter);
}

export default routes;