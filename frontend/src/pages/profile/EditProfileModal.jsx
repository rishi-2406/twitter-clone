import { useQueryClient, useMutation } from "@tanstack/react-query";
import { use, useState } from "react";
import toast from "react-hot-toast";

const EditProfileModal = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (formData) => {
      try {
        const response = await fetch("/api/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
		const data = await response.json();
        if (!response.ok) {
          throw new Error( data.error ||  "Failed to update profile");
        }
        return data;
      } catch (error) {
        console.error("Error updating profile:", error.message);
		throw new Error(error.message || "Failed to update profile");
      }
    },
	onSuccess: (data) => {
		queryClient.invalidateQueries(["authUser"]);
		queryClient.invalidateQueries(["userProfile"]);
		document.getElementById("edit_profile_modal").close()
	},
	onError: (error) => {
	  toast.error(error.message || "Failed to update profile");
	}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdating) return;
	if(formData.newPassword && formData.newPassword.length < 6) {
		toast.error("New password must be at least 6 characters long.");
	}
    if (
      !formData.fullname &&
      !formData.username &&
      !formData.email &&
      !formData.bio &&
      !formData.link &&
      (!formData.newPassword || !formData.currentPassword)
    ) {
      toast.error("Please fill in some required fields.");
      return;
    }
    toast.promise(
      updateProfile(formData),
      {
        loading: "Updating profile...",
        success: "Profile updated successfully!",
      }
    );
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.fullname}
                name="fullname"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary rounded-full btn-sm text-white">
              Update
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};
export default EditProfileModal;
