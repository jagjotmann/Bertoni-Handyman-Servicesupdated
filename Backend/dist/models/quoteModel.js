"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Assuming the enum QuoteStatus is used elsewhere and might be useful for validation or filtering
var QuoteStatus;
(function (QuoteStatus) {
  QuoteStatus["Pending"] = "pending";
  QuoteStatus["Approved"] = "approved";
  QuoteStatus["Denied"] = "denied";
  QuoteStatus["Completed"] = "completed";
})(QuoteStatus || (QuoteStatus = {}));
const QuoteSchema = new mongoose_1.Schema({
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
    type: mongoose_1.default.Schema.Types.ObjectId,
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
});
// Custom validation to ensure either email or phone is provided
QuoteSchema.path("contactPerson").validate(function (value) {
  return value.email || value.phone; // Ensures at least one contact method is provided
}, "Either an email or phone number must be provided.");
// Placeholder for custom methods you might want to add
// Example: QuoteSchema.methods.calculateTotalCost = function() { /* implementation */ };
const QuoteModel = mongoose_1.default.model("Quote", QuoteSchema);
exports.default = QuoteModel;
