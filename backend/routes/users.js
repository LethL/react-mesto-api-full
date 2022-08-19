const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { avatarValidation, userIdValidation, userInfoValidation } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', userIdValidation, getUserById);

router.patch('/users/me', userInfoValidation, updateUserInfo);

router.patch('/users/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
