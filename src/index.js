import Express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

routes(app);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is runing on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Can't connecting to MongoDB: ", error.message);
    })