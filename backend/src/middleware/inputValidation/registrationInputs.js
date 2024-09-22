import httpStatus from 'http-status';
import Joi from 'joi';


const registrationInputs = (req, res, next) => {

    const userGivenData = req.body;

   
    const schema = Joi.object({
        email: Joi.string().trim(true).email().required(),
        name: Joi.string().trim(true).min(2).max(40).required(),
        userName: Joi.string().trim(true).min(2).max(40).required(),
        password: Joi.string().trim(true).min(6).max(40).required(),
    });


    const { error } = schema.validate(userGivenData);


    if (error) {
        return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "Bad request", error })
    }

    
    next(); // if all OK ==> then go to registration process
}

export default registrationInputs;