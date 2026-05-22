import { Router } from 'express';
import prisma from '../database/prisma';
import LabResult from '../models/LabResult';
import Prescription from '../models/Prescription';

const router = Router();

// Laboratory
router.get('/tests', async (req, res) => {
  const tests = await prisma.labTest.findMany();
  res.json(tests);
});

router.get('/lab-results/:patientId', async (req, res) => {
  const results = await LabResult.find({ patientId: req.params.patientId });
  res.json(results);
});

router.post('/lab-results', async (req, res) => {
  const result = new LabResult(req.body);
  await result.save();
  res.json(result);
});

// Pharmacy
router.get('/prescriptions/:patientId', async (req, res) => {
  const prescriptions = await Prescription.find({ patientId: req.params.patientId });
  res.json(prescriptions);
});

router.post('/prescriptions', async (req, res) => {
  const prescription = new Prescription(req.body);
  await prescription.save();
  res.json(prescription);
});

// Insurance
router.get('/policies', async (req, res) => {
  const policies = await prisma.insurancePolicy.findMany();
  res.json(policies);
});

router.post('/claims', async (req, res) => {
  const claim = await prisma.claim.create({ data: req.body });
  res.json(claim);
});

// Scheduling
router.get('/schedules/:doctorId', async (req, res) => {
  const schedules = await prisma.schedule.findMany({
    where: { doctorId: req.params.doctorId }
  });
  res.json(schedules);
});

export default router;
