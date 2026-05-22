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
- **Databases**: Local PostgreSQL and MongoDB (Windows).

## Prerequisites (Windows)
Install the following using Windows Package Manager (`winget`):

### 1. PostgreSQL
```powershell
winget install PostgreSql.PostgreSql.15
```
*Note: During installation, set the password for the `postgres` user to `password123` (or update it in `packages/backend/.env`).*

### 2. MongoDB
```powershell
winget install MongoDB.Server
```

## Setup
1. **Install dependencies**:
   ```powershell
   pnpm install
   ```
2. **Configure Environment**:
   - Navigate to `packages/backend`.
   - Copy `.env.example` to `.env`.
   - Ensure your database credentials match.

3. **Initialize PostgreSQL**:
   ```powershell
   cd packages/backend
   npx prisma db push
   npx prisma db seed
   ```

4. **Run development servers**:
   ```powershell
   pnpm dev
   ```

## Default Credentials
- **Patient**: `patient@example.com` / `password123`
- **Doctor**: `doctor@example.com` / `password123`

## Docker (Alternative/Production)
You can still use Docker if preferred:
```bash
docker-compose up -d
```
