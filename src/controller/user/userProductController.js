import productSchema from "../../model/schema/productSchema.js";

const getAllProduct = async(req,res) =>{
    const allProduct = await productSchema.find()

    res.status(200).json({
        message: "All Product get successfully",
        status: "success",
        data: allProduct
    })
}


const getProductType = async(req,res) =>{
    const type = req.params.type
    const productType = await productSchema.find({type: type})
    res.status(200).json({
        message: "product get by type succesfully",
        status: "success",
        data: productType
    })
}

const getProductById = async(req,res) =>{
    const _id = req.params.id
    const productId = await productSchema.findById(_id)
    res.status(200).json({
        message: "product get by id succesfully",
        status: "success",
        data: productId
    })
}

export {getAllProduct, getProductType, getProductById}