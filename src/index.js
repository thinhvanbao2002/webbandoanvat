import Express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes/index.js";
import auth from "../src/authentication/index.js"

const app = Express();
const PORT = process.env.PORT || 3001;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(auth);

routes(app);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is runing on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Can't connecting to MongoDB: ", error.message);
    })

