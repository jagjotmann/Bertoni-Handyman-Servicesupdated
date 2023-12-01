import mongoose, { Document, Schema } from "mongoose";

interface Materials {
  name: string;
  description?: string; //not sure if useful
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Labor {
    name: string;
    description?: string; //not sure if useful
    numHours: number;
    hourlyRate: number;
    total: number; //numHours * hourlyRate calculated here to reduce calculations
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
      description?: string; //not sure if useful
    };
    quoteStatus: string; //quote completion status
    items?: Materials[];
    labor?: Labor[];
    subtotal: number; //pre-tax cost
    tax?: number;
    totalCost: number; //post-tax cost
    notes?: string; //not sure if useful
    contactPerson: { //contact is client for all intents and purposes
      name: string;
      companyName?: string;
      email?: string;
      phone?: string;
    };
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
  quoteStatus: {
    type: String,
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
    email: String, //Ideally would require one of email or phone
    phone: String,
  },
});

const QuoteModel = mongoose.model<Quote>("Quote", QuoteSchema);

export default QuoteModel;