// import upload from "../../middleware/imageupload.js";

import User from "../../model/userSchema.js";

// Controller to update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
      // Use multer middleware to handle the file upload (field name: 'profileimg')
    //   console.log(err);
      

      // Check if a file was uploaded
      if (!req.file.path) {
        return res.status(400).json({ message: "No file uploaded!" });
      }

      // Get the user ID (assuming you have authentication middleware that adds user ID to req.user)
      const userId = req.user?.id; // Adjust based on your auth setup, e.g., JWT or session

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized! Please log in." });
      }

      // Find the user and update the profileimg field with the file path
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileimg: req.file.path },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Return success response
      res.status(200).json({
        message: "Profile picture updated successfully!",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profileimg: updatedUser.profileimg,
        },
      });
    // });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};