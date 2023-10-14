const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
const session = require("express-session");

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();

    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Create new users
//@route POST /users
//@access Private
const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, password } = req.body;

    console.log(firstName, lastName, address, email, phone, password);
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //confirm data
    if (!firstName || !lastName || !address || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //checks for duplicate
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Email is allready used!" });
    }

    //Hash password
    // const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

    const userObject = {
      firstName,
      lastName,
      address,
      email,
      phone,
      password,
    };
    console.log(userObject);

    //create and store new user
    const user = await User.create(userObject);

    if (user) {
      //created
      res
        .status(201)
        .json({ message: `New user ${firstName} ${lastName} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc login users
//@route POST /users
//@access Private
const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send("User not found");
    }

    if (user.password === pass) {
      return res.status(200).json({ user });
    } else if (user.password != pass) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  let userID = req.params.id;
  try {
    // const userID = req.session.userID;
    if (!userID) {
      return res.json({ message: "UserID undefined" });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//l
//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    let userID = req.params.id;
    console.log(userID);

    //confirm data
    if (!userID) {
      return res.status(400).json({ message: "No user id" });
    }

    const user = await User.findById(userID).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.password = password;

    // if (password) {
    //   // Hash passwrod
    //   user.password = await bcrypt.hash(password, 10);
    // }
    const updatedUser = await user.save();

    res.json({ message: "User details updated.", user: updatedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = async (req, res) => {
  try {
    let userID = req.params.id;
    await User.findByIdAndDelete(userID)
      .then(() => {
        res.status(200).json({ message: "user deleted" });
      })
      .catch((error) => {
        res.json({ message: "Error with delete item", error: error.message });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  createNewUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
