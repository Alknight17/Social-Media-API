const router = require("express").Router();

// requirements
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);
// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
