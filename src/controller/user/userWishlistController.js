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