import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "just_added"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // in js you can use only mongoose.ObjectId
    required: true,
  },
});
export const Task = mongoose.models.task || mongoose.model("task", taskSchema);

// task here is actually is a collection that is going to be added to the database.
