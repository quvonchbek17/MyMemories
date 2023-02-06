import model from "./model.js";
import uploadModel from "../fileupload/model.js";
import { log } from "console";

export default class MemoryController {
  static async GetMemory(req, res, next) {
    try {
      const { id } = req.params;
      const [memory] = await model.getMemoryById(id);

      if (memory) {
        let mediaIds = JSON.parse(memory.memory_media);
        let media = [];

        if (typeof mediaIds === "object") {
          media = await Promise.all(
            mediaIds?.map(async (el) => {
              try{
                let [file] = await uploadModel.getFileByID(el);
                return {
                  id: file.file_id,
                  filename: file.file_name,
                  type: file.file_type,
                  size: file.file_size,
                  url: file.file_url,
                };
              } catch {
                return null
              }
            })
          );
        } else {
          let [file] = await uploadModel.getFileByID(mediaIds);
          media.push({
            id: file.file_id,
            filename: file.file_name,
            type: file.file_type,
            size: file.file_size,
            url: file.file_url,
          });
        }

        res.status(200).json({
          success: true,
          data: {
            id: memory.memory_id,
            title: memory.memory_title,
            desc: memory.memory_desc,
            created_at: memory.created_at,
            files: media,
          },
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Ma'lumot topilmadi !!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async GetAllMemory(req, res, next) {
    try {
      const { user_id } = req?.user;
      let memories = await model.getAllMemory(user_id);

      if (memories.length > 0) {
        memories = await Promise.all(memories.map(async (memory) => {
            let mediaIds = JSON.parse(memory.memory_media);
            let media = [];

            if (typeof mediaIds === "object") {
              media = await Promise.all(
                mediaIds?.map(async (el) => {
                  try {
                    let [file] = await uploadModel.getFileByID(el);
                    return {
                    id: file.file_id,
                    filename: file.file_name,
                    type: file.file_type,
                    size: file.file_size,
                    url: file.file_url,
                  };
                  } catch {
                    return null
                  }
                })
              );
            } else {
              let [file] = await uploadModel.getFileByID(mediaIds);
              media.push({
                id: file.file_id,
                filename: file.file_name,
                type: file.file_type,
                size: file.file_size,
                url: file.file_url,
              });
            }

            return {
              id: memory.memory_id,
              title: memory.memory_title,
              desc: memory.memory_desc,
              created_at: memory.created_at,
              files: media,
            };
        }))

        res.status(200).json({
            success: true,
            data: memories
          });

      } else {
        res.status(200).json({
          success: false,
          message: "Ma'lumot topilmadi !!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async AddMemory(req, res, next) {
    try {
      const { user_id } = req.user;
      const { title, desc, media } = req.body;
      const created = await model.postMemory(
        user_id,
        title,
        desc,
        JSON.stringify(media)
      );

      if (created) {
        res.status(200).json({
          success: true,
          message: "Muvaffaqiyatli qo'shildi !!!",
        });
      } else {
        res.status(409).json({
          success: false,
          message: "Bu ma'lumotlarni avval saqlagansiz !!!",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async UpdateMemory(req, res, next) {
    try {
      const { id, title, desc, media } = req.body;
      const { user_id } = req?.user;
      const Data = await model.getMemoryById(id, user_id);
      const oldData = Data[0];
      log(req.user)
      log(oldData)

      if (oldData?.user_id != user_id) {
        res.status(401).json({
          success: false,
          message:
            "Bu idlik ma'lumot sizga tegishli emas. Uning ma'lumotlarini o'zgartirolmaysiz !",
        });
        return;
      }

      if (!oldData) {
        res.status(200).json({
          success: false,
          message: "Ma'lumot topilmadi !",
        });
        return;
      }
      const Title = title ? title : oldData.memory_title;
      const Desc = desc ? desc : oldData.memory_desc;
      const Media = media ? JSON.stringify(media) : oldData.memory_media;
      await model.updateMemory(Title, Desc, Media, id);

      res.status(200).json({
        success: true,
        message: "Ma'lumotlar yangilandi !",
      });
    } catch (error) {
      next(error);
    }
  }
  static async DeleteMemory(req, res, next) {
    try {
      const { user_id } = req.user;
      const { id } = req.params;


      const Data = await model.getMemoryById(id, user_id);
      const oldData = Data[0];


      if (!oldData) {
        res.status(401).json({
          success: false,
          message: "Bu idlik ma'lumot sizga tegishli emas yoki u avval o'chirilgan. Uni o'chirolmaysiz !",
        });
        return;
      } else {
        await model.deleteMemory(id);

        res.status(200).json({
          success: true,
          message: "Ma'lumot o'chirildi",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
