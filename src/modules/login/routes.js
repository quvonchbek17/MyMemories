import { Router } from "express";
import LoginController from "./login.js"
import protect from "../../middlewares/auth/protect.js"
const { Login }  = LoginController

const LoginRouter = Router();

LoginRouter.post("/",  Login);


export default LoginRouter;