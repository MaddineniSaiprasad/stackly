import mongoose, { Schema, Document } from 'mongoose';

export interface IPrescription extends Document {
  patientId: string;
  doctorId: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  date: Date;
  status: 'PENDING' | 'DISPENSED';
}

const PrescriptionSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true }
  }],
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'DISPENSED'], default: 'PENDING' }
});

export default mongoose.model<IPrescription>('Prescription', PrescriptionSchema);
