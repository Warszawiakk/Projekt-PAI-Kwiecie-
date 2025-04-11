import mongoose, { Schema, models } from 'mongoose';

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    city: {
      type: String,
      enum: [
        'Warszawa',
        'Kraków',
        'Wrocław',
        'Poznań',
        'Gdańsk',
        'Łódź',
        'Katowice',
        'Szczecin',
        'Lublin',
        'Białystok',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Event || mongoose.model('Event', EventSchema);
