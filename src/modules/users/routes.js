import { Router } from "express";
import UsersController from "./users.js"
import protect from "../../middlewares/auth/protect.js"
import validate from "../../middlewares/validation/validate.js"
import { registerUser, updateUser } from "../../middlewares/validation/users.js";

const { GetUser, AddUser, UpdateUser, DeleteUser }  = UsersController


const UsersRouter = Router();


UsersRouter.get("/", protect, GetUser);
UsersRouter.post("/register", validate(registerUser), AddUser);
UsersRouter.put("/", protect, validate(updateUser), UpdateUser);
UsersRouter.delete("/deleteaccount", protect,  DeleteUser);


export default UsersRouter;