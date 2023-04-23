const jwt = require("jsonwebtoken");
const {HttpError} = require("../helpers/HttpError");
const {SECRET_KEY} = require("../secret");
const {User} = require("../models/user");

const authenticate = async (req,res,next) => {
    const {authorization= ""} = req.headers;
    console.log(authorization);
    const [bearer,token] = authorization.split(" ");
      
    if(bearer !== "Bearer") {
        next(HttpError(401,"Not authorization"));
    }

    try {
        const {id} = jwt.verify(token,SECRET_KEY);
        const user = await User.findById(id);

        if(!user || !user.token ) {
            throw HttpError(401,"Not authorization")
        } else{
            req.user = user;
            next()
        }
    } catch {
        next(HttpError(401,"Not authorization"));
    }
}

module.exports = authenticate;