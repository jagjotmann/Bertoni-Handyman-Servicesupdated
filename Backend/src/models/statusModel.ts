import mongoose, { Document, Schema } from "mongoose";

interface Status extends Document {
  statusId: number; // Unique identifier for each status
  name: string; // Human-readable name of the status
}

const StatusSchema: Schema = new Schema<Status>({
  statusId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true, // Assuming each status name is unique
  },
});

const StatusModel = mongoose.model<Status>("Status", StatusSchema);

export default StatusModel;
