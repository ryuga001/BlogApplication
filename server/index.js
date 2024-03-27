import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import BlogRoute from "./routes/blog.js";
import UserRoute from "./routes/user.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use('/auth', UserRoute);
app.use('/blog', BlogRoute);
// app.use(express.static(path.join(__dirname, './public')))

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log("Database is Connented");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT ${PORT}`)
})