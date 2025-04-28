import mongoose from "mongoose";
import cartSchema from "../../model/cartSchema.js";
import customError from "../../utils/customErr.js";

const getUSerCart = async (req, res, next) => {
  const data = await cartSchema
    .findOne({ userId: req.user.id })
    .populate({ path: "products.productId", select: "name price image" });
  if (data) {
    res.status(200).json({
      status: "success",
      data: data,
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        products: [],
      },
    });
  }
};

const updateUserCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  
  

  if (quantity < 1) {
    return next(customError(`invalid quantity ${quantity}`, 400));
  }

  let cart = await cartSchema.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new cartSchema({
      userId: req.user.id,
      products: [{ productId, quantity }],
    });
  } else {
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }
  const cartSave = await cart.save();
  await cartSave.populate({
    path: "products.productId",
    select: "name price image",
  });
  res.status(200).json({
    status: "cart updated",
    data: cartSave,
  });
};

const removeFromCart = async (req,res,next) => {

  const userId = req.user.id
  const {id} = req.params

  const datas = await cartSchema.findOne({ userId: userId }).populate("products.productId")
  if (!datas) {
      return next(new customError("cart not found",404))

  }
  const productIndex = datas.products.findIndex(pro => pro.productId._id == id)
  datas.products.splice(productIndex, 1)
  await datas.save()
  res.status(200).json({ message: "Product removed from cart", products: datas.products || [] });
}


export { getUSerCart, updateUserCart, removeFromCart };

