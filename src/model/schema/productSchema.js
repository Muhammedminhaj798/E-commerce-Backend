import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  image: { type: String, required: true, trim: true },
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
  qty: { type: Number, required: true, min: 1 },
  reviews: { type: Number, default: 0, min: 0 },
  isDeleted: { type: Boolean, default: false },
},
{timestamps: true}
);
export default mongoose.model("Product", productSchema);    