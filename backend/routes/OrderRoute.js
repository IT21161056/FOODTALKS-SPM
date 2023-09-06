const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.route.get("/", orderController.getAllOrders);
router.route.post("/add", orderController.addNewOrder);
router.route.patch("/update", orderController.updateOrder);
router.route.delete("delete", orderController.deleteOrder);

module.exports = router;