import { Router } from "express";
import FileUploadController from "./upload.js"
import protect from "../../middlewares/auth/protect.js"
const { Upload, GetFile, GetAllPlaylist, DeleteFileDb, DeleteFile}  = FileUploadController


const UploadRouter = Router();

UploadRouter.get("/playlist", protect, GetAllPlaylist);
UploadRouter.get("/:name", GetFile);
UploadRouter.post("/", protect, Upload);
UploadRouter.post("/playlist", protect, Upload);
UploadRouter.delete("/:id", protect, DeleteFileDb, DeleteFile);


export default UploadRouter;