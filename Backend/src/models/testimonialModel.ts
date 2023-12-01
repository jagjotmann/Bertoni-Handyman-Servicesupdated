import mongoose, { Document, Schema } from "mongoose";

export interface Testimonial extends Document{
    author: mongoose.Schema.Types.ObjectId;
    date: Date;
    content: string;
    rating: number
}

const TestimonialSchema: Schema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
  },
    date:{
        type: Date,
        required: true
    },
    content:{
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    }
})

const Testimonial = mongoose.model<Testimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
