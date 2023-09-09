const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");

router.route("/").post(usersController.createNewUser);
router.route("/login").post(usersController.loginUser);
router.route("/viewDetails").get(usersController.getSingleUser);
router.route("/").get(usersController.getAllUsers);
router.route("/:id").put(usersController.updateUser);
router.route("/:id").delete(usersController.deleteUser);

module.exports = router; //f
