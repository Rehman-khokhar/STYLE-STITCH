import { comparePassword, hashPassword } from "../Helper/auth.helper.js";
import userModle from "../Models/user.js";
import jsonwebtoken from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;
    // velidation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phoneNumber is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    // check user
    const existingUser = await userModle.findOne({ email });
    // existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: " Already register , please login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModle({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//   login user || post req

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // velidation
    if ((!email, !password)) {
      return res.status(404).send({
        success: false,
        message: "Email or password is Incorrect",
      });
    }
    // check user
    const user = await userModle.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }
    // token
    const token = await jsonwebtoken.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).send({
      success: true,
      message: "Login succcesfully",
      user: {
        user: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
//
// for test route

export const testController = (req, res) => {
  res.send("protected route");
};
