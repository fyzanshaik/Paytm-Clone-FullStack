const User = require("../models/User");
const zod = require("zod");
const schemaObject = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

exports.updateUser = async (req, res) => {
  const parsedData = schemaObject.safeParse(req.body);
  // console.log('here');
  if (!parsedData.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { firstName, lastName, password } = parsedData.data;
  const userId = req.body.userName;

  try {
    const user = await User.findOne({ userName: userId });
    console.log(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getUserName = async (req,res) =>{
  try {
    res.status(200).json({ userName : req.userId });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const index = users.findIndex(item => item.userName === req.userId);
    users.splice(index,1);
    res.status(200).json({ ALL_USERS: users });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserWithFilter = async (req, res) => {
  try {
    const filter = req.query.filter;
    console.log(filter);
    const user = await User.findOne({ userName: filter });
    // console.log(user);
    if (!user) return res.status(400).json({ message: "User not Found" });
    res.status(200).send({ NEED_USER: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
