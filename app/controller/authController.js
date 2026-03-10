const User = require("../models/user");
const userShemaValidation = require("../utils/joiuserSchemaValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class userAuthController {
  async register(req, res) {
    try {
      const { name, email, password, about } = req.body;
      if (!name || !email || !password) {
        return res.status(401).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existsUser = await User.findOne({ email });
      if (existsUser) {
        return res.status(400).json({
          success: false,
          message: "user already exists",
        });
      }

      const userData = {
        name,
        email,
        password,
        about,
      };

      const { error, value } = userShemaValidation.validate(userData);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        const Salt = await bcrypt.genSalt(10);
        const HashPassword = await bcrypt.hash(password, Salt);
        value.password = HashPassword;

        const data = new User(value);
        await data.save();

        return res.status(200).json({
          success: true,
          message: "user register successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      // console.log(req.body)
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          success: false,
          message: "All fields are required",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Password not matched",
        });
      }

      if (user && user.is_admin === "user") {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            about: user.about,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" },
        );
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: false,
        // });

        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async user(req,res){
    try{
      const user = req.user.id
      const userData = await User.findById(user)

      return res.status(201).json({
        success: true,
        message: 'user get successfully',
        userdata: userData
      })
    }catch(err){
      return res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
}

module.exports = new userAuthController();
