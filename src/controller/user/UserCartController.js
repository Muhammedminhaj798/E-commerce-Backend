import cartSchema from "../../model/schema/cartSchema.js";
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

const removeFromCart = async (req, res, next) => {
 const cart = await cartSchema.findOneAndUpdate(
    { userId: req.user.id, "products.productId": req.body.productId },
    {
      $pull: {
        products: { productId: req.body.productId }
      }
    },
    { new: true }
  );

  if (cart) {
    res.status(200).json({
      status: "success",
      message: "Product removed from cart",
    });
  } else {
   res.status(404).json({
      status: "fail",
      message: "Product not found in cart",
    });
  } 
}

export { getUSerCart, updateUserCart, removeFromCart };