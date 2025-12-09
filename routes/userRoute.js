const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { auth, admin } = require("../middleware/auth");

//  PUBLIC ROUTES
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);


//  USER ROUTES (Login Required)

router.get("/getUserInfo", auth, userController.getUserInfo);
router.put("/updateUser/:ID", auth, userController.updateUser);
router.delete("/deleteUser/:ID", auth, userController.deleteUser);

//  ADMIN ROUTES (Admin Access)

router.get("/getAllUsers", auth, admin, userController.getUsers);
router.get("/getUser/:id", auth, admin, userController.getUserById);

router.put("/admin/updateUser/:id", auth, admin, userController.updateUserByAdmin);
router.delete("/admin/deleteUser/:id", auth, admin, userController.deleteUserByAdmin);

module.exports = router;
