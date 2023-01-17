import { sign, verify } from "../../utils/jwt.js";
import model from "./model.js";


export default class LoginController {
  static async Login(req, res, next) {
    try {
      const { username, password } = req.body;
      const [user] = await model.selectedUser(username, password);

      const remoteIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const device = req.headers["user-agent"];


      if (user) {

        model.postSessions(user?.user_id, username, password, remoteIp, device)

        let Token = sign(user.user_id);
        res.status(200).json({
          success: true,
          message: "Muvaffaqiyatli kirildi !",
          data: {
            id: user.user_id,
            name: user.user_name,
            username: user.user_username,
            email: user.user_email
          },
          token: Token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Login yoki parol xato kiritildi !",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
