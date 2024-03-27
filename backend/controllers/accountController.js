const User = require("../models/User");
const zod = require("zod");
const Account = require("../models/Account");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
exports.getAccountBalance = async (req, res) => {
  const { userName } = req.query;
  try {
    const user = await User.findOne({ userName: userName });
    const userId = user._id;
    const userExists = await Account.findOne({ userId: userId });
    if (!userExists)
      return res.status(400).json({ message: "Error fetching your Balance" });
    res.json({ Balance: userExists.balance }).status(200);
  } catch (error) {
    console.log("error fetching account balance: ", error);
    res.json({ message: "Internal Server Error" }).status(400);
  }
}

exports.accountBalanceTransfer = async (req, res) => {
  const senderId = req.userId;
  // const senderId = userId;
  const { to, amount } = req.body;
  const session = await mongoose.startSession();

  (await session).startTransaction();

  const sender = await User.findOne({ userName: senderId }).session(session);
  // console.log(sender)
  if (!sender || sender.balance < amount) {
    (await session).abortTransaction();
    return res
      .status(400)
      .json({ message: "Insufficient Funds in your account" });
  }

  //check if the reciever's account exists or not

  const reciever = await User.findOne({ userName: to }).session(session);
  // console.log(reciever)
  if (!reciever) {
    (await session).abortTransaction();
    return res.status(400).json({
      message: "This account doesn't exist please check Account Name",
    });
  }

  await Account.updateOne(
    { userId: sender._id },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: reciever._id },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
};
