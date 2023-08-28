import mongoose, { Schema, Document, Types } from "mongoose";

interface Product extends Document {
  name: string;
  brand: mongoose.Types.ObjectId;
  categories: Types.Array<Types.ObjectId>;
  description: string;
  purchase_price: number;
  selling_price: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  categories: [{ type: Types.ObjectId, ref: "Category", required: true }],
  description: { type: String, required: true },
  purchase_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
});

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
