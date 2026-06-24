import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

export const eventDAO = Yup.object({
  name: Yup.string().required(),
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
  description: Yup.string().required(),
  banner: Yup.string().required(),
  isFeatured: Yup.boolean().required(),
  isOnline: Yup.boolean().required(),
  isPublish: Yup.boolean(),
  category: Yup.string().required(),
  slug: Yup.string(),
  createdBy: Yup.string().required(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
  location: Yup.object()
    .shape({
      region: Yup.number(),
      coordinates: Yup.array(),
      address: Yup.string(),
    })
    .required(),
});

export type TEvent = Yup.InferType<typeof eventDAO>;

export interface Event extends Omit<TEvent, "category" | "createdBy"> {
  category: ObjectId;
  createdBy: ObjectId;
}

const Schema = mongoose.Schema;

const eventSchema = new Schema<Event>(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    isPublish: {
      type: Boolean,
      required: true,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    location: {
      type: {
        region: {
          type: Number,
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
        address: {
          type: String,
        },
      },
      required: true,
    },
  },
  { timestamps: true },
);

eventSchema.pre("save", function () {
  if (!this.slug) {
    const slug = this.name.split(" ").join("-").toLowerCase();

    this.slug = `${slug}`;
  }
});

eventSchema.index({ name: "text", description: "text" });

const EventModel = mongoose.model<Event>("Event", eventSchema);

export default EventModel;
