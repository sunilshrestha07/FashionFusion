import mongoose from 'mongoose';

const fcmSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const FcmToken = mongoose.models.FcmToken || mongoose.model('FcmToken', fcmSchema);
export default FcmToken;
