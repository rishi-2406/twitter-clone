import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notificationList = await Notification.find({ to: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username profileImg",
      });

    await Notification.updateMany({ to: req.user._id }, { read: true });

    res.status(200).json(notificationList);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Couldnt fetch all the notifications" });
  }
};

export const deleteNotificaiton = async (req, res) => {
  const userID = req.user._id;

  try {
    await Notification.deleteMany({ to: userID });
    return res.status(201).json({message : "Deleted notifications successfully"})
  } catch (error) {
    res.status(500).json({error : "Error while deleting notifications"})
  }
};
