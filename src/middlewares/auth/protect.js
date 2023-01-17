import { verify } from "jsonwebtoken"
import protectModel from "./model.js"
const model = new protectModel

const protect = async(req, res, next) => {
  try {

    let authToken = ""

    const token = req.headers.authorization

    if (token && token.startsWith("Token ")) {
      authToken = token.split(" ")[1];
    }
    if (!authToken){
      res.status(401).json({
        success: false,
        message: "Foydalanish uchun tizimga kiring !"
      })
    }

    const decodedToken = verify(authToken, process.env.SECRET_KEY);

    if (!decodedToken){
      res.status(400).json({
        success: false,
        message: "Tokenda muammo bor !"
      })
    }

    const user = await model.userById(decodedToken)

    if (!user.length > 0){
      res.status(404).json({
        success: false,
        message: "User topilmadi !"
      })
    }

    req.user = user[0];

    next()

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Tokenda muammo yoki xatolik, Iltimos tokenni yangilang yoki tizimga qaytadan kiring !!!"
    })
    return
  }
}

export default protect;
