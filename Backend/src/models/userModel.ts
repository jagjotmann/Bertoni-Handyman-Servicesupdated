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
  resetPasswordToken: string | null; // Allow string or null
  resetPasswordExpires: Date | null; // Allow Date or null
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
  // for password reset
  resetPasswordToken: {
    type: String,
    index: true,
    default: null, // Explicitly allows null
  },
  resetPasswordExpires: {
    type: Date,
    default: null, // Explicitly allows null
  },
  contactInfo: {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Adds an index on the email field
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
