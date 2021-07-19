const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//check if user is authenticated or not

exports.isAuthenticatedUser = async(req, res, next) =>{

    const { token } = req.cookies;
    // console.log(token);

    if(!token){
        return res.status(401).json({
            message: "Login First to access this resource"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    next();
}

//handling user roles
exports.authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(
                res.status(403).json({
                    message: `Role ${req.user.role} is not allowed to access this resource`
                })
            );
        }
        next();
    }
}