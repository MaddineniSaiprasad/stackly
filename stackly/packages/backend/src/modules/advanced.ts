import { Router } from 'express';
import prisma from '../database/prisma';

const router = Router();

// Monitoring
router.get('/devices/:patientId', async (req, res) => {
  const devices = await prisma.ioTDevice.findMany({
    where: { patientId: req.params.patientId }
  });
  res.json(devices);
});

// Analytics (Simple Rule-based)
router.get('/risk-score/:patientId', async (req, res) => {
  // Logic to calculate risk score based on vitals (mocked for now)
  const score = Math.floor(Math.random() * 100);
  let risk = 'LOW';
  if (score > 70) risk = 'HIGH';
  else if (score > 40) risk = 'MEDIUM';

  res.json({ patientId: req.params.patientId, score, risk });
});

export default router;
