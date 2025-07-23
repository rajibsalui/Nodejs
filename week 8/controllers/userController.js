
import UserSchema from "../models/users.js";

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private 

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserSchema.findById(userId).select('-password -__v');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

