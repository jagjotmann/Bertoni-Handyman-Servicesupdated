import mongoose, { Document, Schema } from "mongoose";

interface Materials {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Labor {
  name: string;
  description?: string;
  numHours: number;
  hourlyRate: number;
  total: number;
}

export interface Quote extends Document {
  quoteDate: Date;
  project: {
    name: string;
    address: {
      streetAddress: string;
      streetAddress2?: string;
      city: string;
      state: string;
      zipCode: string;
    };
    description?: string;
  };
  quoteStatus: String;
  items?: Materials[];
  labor?: Labor[];
  subtotal: number;
  tax?: number;
  totalCost: number;
  notes?: string;
  preferredEndDate: Date;
  contactPerson: {
    name: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
  scheduled: boolean;
  htmlContent: String;
}

const QuoteSchema: Schema = new Schema<Quote>({
  quoteDate: {
    type: Date,
    required: true,
  },
  project: {
    name: {
      type: String,
    },
    address: {
      streetAddress: {
        type: String,
      },
      streetAddress2: String,
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
    description: String,
  },
  quoteStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Accepted", "Declined", "Completed"],
    default: "Pending",
  },
  items: [
    {
      name: {
        type: String,
      },
      description: String,
      quantity: {
        type: Number,
        min: 1,
      },
      unitPrice: {
        type: Number,
        min: 0,
      },
      total: {
        type: Number,
        min: 0,
      },
    },
  ],
  labor: [
    {
      name: {
        type: String,
      },
      description: String,
      numHours: {
        type: Number,
        min: 0,
      },
      hourlyRate: {
        type: Number,
        min: 0,
      },
      total: {
        type: Number,
        min: 0,
      },
    },
  ],
  subtotal: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  notes: String,
  preferredEndDate: Date,
  contactPerson: {
    name: {
      type: String,
    },
    companyName: String,
    email: String,
    phone: String,
  },
  scheduled: {
    type: Boolean,
  },
  htmlContent: {
    type: String,
  },
});

// Custom validation to ensure either email or phone is provided
// QuoteSchema.path('contactPerson').validate(function (value) {
//   return value.email || value.phone; // Ensures at least one contact method is provided
// }, 'Either an email or phone number must be provided.');

// Placeholder for custom methods you might want to add
// Example: QuoteSchema.methods.calculateTotalCost = function() { /* implementation */ };

const QuoteModel = mongoose.model<Quote>("Quote", QuoteSchema);

export default QuoteModel;
