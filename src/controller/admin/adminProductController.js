import productSchema from "../../model/productSchema.js";
import customError from "../../utils/customErr.js";

const getAllProducts = async (req, res, next) => {
  const products = await productSchema.find();

  if(!products){
   return next(new customError("products not found", 404))
  }
  res.status(200).json({
    status:"success",
    message:"All product get successfully",
    data:products,
  });

}

const addProduct = async(req,res,next) => {
  const {error, value} = productSchema.validate(req.body)
  const image = req.file.path
  if(error){
    return next(new customError(error.message))
  }

  const {name, type, price, description, brand, rating, reviews} = value
  const newProduct = await new productSchema({image})
}




// const editProduct = async(req, res, next) => {
//     const {_id, __v, image, ...productData} = req.body;
//     const {error,value} = productSchema.validate(productData);

//     if(error){
//       return next(new customError(error))
//     }
// }


export default getAllProducts