import mongoose, { Document, Schema } from "mongoose";

// Assuming the enum QuoteStatus is used elsewhere and might be useful for validation or filtering
enum QuoteStatus {
  Pending = "pending",
  Approved = "approved",
  Denied = "denied",
  Completed = "completed",
}

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
  status: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Status";
    required: true;
  };
  items?: Materials[];
  labor?: Labor[];
  subtotal: number;
  tax?: number;
  totalCost: number;
  notes?: string;
  contactPerson: {
    name: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
  scheduled: boolean;
}

const QuoteSchema: Schema = new Schema<Quote>({
  quoteDate: {
    type: Date,
    required: true,
  },
  project: {
    name: {
      type: String,
      required: true,
    },
    address: {
      streetAddress: {
        type: String,
        required: true,
      },
      streetAddress2: String,
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
    description: String,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  labor: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      numHours: {
        type: Number,
        required: true,
        min: 0,
      },
      hourlyRate: {
        type: Number,
        required: true,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
  notes: String,
  contactPerson: {
    name: {
      type: String,
      required: true,
    },
    companyName: String,
    email: String,
    phone: String,
  },
  scheduled: {
    type: Boolean,
    default: false,
  },
});

// Custom validation to ensure either email or phone is provided
QuoteSchema.path('contactPerson').validate(function (value) {
  return value.email || value.phone; // Ensures at least one contact method is provided
}, 'Either an email or phone number must be provided.');

// Placeholder for custom methods you might want to add
// Example: QuoteSchema.methods.calculateTotalCost = function() { /* implementation */ };

const QuoteModel = mongoose.model<Quote>("Quote", QuoteSchema);

export default QuoteModel;
