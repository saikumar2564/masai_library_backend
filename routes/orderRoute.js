const express = require("express");
const {
  ordersData,
  createOrders,
} = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/orders", ordersData);
orderRouter.post("/order", createOrders);

module.exports = { orderRouter };
