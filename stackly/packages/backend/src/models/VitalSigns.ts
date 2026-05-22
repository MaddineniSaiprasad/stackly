import mongoose, { Schema, Document } from 'mongoose';

export interface IVitalSigns extends Document {
  patientId: string;
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  timestamp: Date;
}

const VitalSignsSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
  oxygenSaturation: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IVitalSigns>('VitalSigns', VitalSignsSchema);
