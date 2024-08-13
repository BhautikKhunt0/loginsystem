const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

router.post("/signup", async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;

  if (!name || !dateOfBirth || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    dateOfBirth,
    email,
    password: hashedPassword,
  });
  await user.save();

  const token = jwt.sign({ _id: user._id }, "secretkey");
  res.cookie("token", token);

  return res
    .status(201)
    .json({ message: "User created successfully", token: token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ _id: user._id }, "secretkey");
  res.cookie("token", token);

  return res.status(200).json({ message: "Login successful", token: token });
});

router.get("/users", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, "secretkey", async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", token: `${token}` });
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "You are not a valid User" });
    }

    const users = await User.find({});
    return res.status(200).json({ users: users });
  });
});

module.exports = router;
