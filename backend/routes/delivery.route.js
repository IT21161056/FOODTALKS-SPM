const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/delivery.controller");

router.route("/create").post(deliveryController.createNewDelvery);
router.route("/:id").get(deliveryController.getSingleDelivery);
router.route("/").get(deliveryController.getAllDeliveries);
router.route("/update").put(deliveryController.updateDelivery);
router.route("/delete/:id").delete(deliveryController.deleteDelivery);

module.exports = router;
