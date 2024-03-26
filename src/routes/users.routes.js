const {Router} = require("express");
const UserController = require("../controllers/UserController");
const checkUserExists = require("../middlewares/checkUserExists");

const userRoutes = Router();
const userController = new UserController

//-----------------------------------------------------------------------//

userRoutes.post("/users", userController.createUser)

userRoutes.get("/users", userController.listUser);

userRoutes.get("/users/:user_id", checkUserExists, userController.listUserById);

userRoutes.put("/users/:user_id", checkUserExists, userController.updateUser);

userRoutes.patch("/users/admin/:user_id", checkUserExists, userController.updateUserAdmin);

userRoutes.delete("/users/:user_id", checkUserExists, userController.deleteUser);

//--------------------------------------------------------------------------//

module.exports = userRoutes