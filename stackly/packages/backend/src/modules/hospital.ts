import { Router } from 'express';
import prisma from '../database/prisma';

const router = Router();

// Hospital Management
router.get('/patients', async (req, res) => {
  const patients = await prisma.patient.findMany();
  res.json(patients);
});

router.post('/patients', async (req, res) => {
  const patient = await prisma.patient.create({ data: req.body });
  res.json(patient);
});

router.get('/doctors', async (req, res) => {
  const doctors = await prisma.doctor.findMany();
  res.json(doctors);
});

// Telemedicine
router.post('/appointments', async (req, res) => {
  const appointment = await prisma.appointment.create({ data: req.body });
  res.json(appointment);
});

// Pharmacy
router.get('/medicines', async (req, res) => {
  const medicines = await prisma.medicine.findMany();
  res.json(medicines);
});

// Mock Service Dashboard data
let mockLogs: any[] = [];
router.get('/mock-logs', (req, res) => res.json(mockLogs));
router.post('/mock-notify', (req, res) => {
  mockLogs.push({ ...req.body, timestamp: new Date() });
  res.json({ success: true });
});

export default router;
