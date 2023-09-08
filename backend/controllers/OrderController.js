const Order = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  //get all orders from MongoDB

  const orders = await Order.find().lean();

  //If no orders
  if (!orders?.length) {
    return res.status(400).json({ message: "No orders found" });
  }

  //Add customer name to each order before sending the response
  const orderWithCustomer = await Promise.all(
    orders.map(async (order) => {
      const customer = await Customer.findById(order.customer).lean().exec();
      return { ...order, customerName: customer.customerName };
    })
  );

  res.json(orderWithCustomer);
};

//get single order
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  let singleOrder;

  try {
    singleOrder = await Order.findOne({ _id: id });
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(401).json(error);
  }
};

//Add new order

const addNewOrder = async (req, res) => {
  const { customerName, mobileNumber, totalAmount, city, deliverLocation, deliverDate } =
    req.body;

  //Confirm data
  if (!customerName || !mobileNumber || !totalAmount || !city || !deliverLocation || !deliverDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const order = await Order.create({
    customerName,
    mobileNumber,
    totalAmount,
    city,
    deliverLocation,
    deliverDate,
  });

  if (order) {
    return res.status(201).json({ message: "New Order created" });
  } else {
    return req.status(400).json({ message: "Invalid order data recived" });
  }
};

//Update order

const updateOrder = async (req, res) => {
  const {
    customerName,
    mobileNumber,
    totalAmount,
    city,
    deliverLocation,
    deliverDate,
    //deliveryPersonName,
  } = req.body;

  //Confirm data
  if (customerName, mobileNumber, totalAmount, city, deliverLocation, deliverDate ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Confirm order exist to update
  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  //Cehck for duplicate order
  const duplicate = await Order.findOne({})
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec(); //need to fill

  //Allow renmaing of the original order
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Order" });
  }

  order.customerName = customerName;
  order.mobileNumber = mobileNumber;
  order.totalAmount = totalAmount;
  order.city = city;
  order.deliverLocation = deliverLocation;
  order.deliverDate = deliverDate;
  //order.deliveryPersonName = deliveryPersonName

  const updateOrder = await order.save();

  res.json(`'${updateOrder.order}' updated`);
};

//Delete order

const deleteOrder = async (req, res) => {
  const { id } = req.body;

  //Confirm data
  if (!id) {
    return res.status(400).json({ message: "Order ID required" });
  }

  //Confirm order exists to delete
  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  const result = await order.deleteOrder();

  const reply = `Order '${result.order}' with ID ${result._id} deleted`;
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
