import { AutoIncrementID, type AutoIncrementIDOptions } from '@typegoose/auto-increment';
import { Schema, model } from 'mongoose';

export interface Ibiz {
  _id: number;
  guildId: string;
  userId: string;
  bizId: number;
  bizfin: number;
  bizNalog: number;
  bizZam: string[];
  createdAt: Date;
  updatedAt: Date;
}

const biz = new Schema<Ibiz>(
  {
    _id: { type: Number },
    guildId: { type: String, required: true, index: 1 },
    userId: { type: String, required: true, index: 1 },
    bizId: { type: Number, required: true },
    bizfin: { type: Number, default: 0 },
    bizNalog: { type: Number, default: 0 },
    bizZam: { type: [String], default: [] },
  },
  { versionKey: false, timestamps: true },
);

export const bizTypes: BizTypes = {
  1: { price: 1000, fin: 10, nalog: 200, name: 'кафе' },
  2: { price: 2000, fin: 10, nalog: 200, name: 'бар' },
  3: { price: 3000, fin: 10, nalog: 200, name: 'ресторан' },
};

const incOptions: AutoIncrementIDOptions = { startAt: 1 };
biz.plugin(AutoIncrementID, incOptions);
export default model<Ibiz>('biz', biz);

interface BizTypes {
  [bizType: number]: BizType | undefined;
}

export interface BizType {
  price: number;
  fin: number;
  nalog: number;
  name: string;
}
