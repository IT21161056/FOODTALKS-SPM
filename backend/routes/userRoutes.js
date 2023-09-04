const express = require("express");
const { authUser, authRole } = require("../auth/auth");
const router = express.Router();
const usersController = require("../controllers/userController");

router.route("/").post(usersController.createNewUser);
router.route("/login").post(usersController.loginUser);
router.route("/viewDetails").get(authUser, usersController.getSingleUser);
router.route("/").get(authUser, authRole, usersController.getAllUsers);
router.route("/:id").put(authUser, authRole, usersController.updateUser);
router.route("/:id").delete(authUser, authRole, usersController.deleteUser);

module.exports = router;
