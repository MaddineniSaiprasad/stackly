import mongoose, { Schema, Document } from 'mongoose';

export interface ILabResult extends Document {
  patientId: string;
  testId: string;
  results: Record<string, any>;
  status: 'PENDING' | 'FINAL';
  date: Date;
}

const LabResultSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  testId: { type: String, required: true },
  results: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['PENDING', 'FINAL'], default: 'PENDING' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<ILabResult>('LabResult', LabResultSchema);
