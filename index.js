import http from "http";
import app from "./src/server.js";
import dotenv from "dotenv";
dotenv.config()
 let arr = [1,2,3]
 let obj = {
    
 }
 console.log(typeof arr);

const server = http.createServer(app)
const port = process.env.PORT || 8080
server.listen(port, () => console.log("Listening port on " + port))
