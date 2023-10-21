import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";

const routes = (app) => {
    app.use('/api/admin', adminRouter);
    app.use('/api/user', userRouter);
}

export default routes;