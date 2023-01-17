import { Router } from "express";
import UsersRouter from "../modules/users/routes.js";
import LoginRouter from "../modules/login/routes.js";
import UploadRouter from "../modules/fileupload/routes.js";

const router = Router()

router.use("/users", UsersRouter);
router.use("/login", LoginRouter);
router.use("/files", UploadRouter);

export default router;