import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);

//ATUALIZAR USUÁRIO PELO ID
router.patch("/users/:id", UserController.updateUser);

//ATUALIZAR USUÁRIO PELO BODY
router.patch("/usersbody", UserController.updateUserBody);

router.delete("/users/:id", UserController.deleteUser);
router.get("/users/:id", UserController.getUser);

export default router;
