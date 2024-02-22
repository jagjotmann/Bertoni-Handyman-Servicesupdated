import mongoose, { Document, Schema } from "mongoose";

interface Status extends Document {
  _id: mongoose.Schema.Types.ObjectId; // Unique identifier for each status
  name: string; // Human-readable name of the status
}

const StatusSchema: Schema = new Schema<Status>({
  name: {
    type: String,
    required: true,
    unique: true, // Assuming each status name is unique
  },
});

const StatusModel = mongoose.model<Status>("Status", StatusSchema);

export default StatusModel;
