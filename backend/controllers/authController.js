const User = require("../models/User");
const Account = require("../models/Account");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.signup = async (req, res) => {
  console.log(" SIGNUP HIT");
  const schemaObject = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    userName: zod.string(),
    password: zod.string(),
  });
  const responseData = req.body;
  // console.log(responseData)
  const parsedResponse = schemaObject.safeParse(responseData);
  // console.log(parsedResponse)
  try {
    if (!parsedResponse.success) {
      res
        .status(400)
        .json({ message: "Incorrect credentials please try again" });
      return;
    }
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "This user exists already please sign up" });
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
    });
    const userId = newUser._id;
    const userName = newUser.userName;
    await Account.create({
      userId,
      balance: Math.round(1 + Math.random() * 10000),
    });
    await newUser.save();
    const token = jwt.sign({ userId: responseData.userName }, JWT_SECRET);
    res
      .status(201)
      .json({ message: "New User has been created & saved", jwt: token });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  console.log(" SIGNIN HIT")
  const schemaObject = zod.object({
    userName: zod.string(),
    password: zod.string(),
  });
  const responseData = req.body;
  const parsedResponse = schemaObject.safeParse(responseData);
  try {
    if (!parsedResponse.success) {
      res
        .status(400)
        .json({ message: "Incorrect credentials please try again" });
      return;
    }

    const { userName, password } = responseData;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Sorry the user doesn't exist" });
    }

    if (user.password != password) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: responseData.userName }, JWT_SECRET);
    res.status(200).json({ message: "You have logged in", jwt: token });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
