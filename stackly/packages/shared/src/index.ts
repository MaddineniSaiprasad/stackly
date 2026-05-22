// User & Auth
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  PHARMACIST = 'PHARMACIST',
  LAB_TECH = 'LAB_TECH',
  INSURANCE_AGENT = 'INSURANCE_AGENT'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Medical
export interface Prescription {
  id: string;
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

export interface LabResult {
  id: string;
  patientId: string;
  testId: string;
  results: Record<string, any>;
  status: 'PENDING' | 'FINAL';
  date: Date;
}

export interface VitalSigns {
  patientId: string;
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  timestamp: Date;
}
