const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (userPresent) {
      return res.send({
        message: "User already exixts, Please login",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 4);
      const newUser = new userModel({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(201).send({ message: "Register Successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (!userPresent) {
      return res.send({
        message: "Please Register",
      });
    } else {
      const isPassCorrect = bcrypt.compareSync(password, userPresent.password);
      if (!isPassCorrect) {
        return res.status(400).send({ message: "Wrong Credential" });
      }
      const accessToken = jwt.sign(
        {
          userId: userPresent._id,
          name: userPresent.name,
        },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRY,
        }
      );
      res.status(201).send({
        message: "Login Successful",
        accessToken,
        OK: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};
module.exports = { register, login };
