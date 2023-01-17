import { Router } from "express";
import FileUploadController from "./upload.js"
import protect from "../../middlewares/auth/protect.js"
const { Upload, GetFile }  = FileUploadController


const UploadRouter = Router();

UploadRouter.get("/:name", GetFile);
UploadRouter.post("/", protect, Upload);


export default UploadRouter;