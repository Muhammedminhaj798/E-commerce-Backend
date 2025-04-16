import mongoose from "mongoose";
import customError from "../../utils/customErr.js";
import orderSchema from "../../model/schema/orderSchema.js";
import Cart from "../../model/schema/cartSchema.js"
import productSchema from "../../model/schema/productSchema.js";
import Stripe from "stripe";


const createOrder = async (req, res, next) => {
  try{
    const userId = req.user.id;

    if(!userId){
      return next(new customError("User not Authenticated", 401))
    }

    const cart = await Cart.findOne({user : userId}).populate("products.product");

    if(!cart){
      return next(new customError("Cart data not founded", 404))
    }

    const totalPrice = cart.productSchema.reduce((total, item) => {
      const price = parseFloat(item.productSchema.price);
      const quantity = parseInt(item.quantity)
      return total + (price * quantity)
    },0);

    const line_items = cart.products.map((item) => ({
      price_data:{
        currency: 'inr',
        product_data: {
          name : item.productSchema.name,
          image : [item.productSchema.image],
        },
        unit_amount: Math.round(item.productSchema.price * 100),
      },
      quantity : item.quantity
    }));
     //create a session in stripe
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      ui_mode:'embedded',
      // return_url: `${process.env.FRONTEND_URL}/CheckoutSuccess/{}`
    })

    //Create a new order
    const newOrder = new orderSchema({
      userId,
      productSchema : cart.productSchema.map((item) => ({
        
      }))
    })
  }catch{

  }
}





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



export  { getAllOrders, getOneOrder, cancelOneOrder };