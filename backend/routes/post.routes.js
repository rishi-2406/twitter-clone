import express from "express"
import Post from "../models/post.model.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { createPost, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', protectRoute ,  createPost);
router.delete('/delete/:id', protectRoute ,  deletePost);
// router.post('/like/:id', protectRoute ,  likePost);
// router.post('/comment/:id', protectRoute ,  commentPost);


export default router;