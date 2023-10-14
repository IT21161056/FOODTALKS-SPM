const DeliveryState = require("../models/deliveryStatus.model");

const getAllDeliveryStates = async (request, response) => {
  //get all deliverystates from MongoDB

  try{
    const deliverystates = await DeliveryState.find().lean();

    //If no deliverystates
    if (!deliverystates) {
      return response.status(400).json({ message: "No deliverystates found" });
    }

    response.json(deliverystates);
  } catch (error){
    response.json({message: error.message});
  }
};

//get single deliverystate
const getSingleDeliveryState = async (req, res) => {
  const id = req.params.id;
  console.log('in controller >>',id)
  let singleDeliveryState;

  try {
    singleDeliveryState = await DeliveryState.findOne({ _id: id });
    res.status(200).json(singleDeliveryState);

  } catch (error) {
    res.status(401).json(error);
  }
};

//Add new deliverystate

const addNewDeliveryState = async (request, response) => {
  const { cusname, status } = request.body;

  //Confirm data
  if (!cusname || !state ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  const deliverystate = await DeliveryState.create({
    cusname,
    status,
  });

  if (deliverystate) {
    return response.status(201).json({ message: "New Delivery State created" });
  } else {
    return request.status(400).json({ message: "Invalid delivery state data recived" });
  }
};

//Update delivery state

const updateDeliveryState = async (request, response) => {
  const {
    cusname,
    state, 
    _id
  } = request.body;

  console.log(request.body);
  //Confirm data
  if (!cusname || !state ) {
    return response.status(400).json({ message: "All fields are required" });
  }

  //Confirm delivery state exist to update
  const deliverystate = await DeliveryState.findById(_id).exec();

  if (!deliverystate) {
    return response.status(400).json({ message: "Delivery State not found" });
  }

  deliverystate.cusname = cusname;
  deliverystate.state = state;

  const updateDeliveryState = await deliverystate.save();

  response.json(`'${updateDeliveryState.deliverystate}' updated`);
};

//Delete delivery state

const deleteDeliveryState = async ( request, response ) => {
  try{
    const {id} = request.params.id;

    //console.log(request.params.id)
    
    await DeliveryState.findByIdAndDelete(id)
    .then(() => {
      response.status(200).json({ message: "Delivery State deleted" });
    })
    .catch((error) => {

      //Confirm data
      if (!id) {
        return response.status(400).json({ message: "Delivery State ID required" });
      }

      //Confirm delivery state exists to delete

      if (!DeliveryState) {
        return response.status(400).json({ message: "Delivery State not found" });
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
  getAllDeliveryStates,
  getSingleDeliveryState,
  addNewDeliveryState,
  updateDeliveryState,
  deleteDeliveryState,
};
