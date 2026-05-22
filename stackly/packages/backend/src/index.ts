import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './modules/auth';
import hospitalRoutes from './modules/hospital';
import supportingRoutes from './modules/supporting';
import advancedRoutes from './modules/advanced';
import { connectDB } from './database/mongoose';
import VitalSigns from './models/VitalSigns';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/supporting', supportingRoutes);
app.use('/api/advanced', advancedRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// IoT Simulation & Monitoring
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('subscribe-vitals', (patientId) => {
    const interval = setInterval(async () => {
      const vitalsData = {
        patientId,
        heartRate: 60 + Math.floor(Math.random() * 40),
        bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`,
        temperature: 36.5 + (Math.random() * 1.5),
        oxygenSaturation: 95 + Math.floor(Math.random() * 5),
        timestamp: new Date()
      };

      // Persist to MongoDB
      try {
          const vitals = new VitalSigns(vitalsData);
          await vitals.save();
      } catch (err) {
          console.error('Error persisting vitals:', err);
      }

      socket.emit('vitals-update', vitalsData);
    }, 2000);

    socket.on('disconnect', () => clearInterval(interval));
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('offer', ({ offer, roomId }) => {
    socket.to(roomId).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ answer, roomId }) => {
    socket.to(roomId).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ candidate, roomId }) => {
    socket.to(roomId).emit('ice-candidate', { candidate, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
