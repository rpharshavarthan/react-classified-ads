const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, study_year, course, location, phone } = req.body;
      if (
        !name ||
        !study_year ||
        !course ||
        !email ||
        !password ||
        !location ||
        !phone
      ) {
        return res.status(400).json({ message: "fill all the field" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "passsword should be atleast 6 character long" });
      }
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "email already exists" });
      }
      // password hashing
      const newUser = new Users({
        name,
        email,
        password,
        study_year,
        course,
        location,
        phone,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save user
          newUser
            .save()
            .then(() => {
              console.log("registered...");
            })
            .catch((e) => {
              console.log(e);
            });
        });
      });
      //
      const refreshtoken = createRefreshToken({ id: newUser._id });
      const accesstoken = createAccessToken({ id: newUser.id });
      //
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/check-auth",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accesstoken });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "user not found" });
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch)
        return res.status(400).json({ message: "invalid credentials" });
      //
      const refreshtoken = createRefreshToken({ id: user._id });
      const accesstoken = createAccessToken({ id: user.id });
      console.log(refreshtoken);
      console.log(accesstoken);
      //
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/check-auth",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/check-auth" });
      return res.json({ message: "logged out" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ message: "please login or register" });
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_ACCESS, (e, user) => {
        if (e) {
          res.status(400).json({ message: "please login or register" });
        }
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    // res.json({rf_token})
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.params.userId).select("-password");
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_ACCESS, { expiresIn: "7d" });
};

module.exports = userCtrl;
