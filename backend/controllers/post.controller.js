import Post from "../models/post.model.js";
import { v2 } from "cloudinary";

export const createPost = async (req, res) => {
  let { text, img } = req.body;
  if (!img && !text) {
    return res
      .status(500)
      .json({ error: "Please incldude either a text or an image" });
  }

  const newPost = new Post({
    user: req.user._id,
    text,
    img,
  });

  if (img) {
    const imgURL = await v2.uploader.upload(img);
    newPost.img = imgURL.secure_url;
  }

  try {
    const newmade = await newPost.save();
    return res.status(201).json({ newmade });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Couldnt create post", errmsg: error.message });
  }
};

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(deletedPost) {
            return res.status(200).json({message : "Post deleted successfully", deletedPost})
        } else {
            return res.status(500).json({error : "Post not found"});
        }

    } catch (error) {
        return res.status(500).json({error : error.message, in : "delete post controller"})
    }
}

