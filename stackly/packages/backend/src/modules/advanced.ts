import { Router } from 'express';
import prisma from '../database/prisma';
import Analytics from '../models/Analytics';

const router = Router();

// Monitoring
router.get('/devices/:patientId', async (req, res) => {
  const devices = await prisma.ioTDevice.findMany({
    where: { patientId: req.params.patientId }
  });
  res.json(devices);
});

// Analytics
router.get('/risk-score/:patientId', async (req, res) => {
  // Logic to calculate risk score based on vitals (mocked for now)
  const score = Math.floor(Math.random() * 100);
  let risk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (score > 70) risk = 'HIGH';
  else if (score > 40) risk = 'MEDIUM';

  const analytics = new Analytics({
    patientId: req.params.patientId,
    score,
    risk,
    vitalsSnapshot: {
        heartRate: 60 + Math.floor(Math.random() * 40),
        bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`
    }
  });

  await analytics.save();
  res.json(analytics);
});

router.get('/analytics-history/:patientId', async (req, res) => {
    const history = await Analytics.find({ patientId: req.params.patientId }).sort({ timestamp: -1 });
    res.json(history);
});

export default router;
