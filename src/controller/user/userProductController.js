import productSchema from "../../model/productSchema.js";

const getAllProduct = async (req, res) => {
  const allProduct = await productSchema.find({ isDeleted: false });

  res.status(200).json({
    message: "All Product get successfully",
    status: "success",
    data: allProduct,
  });
};

const getProductType = async (req, res) => {
  const type = req.params.type;
  const productType = await productSchema.find({
    type: type,
    isDeleted: false,
  });
  res.status(200).json({
    message: "product get by type succesfully",
    status: "success",
    data: productType,
  });
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  const productId = await productSchema.findById(id);
  // console.log(productId)
  res.status(200).json({
    message: "product get by id succesfully",
    status: "success",
    data: productId,
  });
};

const getFilterProduct = async (req, res) => {
  const { lowerprice, upperprice, brand, type } = req.body;
  if (brand) {
    const product = await productSchema.find({
      brand: brand,
      isDeleted: false,
    });
    res.status(200).json({
      error: false,
      product,
    });
  }
  if (type) {
    const product = await productSchema.find({ type: type, isDeleted: false });
    res.status(200).json({
      error: false,
      product,
    });
  }
  if (lowerprice && upperprice) {
    const products = await productSchema.find({
      price: { $gte: lowerprice, $lte: upperprice },
      isDeleted: false,
    });
    return res.status(200).json({
      error: false,
      products,
    });
  }
};

const getSearchProduct = async (req, res) => {
  const { search } = req.body;

  if (search) {
    const products = await productSchema.find({
      name: { $regex: search, $options: "i" },
      isDeleted: false,
    });

    return res.status(200).json({
      error: false,
      products,
    });
  }

  res.status(400).json({
    error: true,
    message: "No search term provided",
  });
};

export {
  getAllProduct,
  getProductType,
  getProductById,
  getFilterProduct,
  getSearchProduct,
};
