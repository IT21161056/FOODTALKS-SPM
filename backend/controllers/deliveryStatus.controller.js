const Delivery = require("../models/deliveryStatus.model");

//@desc Get all deliveries
//@route GET /deliveryStatus
//@access Private
const getAllDeliveriesStatus = async (req, res) => {
    try {
      const deliveryStatus = await DeliveryStatus.find();
      console.log(deliveryStatus);
      if (!deliveryStatus) {
        return res.status(400).json({ message: "No delivery status found" });
      }
  
      res.json(deliveryStatus);
    } catch (error) {
      res.json({ message: error.message });
    }
  };

//@desc Create new delivery
//@route POST /deliveryStatus
//@access Private
const createNewDelveryStatus = async (req, res) => {
    try {
      const { userId, orderId, cusname, state } = req.body;
  
      console.log("data >>>", userId, orderId, cusname, state);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
  
      //confirm data
      if (!userId || !orderId || !cusname || !state) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      //Hash password
      // const hashedPwd = await bcrypt.hash(password, 10); //salt rounds
  
      const deliveryStatusObject = {
        userId,
        orderId,
        cusname,
        state,
      };
      console.log("in side delivery status controller >>", deliveryStatusObject);
  
      //create and store new user
  
      const deliveryStatus = await DeliveryStatus.create(deliveryStatusObject);
  
      if (deliveryStatus) {
        //created
        res.status(201).json({ message: `New deliveryStatus created` });
      } else {
        res.status(400).json({ message: "Invalid deliveryStatus data received" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  const getSingleDeliveryStatus = async (req, res) => {
    let deliveryStatusID = req.params.id;
    try {
      // const userID = req.session.userID;
      if (!deliveryStatusID) {
        return res.json({ message: "UserID undefined" });
      }
  
      const deliveryStatus = await Delivery.findById(userID);
  
      if (!deliveryStatus) {
        return res.json({ message: "User not found" });
      }
  
      res.status(200).json({ deliveryStatus: deliveryStatus });
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  //l
//@desc Update a user
//@route PATCH /users
//@access Private
const updateDeliveryStatus = async (req, res) => {
    try {
      const { _id, ...rest } = req.body;
  
      const updatedDeliveryStatus = await deliveryStatusModel.updateOne({ _id: _id }, rest);
  
      //confirm data
      if (!_id) {
        return res.status(400).json({ message: "No delivery status id" });
      }
  
      res.json({ message: "Delivery Status details updated.", delivery: updatedDeliveryStatus });
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  //@desc Delete a user
//@route DELETE /users
//@access Private
const deleteDeliveryStatus = async (req, res) => {
    try {
      let deliveryStatusID = req.params.id;
      await DeliveryStatus.findByIdAndDelete(deliveryStatusID)
        .then(() => {
          res.status(200).json({ message: "Delivery status deleted" });
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
    getAllDeliveriesStatus,
    createNewDelveryStatus,
    updateDeliveryStatus,
    deleteDeliveryStatus,
    getSingleDeliveryStatus,
  };