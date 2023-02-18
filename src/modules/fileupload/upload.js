import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import model from "./model.js";
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

  static async GetAllPlaylist(req, res, next) {
    try {
      const { user_id } = req.user

      let playlists = await model.getPlaylist(user_id);

      if(playlists.length > 0){
        playlists = playlists.map(el => {
          return {
            id: el.file_id,
            filename: el.file_name,
            type: el.file_type,
            size: el.file_size,
            url: el.file_url
          }
        })

        res.status(200).json({
          success: true,
          data: playlists
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Ma'lumot topilmadi",
          data: playlists
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async Upload(req, res, next) {
    try {
      const { file } = req.files;
      const { user_id } = req.user;
      
      const playlist = req.url.split("/").at(-1) === "playlist" ? true : false
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
      const [createdFile] = await model.postFile(user_id, file.name, file.mimetype, size, fileName, "https:/api.mymemories.uz/api/v1/files/" + fileName, playlist);


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
          url: "https:/api.mymemories.uz/api/v1/files/" + fileName
        }
      });

    } catch (error) {
      next(error);
    }
  }

  static async DeleteFile(req, res, next) {
    try {
      const mediaNames = req.mediaNames;

      await mediaNames?.filter(name => name).map(name => {
        fs.unlink(__dirname + "/src/uploads/" + name, (err) => {
          if (err) {
              throw err;
          }
      });
      })

      res.status(200).json({
        success: true,
        message: "O'chirildi",
      });

      next();
    } catch (error) {
      next(error);
    }
  }

  static async DeleteFileDb(req, res, next) {
    try {
      const { id } = req.params
      const { user_id } = req.user
       const [file] = await model.getAllFileByID(id, user_id)
       if(!file){
        res.status(404).json({
          success: false,
          message: "File topilmadi"
        });
        return
       }
       await model.deleteFile(id)
       req.mediaNames = [file?.upload_name]

       next();
    } catch (error) {
      next(error);
    }
  }
};
