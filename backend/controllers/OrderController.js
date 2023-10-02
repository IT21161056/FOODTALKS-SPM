const Order = require("../models/OrderModel");

const getAllOrders = async (request, response) => {
  //get all orders from MongoDB

  try{
    const orders = await Order.find().lean();

    //If no orders
    if (!orders) {
      return response.status(400).json({ message: "No orders found" });
    }

    response.json(orders);
  } catch (error){
    response.json({message: error.message});
  }
};

//get single order
const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  console.log('in controller >>',id)
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
  const { customerName, mobileNumber, city, deliverLocation, deliverDate, totalAmount } = request.body;

  //Confirm data
  if (!customerName || !mobileNumber || !city || !deliverLocation || !deliverDate || !totalAmount) {
    return response.status(400).json({ message: "All fields are required" });
  }

  const order = await Order.create({
    customerName,
    mobileNumber,
    city,
    deliverLocation,
    deliverDate,
    totalAmount,
  });

  if (order) {
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
    deliveryPerson
  } = request.body;

  //Confirm data
  if (customerName, mobileNumber, city, deliverLocation, deliverDate, totalAmount, deliveryPerson ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  //Confirm order exist to update
  const order = await Order.findById(id).exec();

  if (!order) {
    return response.status(400).json({ message: "Order not found" });
  }

  //Cehck for duplicate order
  const duplicate = await Order.findOne({})
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec(); //need to fill

  //Allow renmaing of the original order
  if (duplicate && duplicate?._id.toString() !== id) {
    return response.status(409).json({ message: "Duplicate Order" });
  }

  order.customerName = customerName;
  order.mobileNumber = mobileNumber;
  order.city = city;
  order.deliverLocation = deliverLocation;
  order.deliverDate = deliverDate;
  order.totalAmount = totalAmount;
  order.deliveryPerson = deliveryPerson;

  const updateOrder = await order.save();

  response.json(`'${updateOrder.order}' updated`);
};

//Delete order

const deleteOrder = async ( request, response ) => {
  try{
    const id = request.params.id;

    //console.log(request.params.id)
    
    await Order.findByIdAndDelete(id)
    .then(() => {
      response.status(200).json({ message: "Order deleted" });
    })
    .catch((error) => {

      //Confirm data
      if (!id) {
        return response.status(400).json({ message: "Order ID required" });
      }

      //Confirm order exists to delete

      if (!Order) {
        return response.status(400).json({ message: "Order not found" });
      }

      else{
        response.json({ message: "Error with delete item ", error: error.message});
      }
    });
  } catch (error) {
    response.json({message: error.message});
  }

};

module.exports = {
  getAllOrders,
  getSingleOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
