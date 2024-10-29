import express from "express";
import {createUser, getAllUser, getUser,deleteUser, updateUser} from "../controllers/user.controller.js"


const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-users", getAllUser);
router.get("/get-single/:userId", getUser);
router.put("/edit-user/:userId", updateUser);
router.delete("/delete-user/:userId", deleteUser);

export default router;