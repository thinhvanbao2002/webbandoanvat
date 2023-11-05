import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";
import productRoute from "./productRoute.js";

const routes = (app) => {
    app.use('/api/admin', adminRouter);
    app.use('/api/user', userRouter);
    app.use('/api/product', productRoute);
}

export default routes;