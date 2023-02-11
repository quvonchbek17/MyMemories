import { Router } from "express";
import MemoryController from "./memories.js";
import FileUploadController from "../fileupload/upload.js"
import protect from "../../middlewares/auth/protect.js"
import validate from "../../middlewares/validation/validate.js"
import { postMemory, updateMemory } from "../../middlewares/validation/memories.js";

const { GetMemory, GetAllMemory, GetAllLikes, GetAllDislikes, AddMemory, UpdateMemory, DeleteMemory }  = MemoryController

const { DeleteFile } = FileUploadController


const MemoriesRouter = Router();


MemoriesRouter.get("/all", protect, GetAllMemory);
MemoriesRouter.get("/likes", protect, GetAllLikes);
MemoriesRouter.get("/dislikes", protect, GetAllDislikes);
MemoriesRouter.get("/:id", protect, GetMemory);
MemoriesRouter.post("/", protect, validate(postMemory), AddMemory);
MemoriesRouter.put("/", protect, validate(updateMemory), UpdateMemory);
MemoriesRouter.delete("/:id", protect,  DeleteMemory, DeleteFile);


export default MemoriesRouter;