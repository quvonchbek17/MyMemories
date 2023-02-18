import express from "express";
import cors from "cors";
import api from "./routes/index.js";
import fileUpload from "express-fileupload";
// import helmet from "helmet"

import rateLimit from "express-rate-limit";
import error_handler from "./utils/errorHandler.js";
import {errorMiddleware} from "./middlewares/custom_error/error.js";
import path from "path";
const __dirname = path.resolve();

const app = express()

// Cors middleware
app.use(cors({ origin: "*" }))

// Limiter

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 10000,
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// upload middleware
app.use(fileUpload({
  limits: { fileSize: 6 * 1024 * 1024 },
  abortOnLimit: true,
}))
app.use(errorMiddleware)

// Routes
app.use("/api/v1", api)
app.use(error_handler)


export default app;