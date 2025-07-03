import notificationModel from "../models/notification.model.js";
import User from "../models/user.model.js";
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
    const postToBeDeleted = await Post.findById(req.params.id);

    if (!postToBeDeleted) {
      return res.status(500).json({ error: "Post doesnt exist" });
    }

    if (postToBeDeleted.user.toString() !== req.user._id.toString()) {
      return res
        .status(500)
        .json({ error: "You are not authoriszed to delete this post" });
    }

    if (postToBeDeleted.img) {
      await v2.uploader.destroy(
        postToBeDeleted.img.split("/").pop().split(".")[0]
      );
    }

    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      return res
        .status(200)
        .json({ message: "Post deleted successfully", deletedPost });
    } else {
      return res.status(500).json({ error: "Post not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, in: "delete post controller" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    const postToUpdate = await Post.findById(postId);

    if (!postToUpdate) {
      return res.status(500).json({ error: "Post doesnt exist" });
    }

    const newComment = {
      text,
      user: req.user._id,
    };

    postToUpdate.comments.push(newComment);
    await postToUpdate.save();

    return res
      .status(201)
      .json({ message: "Comment created successfully", newComment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while making comment", e: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const postToUpdate = await Post.findById(postId);

    if (!postToUpdate) {
      return res.status(500).json({ error: "Post doesnt exist" });
    }

    if (req.user._id.toString() === postToUpdate.user.toString()) {
      return res.status(500).json({ error: "Cant like your own post" });
    }

    let message = "Liked Successfully";

    if (postToUpdate.likes.includes(req.user._id.toString())) {
      postToUpdate.likes = postToUpdate.likes.filter(
        (userLiked) => userLiked.toString() !== req.user._id.toString()
      );
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { likedPosts: postId } }
      );
      message = "Unliked Successfully";
    } else {
      postToUpdate.likes.push(req.user._id);
      await User.updateOne(
        { _id: req.user._id },
        { $push: { likedPosts: postId } }
      );
    }

    await postToUpdate.save();
    const newNotification = new notificationModel({
      from: req.user._id,
      to: postToUpdate.user,
      type: "like",
      read: false,
    });

    newNotification.save();

    return res.status(201).json({ message });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while liking", e: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const postList = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    if (postList.length === 0) return res.status(200).json([]);
    return res.status(200).json(postList);
  } catch {
    return res.status(500).json({ error: "Couldnt fecth the posts" });
  }
};

export const getAllLikedBy = async (req, res) => {
  try {
    const likedList = await Post.find({ _id: { $in: req.user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.status(200).json({ likedList });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Cant fetch all liked posts", e: error.message });
  }
};

export const getFollowedPosts = async (req, res) => {
  try {
    const postList = await Post.find({ user: { $in: req.user.following } }).sort({createdAt : -1})
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return res.status(200).json({ postList });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Cant fetch all followed posts", e: error.message });
  }
};

export const getUserPost = async (req, res) => {
    try {
        const user = await User.findOne({username : req.params.username})
        // console.log(user);
        if(!user) return res.status(500).json({error : "Couldnt find that user"})
        const userId = user._id;
        const postList = await Post.find({user : userId}).sort({createdAt : -1})
        .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
      console.log(postList);
        return res.status(200).json(postList);
    } catch (error) {
        return res.status(500).json({error : "Couldnt fetch user posts"})
    }
}