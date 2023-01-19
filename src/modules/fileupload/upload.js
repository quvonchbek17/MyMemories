import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import model from "./model.js"
const __dirname = path.resolve();


export default class UsersController {

  static async GetFile(req, res, next) {
    try {
      const { name } = req.params;
      fs.readFile(path.join(__dirname, "/src/uploads/", name), (err, data) => {
        if (err) {
          res.status(200).json({
            success: false,
            message: "File not found !",
          });
        } else {
          res.sendFile(
            path.join(__dirname, "/src/uploads/", name),
            function (err) {
              if (err) {
                next(err);
              } else {
                next();
              }
            }
          );
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async Upload(req, res, next) {
    try {
      const { file } = req.files;
      const { user_id } = req.user;
      let size = ""
      if(file){
        Math.floor(file.size / (1024*1024)) > 0 ? size = (file.size / (1024*1024)).toFixed(2) + " MB": size = (file.size /1024).toFixed(2) + " KB"
      } else {
        res.status(400).json({
            success: false,
            message: "File yuklang !!"
          });
      }

      let fileName = v4() + "." + file.name.split(".").at(-1);
      const [createdFile] = await model.postFile(user_id, file.name, file.mimetype, size, "http://localhost:7000/api/v1/files/" + fileName);


      await file.mv(__dirname + "/src/uploads/" + fileName, (err) => {
        if (err) throw err;
      });

      res.status(200).json({
        success: true,
        data: {
          id: createdFile.file_id,
          filename: file.name,
          type: file.mimetype,
          size: size,
          url: "http://localhost:7000/api/v1/files/" + fileName
        }
      });

    } catch (error) {
      next(error);
    }
  }
};
