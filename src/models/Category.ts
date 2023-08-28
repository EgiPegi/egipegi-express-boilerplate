import { Schema, model, Document, Types } from "mongoose";

interface Category extends Document {
  name: string;
  //   products: Types.Array<Types.ObjectId>;
  description: string;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  //   products: [{ type: Types.ObjectId, ref: "Product" }],
  description: { type: String, required: true },
});

const Category = model<Category>("Category", categorySchema);

export default Category;
