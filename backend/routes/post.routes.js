import express from "express"
import Post from "../models/post.model.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { createPost, deletePost, commentPost, likePost, getAllPost, getAllLikedBy } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', protectRoute ,  createPost);
router.delete('/delete/:id', protectRoute ,  deletePost);
router.post('/like/:id', protectRoute ,  likePost);
router.post('/comment/:id', protectRoute ,  commentPost);
router.get('/all', protectRoute ,getAllPost)
router.get('/likes/:id' , protectRoute ,getAllLikedBy)

export default router;