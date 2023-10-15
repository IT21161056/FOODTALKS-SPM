const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.get("/", orderController.getAllOrders);
router.get("/singleOrder/:id", orderController.getSingleOrder);
router.post("/add", orderController.addNewOrder);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.put("/updateOrderStatus/:id", orderController.updateOrderStatus);

module.exports = router;
