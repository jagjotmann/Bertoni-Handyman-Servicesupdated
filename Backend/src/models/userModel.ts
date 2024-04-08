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
  username: string;
  password: string;
  name: Name;
  contactInfo: ContactInfo;
  properties: Property[];
  // Add these fields for password reset
resetPasswordToken: String,
resetPasswordExpires: Date,
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 25,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // for password reset
  resetPasswordToken: {
  type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  // Keeping track of Login Attempts
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },

  // personal Info
  name: {
    firstName: {
      type: String,
      maxlength: 100,
    },
    lastName: {
      type: String,
      maxlength: 100,
    },
  },
  contactInfo: {
    phoneNumber: {
      type: String,
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
