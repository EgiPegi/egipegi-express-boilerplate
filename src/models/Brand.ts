import mongoose, { Schema, Document } from "mongoose";

interface Brand extends Document {
  name: string;
  description: string;
}

const brandSchema = new Schema<Brand>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Brand = mongoose.model<Brand>("Brand", brandSchema);

export default Brand;
