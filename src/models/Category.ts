import mongoose from "mongoose";
import * as Yup from "yup";

export const categoryDAO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  icon: Yup.string().required(),
});

export type Category = Yup.InferType<typeof categoryDAO>;

const Schema = mongoose.Schema;

const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.index({ name: "text", description: "text" });

const CategoryModel = mongoose.model<Category>("Category", categorySchema);

export default CategoryModel;
