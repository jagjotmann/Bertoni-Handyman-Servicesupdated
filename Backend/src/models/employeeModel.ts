import mongoose, { Document, Schema } from "mongoose";

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}
const addressSchema = new mongoose.Schema({
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String
});

/* Placeholder to remember this is possible
const availableSchema = new mongoose.Schema({
    //Might be necessary, just in case the schedule API doesn't work the way I assume it does
    //maybe manually keep track of availabilities from the employees schedule (not ideal)
});
*/
interface Job {
  title: string;
  rate: number;
}

const JobSchema = new mongoose.Schema({
    //This is for the type of job (ie. tiling, roofing, brickwork, plumbing, electrical)
    title: String,
    rate: Number, //optional for default rates for certain job types
  });

  interface Employee extends Document {
    name: {
      firstName: string;
      lastName: string;
    };
    contactInfo: {
      phoneNumber: string;
      email: string;
    };
    jobs: Array<{
      address: Address;
      completed: boolean;
    }>;
    googleCalendar: {
      apiKey: string;
    };
    qualifications: Job[];
  }
  const EmployeeSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      maxlength: 100
    },
    lastName: {
      type: String,
      maxlength: 100
    }
  },
  contactInfo: {
    phoneNumber: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  jobs: [{ //Theoretically a list of jobs this employee has done
    address: addressSchema,
    completed: Boolean,
  }],
  googleCalendar: {
    apiKey: String, //or OAuth token

    // Other fields for Google Calendar integration
  },
  qualifications: [JobSchema],
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
