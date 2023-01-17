const error_handler = (err, req, res, next) => {

    const error = {
        message: err.message || err.details[0].message || "Something went wrong!",
        success: false
      }


      res.status(err.statusCode || 500).send(error)
  }

export default error_handler;