import mongoose from 'mongoose';

interface IUser {
  guildId: string;
  userId: string;
  money: number;
  credit: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    guildId: { type: String, required: true, index: 1 },
    userId: { type: String, required: true, index: 1 },
    money: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
