import wishlistSchema from "../../model/schema/wishlistSchema.js"
import customError from "../../utils/customErr.js"

const getUserWishlist = async (req, res, next) => {
    const data = await wishlistSchema.findOne({ userId: req.user.id }).populate("products");
    if (data) {
       return res.status(200).json({
          status: "success",
          data: data,
       }) 
    }else {
        res.status(200).json({products: []})
    }
};

// add to wishlist
const addToWishlist = async (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return next(customError("productId is required", 400));
  }
  try {
    let wishlist = await wishlistSchema.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new wishlistSchema({ userId: req.user.id, products: [productId] }); 
    }else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }
    await wishlist.save();
    res.status(200).json({
      status: "success",
      message: "product added to wishlist",
      wishlist
    });
  }catch (error) {
    next(new customError("Failed to add product to wishlist", 500));
  }
}

// remove from wishlist
const removeFromWishlist = async (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return next(customError("productId is required", 400)); 
  }
  const newWishlist = await wishlistSchema.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: productId } },
    { new: true }
  );
  if(newWishlist) {
    res.status(200).json({
      status: "success",
      message: "product removed from wishlist",
      newWishlist
    }); 
  }else {
    next(new customError("Failed to remove product from wishlist", 500)); 
  }
}

export { getUserWishlist, addToWishlist, removeFromWishlist }