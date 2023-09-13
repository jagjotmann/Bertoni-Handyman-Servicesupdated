import mongoose, { Document, Schema } from "mongoose";

interface ContactInfo {
  phoneNumber: string;
  email: string;
}

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Property {
  address: Address;
  completedJobs: string[];
}

interface Name {
  firstName: string;
  lastName: string;
}

export interface User extends Document {
  name: Name;
  contactInfo: ContactInfo;
  properties: Property[];
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
  },
  name: {
    firstName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100,
    },
  },
  contactInfo: {
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  properties: [
    {
      address: {
        streetAddress: String,
        city: String,
        state: String,
        zipCode: String,
      },
      completedJobs: [String],
    },
  ],
  isAdmin: Boolean,
});

const User = mongoose.model<User>("User", UserSchema);

export default User;
