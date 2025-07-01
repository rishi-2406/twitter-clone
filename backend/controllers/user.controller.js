import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (user) {
      res.status(200).json(user);
    } else return res.status(500).json({ error: error.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.findById(req.user._id);
  const followeduser = await User.findById(id);

  if (id == req.user._id)
    return res.status(500).json({ error: "Cant follow yourself" });
  if (!currentUser || !followeduser)
    return res.status(500).json({ error: "User doesnt exist" });

  try {
    if (currentUser.following.includes(id)) {
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { following: id },
      });
      res.status(201).json({ message: "Unfollowed user successfully" });
    } else {
      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { following: id },
      });
      res.status(201).json({ message: "Followed user successfully" });
    }

    const newNotification = new Notification({
      from: req.user._id,
      to: id,
      type: "follow",
    });

    await newNotification.save();
  } catch (e) {
    res.status(500).json({ error: `Cannot follow user : ${e.message}` });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const currentuserId = req.user._id;
    const followingUsers = await User.findById(currentuserId).select(
      "following"
    );
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: currentuserId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    console.log(followingUsers);
    const filterdUserList = users.filter((user) => !followingUsers.following.includes(user._id.toString()))
    const suggestedUsers = filterdUserList.slice(0,4);

    suggestedUsers.map((eachUser) => eachUser.password = null);

    res.status(200).json(suggestedUsers);

  } catch (e) {
    res.status(500).json({error : e.message})
  }
}; 
