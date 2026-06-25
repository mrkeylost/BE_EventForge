import mongoose from "mongoose";
import * as Yup from "yup";

export const bannerDAO = Yup.object({
  title: Yup.string().required(),
  image: Yup.string().required(),
  isShow: Yup.boolean().required(),
});

export type TBanner = Yup.InferType<typeof bannerDAO>;

export interface Banner extends TBanner {}

const Schema = mongoose.Schema;

export const bannerSchema = new Schema<Banner>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

bannerSchema.index({ title: "text" });

const BannerModel = mongoose.model<Banner>("Banner", bannerSchema);

export default BannerModel;
