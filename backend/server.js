import express from "express";
import authRoute from "./routes/auth.routes.js";
import connectdb from "./db/connectdb.js";
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("server running on", PORT);
  connectdb();
});
