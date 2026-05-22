import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  patientId: string;
  score: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  vitalsSnapshot: {
    heartRate: number;
    bloodPressure: string;
  };
  timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  score: { type: Number, required: true },
  risk: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], required: true },
  vitalsSnapshot: {
    heartRate: { type: Number },
    bloodPressure: { type: String }
  },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
