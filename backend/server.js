import express from "express";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import postsRoute from "./routes/post.routes.js";
import notificationRoute from "./routes/notification.routes.js";
import connectdb from "./db/connectdb.js";
import path from "path";
import {v2} from "cloudinary"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT;
v2.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET 
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/notification", notificationRoute);

const distPath = path.resolve(__dirname, '../frontend/dist');

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  // Only serve index.html for non-API, non-static requests
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
    

app.listen(PORT, () => {
  console.log("server running on", PORT);
  connectdb();
});
