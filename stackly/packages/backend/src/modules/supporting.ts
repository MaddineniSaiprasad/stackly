import { Router } from 'express';
import prisma from '../database/prisma';

const router = Router();

// Laboratory
router.get('/tests', async (req, res) => {
  const tests = await prisma.labTest.findMany();
  res.json(tests);
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
