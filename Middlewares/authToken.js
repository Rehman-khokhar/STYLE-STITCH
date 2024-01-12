import JWT from "jsonwebtoken";
import userModle from "../Models/userModle.js";

// protected router base
export const requireSignIn = async (req, res, next) => {
  try {
    const dCode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = dCode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//  admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModle.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(404).send({
        success: false,
        message: "UnAuthorizes Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin access authtoken",
    });
  }
};
