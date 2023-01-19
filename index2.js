import http from "http";
import app from "./src/server.js";
import dotenv from "dotenv";
dotenv.config()

const server = http.createServer(app)
const port = process.env.PORT || 8080
server.listen(port, () => console.log("Listening port on " + port))
