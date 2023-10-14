const express = require('express');
const router = express.Router();
const deliverystateController = require('../controllers/deliveryStatus.controller');

router.get("/", deliverystateController.getAllDeliveryStates);
router.get("/singleDeliveryState/:id", deliverystateController.getSingleDeliveryState);
router.post("/add", deliverystateController.addNewDeliveryState);
router.put("/update/:id", deliverystateController.updateDeliveryState);
router.delete("/delete/:id", deliverystateController.deleteDeliveryState);

module.exports = router;