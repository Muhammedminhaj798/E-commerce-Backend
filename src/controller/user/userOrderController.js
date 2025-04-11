import mongoose from "mongoose";
import customError from "../../utils/customErr.js";
// import productSchema from "../../model/schema/productSchema.js";
// import cartSchema from "../../model/schema/cartSchema.js";
import orderSchema from "../../model/schema/orderSchema.js";

const getAllOrders = async (req, res, next) => {
  const newOrder = await orderSchema
    .find({ userId: req.user.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (newOrder) {
    return res.status(200).json({
      status: "success",
      data: { order: newOrder },
    });
  } else {
    res.status(200).json({ products: [] });
  }
};

//get a specific order by ID
const getOneOrder = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(customError("Invalid order ID", 400));
  }
  const singleOrder = await orderSchema
    .findOne({ _id: req.params.id })
    .populate("products.productId", "name price image");
  if (!singleOrder) {
    return next(customError("Order not found", 404));
  }
  res.status(200).json({ singleOrder });
};

//Cancel an Order by ID
const cancelOneOrder = async (req, res, next) => {
  const cancelOrder = await orderSchema.findOneAndUpdate(
    { _id: req.params.orderId, userId: req.user.id },
    { $set: { shippingStatus: "Cancelled" } },
    { new: true }
  );
  if (!cancelOrder) {
    return next(customError("Order not found", 404));
  }
  if(cancelOrder.shippingStatus === "paid") {
    return next(customError("Order is already paid", 400));
  }
  cancelOrder.shippingStatus = "Cancelled";
  res.status(200).json({
    message: "Order cancelled successfully",
  })
};

export default { getAllOrders, getOneOrder, cancelOneOrder };