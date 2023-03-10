import { Router } from "express";
import UsersController from "./users.js"
import FileUploadController from "../fileupload/upload.js"
import protect from "../../middlewares/auth/protect.js"
import validate from "../../middlewares/validation/validate.js"
import { registerUser, updateUser } from "../../middlewares/validation/users.js";


const { GetUser, AddUser, UpdateUser, DeleteUser }  = UsersController

const { DeleteFile } = FileUploadController


const UsersRouter = Router();


UsersRouter.get("/", protect, GetUser);
UsersRouter.post("/register",  AddUser);
UsersRouter.put("/", protect,  UpdateUser);
UsersRouter.delete("/deleteaccount", protect,  DeleteUser, DeleteFile);


export default UsersRouter;