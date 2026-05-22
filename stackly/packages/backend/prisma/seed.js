const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Seed Users
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@example.com' },
    update: {},
    create: {
      email: 'patient@example.com',
      password,
      role: 'PATIENT',
      profile: { create: { firstName: 'John', lastName: 'Doe' } }
    }
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@example.com' },
    update: {},
    create: {
      email: 'doctor@example.com',
      password,
      role: 'DOCTOR',
      profile: { create: { firstName: 'Jane', lastName: 'Smith' } }
    }
  });

  // Seed Hospital Data
  const doctor = await prisma.doctor.create({
    data: {
      userId: doctorUser.id,
      firstName: 'Jane',
      lastName: 'Smith',
      specialization: 'Cardiology',
      department: 'Heart Center'
    }
  });

  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'patient@example.com',
      dob: new Date('1990-01-01'),
      gender: 'MALE'
    }
  });

  const ward = await prisma.ward.create({
    data: { name: 'Ward A', type: 'GENERAL' }
  });

  const bed = await prisma.bed.create({
    data: { number: '101', wardId: ward.id }
  });

  // Seed Pharmacy
  const supplier = await prisma.supplier.create({
    data: { name: 'PharmaCorp', contact: '123-456-7890' }
  });

  await prisma.medicine.create({
    data: {
      name: 'Amoxicillin',
      price: 15.0,
      stock: 100,
      expiryDate: new Date('2025-12-31'),
      supplierId: supplier.id
    }
  });

  // Seed Insurance
  const policy = await prisma.insurancePolicy.create({
    data: { name: 'Gold Plan', type: 'HEALTH', coverage: 100000, premium: 500 }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
