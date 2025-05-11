import User from "../../model/userSchema.js"
import asyncHandler from 'express-async-handler';

// @desc    Block a user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const blockUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('Cannot block admin user');
  }

  user.isBlocked = true;
  await user.save();

  res.json({ message: 'User blocked successfully' });
});

// @desc    Unblock a user
// @route   PUT /api/admin/users/:id/unblock
// @access  Private/Admin
const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.isBlocked = false;
  await user.save();

  res.json({ message: 'User unblocked successfully' });
});

// @desc    Get all blocked users
// @route   GET /api/admin/users/blocked
// @access  Private/Admin
const getBlockedUsers = asyncHandler(async (req, res) => {
  const blockedUsers = await User.find({ isBlocked: true }).select('-password');
  res.json(blockedUsers);
});

export { blockUser, unblockUser, getBlockedUsers };