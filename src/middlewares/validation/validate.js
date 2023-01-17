const validate = (schema, typeSchema = "body") => {

    return async (req, res, next) => {
      try {
        
        const validated = await schema.validateAsync(req[typeSchema]);

        req[typeSchema] = validated;

        next();

      } catch (error) {
        next(error);
      }
    }

  };

export default validate