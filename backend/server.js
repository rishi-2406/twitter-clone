import express from "express";
import authRoute from "./routes/auth.routes.js";
import connectdb from "./db/connectdb.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("server running on", PORT);
  connectdb();
});
