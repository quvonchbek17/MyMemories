import bcrypt from "bcrypt";

export const generateHash = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const compareHash = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}