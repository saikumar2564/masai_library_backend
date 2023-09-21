const { orderModel } = require("../model/orderModel");

const ordersData = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ message: "All Orders Data Fetched", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some server Error", error });
  }
};

const createOrders = async (req, res) => {
  const { user, books, totalAmount } = req.body;
  try {
    const newOrders = new orderModel({ user, books, totalAmount });
    await newOrders.save();
    res.status(201).send({ message: "New Orders Added", newOrders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

module.exports = { ordersData, createOrders };
