import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../database/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("JWT_SECRET not set in environment. Using default 'development_secret'.");
}

const secret = JWT_SECRET || 'development_secret';

router.post('/register', async (req, res) => {
  const { email, password, role, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'PATIENT',
        profile: {
          create: {
            firstName,
            lastName,
          }
        }
      },
      include: {
        profile: true
      }
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, secret);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, secret);
  res.json({ user, token });
});

export default router;
