import ErrorHandler from "../../utils/errorHandler.js";

export const errorMiddleware = (req, res, next) => {
    res.error = ErrorHandler;
    next()
}