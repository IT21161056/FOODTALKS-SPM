const express = require("express");
const router = express.Router();
const CartController = require("../controllers/BiscuitCard.js");


router.post("/add",CartController.AddBiscuitCard);
router.get("/",CartController.getAllBiscuitCard);
router.get("/singlecard/:id",CartController.SingleBiscuitCard);
router.put("/update/:id",CartController.UpdateBiscutCard);
router.delete("/delete/:id",CartController.DeleteBiscuit);

module.exports = router;

