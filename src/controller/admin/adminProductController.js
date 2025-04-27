import productSchema from "../../model/productSchema.js";
import customError from "../../utils/customErr.js";
import { joiProductSchema } from "../../utils/validation.js";

const getAllProducts = async (req, res, next) => {
  const products = await productSchema.find({ isDeleted: false });

  if (!products) {
    return next(new customError("products not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "All product get successfully",
    data: products,
  });
};

const getProductById = async (req, res, next) => {
  const _id = req.params.id;
  const productId = await productSchema.findById({ _id, isDeleted: false });
  if (!productId) {
    return next(
      res.status(400).json({
        message: "failed",
      })
    );
  }

  res.status(200).json({
    message: "get product by id success",
    status: "success",
    data: productId,
  });
};

const addProduct = async (req, res, next) => {
  const { error, value } = joiProductSchema.validate(req.body);

  const image = req.file.path;

  if (error) {
    return next(new customError(error.message));
  }

  const { name, type, price, description, brand, rating, reviews, qty } = value;

  const newProduct = await new productSchema({
    name,
    type,
    price,
    description,
    brand,
    rating,
    reviews,
    image,
    qty,
  });
  await newProduct.save();
  res.status(200).json({
    errorCode: 0,
    message: "product added successfully",
    data: newProduct,
  });
};

const deleteProduct = async (req, res, next) => {
  const isDeleted = await productSchema.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  if (!isDeleted) {
    return next(new customError("product not found", 500));
  }
  res.status(200).json({
    message: "deleted successfull",
    status: "success",
    data: isDeleted,
  });
};

const editProduct = async (req, res, next) => {
  const image = req.file.path;
  const { error, value } = await joiProductSchema.validate(req.body);
  const { name, type, price, description, brand, qty } = value;
  const productId = req.params.id;
  const updatedProduct = await productSchema.findByIdAndUpdate(
    productId,
    { name, type, price, description, brand, qty, image },
    { new: true }
  );

  res.status(200).json({
    message:"product details updated successfully",
    status:"success",
    data:updatedProduct
  })
};


export { getAllProducts, addProduct, getProductById, deleteProduct,editProduct };
