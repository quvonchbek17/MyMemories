import model from "./model.js";



export default class UsersController {

  static async GetUser(req, res, next) {
    try {
       const { user_id } = req.user;
       const [user] = await model.getUserById(user_id)

       if(user){
            res.status(200).json({
            success: true,
            data: {
                id: user.user_id,
                name: user.user_name,
                username: user.username,
                email: user.user_email
            }
            })
        } else {
            res.status(200).json({
            success: false,
            message: "Ma'lumot topilmadi !!",
            data: null
            })
        }
    } catch (error) {
        next(error);
    }
  }

  static async AddUser(req, res, next) {
    try {

       const { name, username, password, email } = req.body;
       const created = await model.registerUser(name, username, password, email)

       if(created){
            res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli ro'yhatdan o'tdingiz !!!"
            })
        } else {
            res.status(409).json({
            success: false,
            message: "Bu username yoki email avval ro'yhatdan o'tgan !!!"
            })
        }
    } catch (error) {
        next(error);
    }
  }

  static async UpdateUser(req, res, next) {
    try {
        const { name, username, password, email} = req.body
        const { user_id } =  req.user;

        const Data = await model.getUserById(user_id);
        const oldData = Data[0];
        if (!oldData) {
            res.status(200).json({
            success: false,
            message: "Foydalanuvchi topilmadi !"
            });
            return;
        }
        const Name = name ? name : oldData.user_name;
        const UserName = username ? username : oldData.user_username;
        const Password = password ? password : oldData.user_password;
        const Email = email ? email : oldData.user_email;
        await model.updateUser(Name, UserName, Password, Email, user_id);

        res.status(200).json({
            success:true,
            message: "Ma'lumotlar yangilandi !"
        });
    } catch (error) {
        next(error);
    }
  }
    static async DeleteUser(req, res, next) {
        try {

            const { user_id } =  req.user;

            const Data = await model.getUserById(user_id);
            const oldData = Data[0];
            if (!oldData) {
                res.status(200).json({
                success: false,
                message: "Foydalanuvchi topilmadi !"
                });
                return;
            } else {
                await model.deleteUser(user_id)

                res.status(200).json({
                success:true,
                message: "Akkauntingiz o'chirildi ! Qayta tiklash uchun adminga murojaat qiling !!"
                });
            }


        } catch (error) {
            next(error);
        }
    }
}  
