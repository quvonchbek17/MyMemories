import { Router } from "express";
import MemoryController from "./memories.js"
import protect from "../../middlewares/auth/protect.js"
import validate from "../../middlewares/validation/validate.js"
import { postMemory, updateMemory } from "../../middlewares/validation/memories.js";

const { GetMemory, GetAllMemory, AddMemory, UpdateMemory, DeleteMemory }  = MemoryController


const MemoriesRouter = Router();


MemoriesRouter.get("/all", protect, GetAllMemory);
MemoriesRouter.get("/:id", protect, GetMemory);
MemoriesRouter.post("/", protect, validate(postMemory), AddMemory);
MemoriesRouter.put("/", protect, validate(updateMemory), UpdateMemory);
MemoriesRouter.delete("/:id", protect,  DeleteMemory);


export default MemoriesRouter;