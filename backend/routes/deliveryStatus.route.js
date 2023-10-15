const express = require("express");
const router = express.Router();
const deliverystateController = require("../controllers/deliveryStatus.controller");

router.get("/", deliverystateController.getAllDeliveriesStatus);
router.get(
  "/singleDeliveryState/:id",
  deliverystateController.getSingleDeliveryStatus
);
router.post("/add", deliverystateController.createNewDelveryStatus);
router.put("/update/:id", deliverystateController.updateDeliveryStatus);
router.delete("/delete/:id", deliverystateController.deleteDeliveryStatus);

module.exports = router;
