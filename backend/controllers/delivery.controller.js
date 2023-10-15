const deliveryModel = require("../models/delivery.model");
const Delivery = require("../models/delivery.model");
// const bcrypt = require("bcrypt");
const session = require("express-session");

//@desc Get all deliveries
//@route GET /delivery
//@access Private
const getAllDeliveries = async (req, res) => {
  try {
    const delivery = await Delivery.find();
    // console.log(delivery);
    if (!delivery) {
      return res.status(400).json({ message: "No deliveries found" });
    }

    res.json(delivery);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Create new delivery
//@route POST /delivery
//@access Private
const createNewDelivery = async (req, res) => {
  try {
    const { name, email, area, mobile, status } = req.body;

    console.log("data >>>", name, email, area, mobile, status);
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    //confirm data
    if (!name || !email || !area || !mobile || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Hash password
    // const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

    const deliveryObject = {
      name,
      email,
      area,
      mobile,
      status,
    };
    console.log("in side delivery controller >>", deliveryObject);

    //create and store new user

    const delivery = await Delivery.create(deliveryObject);

    if (delivery) {
      //created
      res.status(201).json({ message: `New delivery created` });
    } else {
      res.status(400).json({ message: "Invalid delivery data received" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleDelivery = async (req, res) => {
  let deliveryID = req.params.id;
  try {
    // const userID = req.session.userID;
    if (!deliveryID) {
      return res.json({ message: "UserID undefined" });
    }

    const delivery = await Delivery.findById(userID);

    if (!delivery) {
      return res.json({ message: "User not found" });
    }

    res.status(200).json({ delivery: delivery });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//l
//@desc Update a user
//@route PATCH /users
//@access Private
const updateDelivery = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;

    console.log(rest)

    const updatedDelivery = await deliveryModel.findByIdAndUpdate(_id, rest);

    //confirm data
    if (!_id) {
      return res.status(400).json({ message: "No delivery id" });
    }

    res.json({ message: "User details updated.", delivery: updatedDelivery });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// const updateDelivery = async (req, res) => {
//   try {
//     const { _id, ...rest } = req.body;

//     if (!_id) {
//       return res.status(400).json({ message: "No delivery id" });
//     }

//     const updatedDelivery = await Delivery.findByIdAndUpdate(_id, rest, {
//       new: true,
//     });

//     if (updatedDelivery) {
//       res.status(200).json({ message: "User details updated.", delivery: updatedDelivery });
//     } else {
//       res.status(404).json({ message: "Delivery not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteDelivery = async (req, res) => {
  try {
    let deliveryID = req.params.id;
    await Delivery.findByIdAndDelete(deliveryID)
      .then(() => {
        res.status(200).json({ message: "Delivery deleted" });
      })
      .catch((error) => {
        res.json({
          message: "Error with delete delivery",
          error: error.message,
        });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllDeliveries,
  createNewDelivery,
  updateDelivery,
  deleteDelivery,
  getSingleDelivery,
};
