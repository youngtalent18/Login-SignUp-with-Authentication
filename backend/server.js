import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser"

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ 
    origin: "http://localhost:5174",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);

connectDB().then(()=>{
    app.listen(port, () => {
        console.log("Server is running on port", port);
    });
});
