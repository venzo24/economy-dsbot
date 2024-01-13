import mongoose from 'mongoose';

interface ILog {
  guildId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  bizId: number;
  bizfin: number[];
  bizNalog: number[];
  bizZam: string[];
}

const logSchema = new mongoose.Schema<ILog>(
  {
    guildId: { type: String, required: true, index: 1 },
    userId: { type: String, required: true, index: 1 },
    bizfin: { type: [Number], default: [] },
    bizNalog: { type: [Number], default: [] },
    bizZam: { type: [String], default: [] },
    bizId: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model<ILog>('Log', logSchema);
