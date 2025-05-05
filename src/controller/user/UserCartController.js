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
      cart.products[productIndex].quantity += quantity;
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

const removeFromCart = async (req, res, next) => {
  const { id } = req.params;
  const cartItem = await cartSchema.findOneAndUpdate(
    {
      userId: req.user.id,
    },
    { $pull: { products: { _id: id } } },
    { new: true }
  );

  if (cartItem) {
    res.status(200).json({ message: "product removed from cart" });
  } else {
    res.status(404).json({ message: "cart not found" });
  }
};

const incrementProduct = async(req,res,next) => {

try {
  const userId = req.user.id
const { productId, action } = req.body
const cartData = await cartSchema.findOne({ userId: userId })

if (!cartData) {
  return res.status(404).json({message:"Cart data not found"})
}
const productData = cartData.products.find(prod => prod.productId._id == productId)
if (!productData) {
  return res.status(404).json({message:"product not found in cart"})}
if (action === "increment") {
    productData.quantity += 1
} else if (action === "decrement") {
    if (productData.quantity > 1) {
        productData.quantity -= 1
    }
} else {
  return res.status(404).json({message:"Invalid action for updating quantity"})}
await cartData.save()
const updatedCart = await cartSchema.findOne({ userId: userId }).populate("products.productId")
res.status(200).json({ products: updatedCart.products || [] })
} catch (error) {
  return res.status(404).json({message:error})}


}

export { getUSerCart, updateUserCart, removeFromCart, incrementProduct };
