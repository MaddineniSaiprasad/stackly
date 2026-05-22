# Stackly - AI Healthcare Ecosystem

A comprehensive AI Healthcare web application with 8 integrated modules.

## Modules
1. **Hospital Management**: Patient/Doctor profiles, bed allocation.
2. **Telemedicine**: WebRTC video consultations.
3. **Pharmacy**: Inventory and prescription processing.
4. **Laboratory**: Test catalog and result management.
5. **Health Insurance**: Policy and claims management.
6. **Appointment Scheduling**: Doctor availability and booking.
7. **Remote Patient Monitoring**: Real-time IoT vitals simulation.
8. **Medical Analytics & AI**: Rule-based risk scoring and visualizations.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Material-UI, Redux Toolkit, Socket.io-client, Chart.js, Simple-Peer.
- **Backend**: Node.js, Express, TypeScript, Prisma (PostgreSQL), Mongoose (MongoDB), Socket.io.
- **Infrastructure**: Docker Compose (PostgreSQL, MongoDB).

## Setup
1. Install dependencies: `pnpm install`
2. Start databases: `docker-compose up -d`
3. Setup database: `cd packages/backend && npx prisma db push && npx prisma db seed`
4. Run development servers: `pnpm dev`

## Default Credentials
- **Patient**: `patient@example.com` / `password123`
- **Doctor**: `doctor@example.com` / `password123`
