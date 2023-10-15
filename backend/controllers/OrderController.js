const OrderModel = require("../models/OrderModel");
const Order = require("../models/OrderModel");

const getAllOrders = async (request, response) => {
  //get all orders from MongoDB

  try {
    const orders = await Order.find({ isComplete: false }).lean();

    //If no orders
    if (!orders) {
      return response.status(400).json({ message: "No orders found" });
    }

    response.json(orders);
  } catch (error) {
    response.json({ message: error.message });
  }
};

//get single order
const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  console.log("in controller >>", id);
  let singleOrder;

  try {
    singleOrder = await Order.findOne({ _id: id });
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(401).json(error);
  }
};

//Add new order

const addNewOrder = async (request, response) => {

console.log("user sent >", request.body)
  const {
    customerName,
    mobileNumber,
    city,
    deliverLocation,
    deliverDate,
    totalAmount,
  } = request.body;

  //Confirm data
  if (
    !customerName ||
    !mobileNumber ||
    !city ||
    !deliverLocation ||
    !deliverDate ||
    !totalAmount
  ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  const newOrder = await Order.create({
    customerName,
    mobileNumber,
    city,
    deliverLocation,
    deliverDate,
    totalAmount,
  });

  console.log("new order >",newOrder)
  if (newOrder) {
    return response.status(201).json({ message: "New Order created" });
  } else {
    return request.status(400).json({ message: "Invalid order data recived" });
  }
};

//Update order

const updateOrder = async (request, response) => {
  const {
    customerName,
    mobileNumber,
    city,
    deliverLocation,
    deliverDate,
    totalAmount,
    deliveryPerson,
    status,
    _id,
  } = request.body;

  console.log(request.body);
  //Confirm data
  if (
    !customerName ||
    !mobileNumber ||
    !city ||
    !deliverLocation ||
    !deliverDate ||
    !totalAmount ||
    !deliveryPerson ||
    !status
  ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  //Confirm order exist to update
  const order = await Order.findById(_id).exec();

  if (!order) {
    return response.status(400).json({ message: "Order not found" });
  }

  order.customerName = customerName;
  order.mobileNumber = mobileNumber;
  order.city = city;
  order.deliverLocation = deliverLocation;
  order.deliverDate = deliverDate;
  order.totalAmount = totalAmount;
  order.deliveryPerson = deliveryPerson;
  order.status = status;

  const updateOrder = await order.save();

  response.json(`'${updateOrder.order}' updated`);
};

//Delete order

const deleteOrder = async (request, response) => {
  try {
    const orderId = request.params.id;

    //console.log(request.params.id)

    await Order.findByIdAndDelete(orderId)
      .then(() => {
        response.status(200).json({ message: "Order deleted" });
      })
      .catch((error) => {
        //Confirm data
        if (!orderId) {
          return response.status(400).json({ message: "Order ID required" });
        }

        if (!Order) {
          return response.status(400).json({ message: "Order not found" });
        } else {
          response.json({
            message: "Error with delete item ",
            error: error.message,
          });
        }
      });
  } catch (error) {
    response.json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  console.log(req.params.id);

  const order = await OrderModel.findById({ _id: req.params.id });

  if (!order) return res.send("No order found!");

  order.isComplete = true;

  order.save();

  res.send("Order status update success!");
};
module.exports = {
  getAllOrders,
  getSingleOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
