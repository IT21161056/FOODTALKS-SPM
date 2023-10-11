const express = require("express");
const router = express.Router();
const deliveryStatusController = require("../controllers/deliveryStatus.controller");

router.route("/create").post(deliveryStatusController.createNewDelveryStatus);
router.route("/:id").get(deliveryStatusController.getSingleDeliveryStatus);
router.route("/").get(deliveryStatusController.getAllDeliveriesStatus);
router.route("/update").put(deliveryStatusController.updateDeliveryStatus);
router.route("/delete/:id").delete(deliveryStatusController.deleteDeliveryStatus);

module.exports = router;
