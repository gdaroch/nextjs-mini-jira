import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 80,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

export const ProjectModel = models.Project || model("Project", ProjectSchema);
