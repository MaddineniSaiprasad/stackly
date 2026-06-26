# Master End-to-End Test Plan & Detailed Test Cases

## 1. Test Plan Overview

### 1.1 Purpose
This document defines the Master Test Plan and detailed test cases for the **AI Health Care and Telecommunication Ecosystem**. The goal is to verify system integrity, end-to-end data flow, HIPAA compliance, security assertions, and cross-microservice communication under realistic conditions.

### 1.2 Scope
*   **In Scope**:
    *   End-to-End (E2E) verification of patient journeys across Web Portal, Mobile Apps, AWS API Gateway, Microservices, databases (PostgreSQL, MongoDB), and AWS services (SQS, SNS, Kinesis, HealthLake).
    *   Integration, Contract, Security, Performance, and Recovery testing.
*   **Out Scope**: Third-party payment clearing network internals, physical IoT hardware calibration, and cellular carrier infrastructure.

### 1.3 Test Environment Strategy
*   **Staging Environment**: A multi-AZ environment in AWS EKS mimicking production.
*   **Local Simulation**: 
    *   **LocalStack**: Emulating AWS SQS, SNS, S3, and Cognito.
    *   **Testcontainers**: Ephemeral Docker instances of PostgreSQL, Redis, and DocumentDB (MongoDB) for integration isolation.
*   **Test Data Provisioning**: Synthetic, HL7 FHIR R4-compliant data generated via seed scripts. Zero real patient PII is used.
*   **Stubs & Emulators**: Mock payment gateway response payloads and SMS/Email gateway interfaces.

---

## 2. Test Cases Specification

### Suite 1: Telemedicine & Scheduling (TC-TELE)

#### TC-TELE-001: Patient Books Appointment (Success Path)
*   **Preconditions**: 
    *   Patient account is registered and authenticated via AWS Cognito.
    *   Doctor specializations and schedules are pre-populated in RDS PostgreSQL.
*   **Test Data / Inputs**:
    *   Patient ID: `pat_839021`
    *   Doctor ID: `doc_771029`
    *   Desired Time Slot: `2026-06-12T10:00:00Z`
*   **Test Steps**:
    1.  Send HTTP POST request to `/api/v1/appointments/book` with the inputs and JWT header.
    2.  Assert HTTP status is `201 Created` with an `appointmentId`.
    3.  Verify database state:
        *   Query RDS PostgreSQL: Verify the slot status for `doc_771029` at `10:00:00Z` is updated from `Available` to `Reserved`.
    4.  Verify event dispatch:
        *   Interrogate AWS SNS/SQS mock: Ensure a message is dispatched to the `appointment-created-queue` containing the `appointmentId`.
*   **Expected Results**:
    *   Appointment is saved with status `Scheduled`.
    *   Slot is locked preventing double-booking.
    *   SQS receives correct JSON payload.
*   **HIPAA & Security Check**:
    *   Ensure JWT contains proper scopes (`patient:write`).
    *   Verify the appointment payload in SQS and RDS is encrypted at rest (AES-256).

#### TC-TELE-002: Concurrent Booking Conflict (Edge Case)
*   **Preconditions**: 
    *   Two authenticated patients try to book the exact same slot for the same doctor at the same millisecond.
*   **Test Data / Inputs**:
    *   Patient A: `pat_a_101`, Patient B: `pat_b_202`
    *   Doctor ID: `doc_555`
    *   Slot: `2026-06-12T11:00:00Z`
*   **Test Steps**:
    1.  Fire concurrent asynchronous HTTP POST requests to `/api/v1/appointments/book` using a load injector (e.g., k6) for Patient A and Patient B.
*   **Expected Results**:
    *   One request succeeds with HTTP `201 Created`.
    *   The second request fails with HTTP `409 Conflict` and a clear error message: `"Selected slot has already been booked"`.
    *   Query RDS: Verify only one booking record exists.
*   **HIPAA & Security Check**:
    *   Error message must not leak internal database schemas or patient details.

#### TC-TELE-003: Video Consult Session Stream & Medical Analysis (End-to-End Flow)
*   **Preconditions**:
    *   Appointment is scheduled and status is `Active`.
    *   Patient and Doctor are authenticated.
*   **Test Data / Inputs**:
    *   Appointment ID: `apt_991823`
    *   Simulated Video Feed: 5-minute WebRTC standard test stream.
    *   Doctor Clinical Note: `"Patient presents with acute throat pain, temp 101.4F. Prescribed Amoxicillin 500mg tid for 7 days."`
*   **Test Steps**:
    1.  Call `/api/v1/telemedicine/sessions/apt_991823/start`. Verify Kinesis Video Stream credentials and signaling channel URI are returned.
    2.  Establish signaling connection and stream video packets. Assert zero package loss for 60 seconds.
    3.  Doctor posts the clinical notes text to `/api/v1/telemedicine/consultations/apt_991823/complete`.
    4.  Verify integration with **Amazon Comprehend Medical**:
        *   Intercept downstream request to Amazon Comprehend Medical.
        *   Assert parser returns detected entities:
            *   Medication Name: `Amoxicillin`
            *   Dosage: `500mg`
            *   Frequency: `tid` (Three times a day)
            *   Duration: `7 days`
    5.  Verify the parsed medication triggers automatic prescription creation in DocumentDB.
*   **Expected Results**:
    *   WebRTC signalling completes successfully.
    *   Comprehend Medical extracts accurate FHIR-compliant clinical entities.
    *   Prescription status is updated to `Pending Pharmacy`.

#### TC-TELE-004: Network Disconnection & Auto-Resume (Recovery Case)
*   **Preconditions**:
    *   Kinesis Video Session is active between Patient and Doctor.
*   **Test Steps**:
    1.  Simulate a sudden client network drop (block outbound signaling packets for 15 seconds).
    2.  Restore network connection.
    3.  Verify Kinesis Signaling SDK initiates reconnection handshake.
    4.  Verify call state recovers without prompting users to re-login.
*   **Expected Results**:
    *   WebRTC stream auto-reconnects within 5 seconds of network restoration.
    *   Call session history logs the interruption event without crashing.

---

### Suite 2: Hospital & Ward Management (TC-HOSP)

#### TC-HOSP-001: Inpatient Admission & Bed Allocation
*   **Preconditions**:
    *   Patient is registered in the system.
    *   Ward 4B has Bed 12 available (Redis status: `free`).
*   **Test Data / Inputs**:
    *   Patient ID: `pat_hosp_09`
    *   Ward ID: `ward_4B`, Bed ID: `bed_12`
*   **Test Steps**:
    1.  Send POST request to `/api/v1/hospital/admissions` to admit the patient.
    2.  Send POST request to `/api/v1/hospital/wards/allocate-bed` with `patientId`, `wardId`, and `bedId`.
    3.  Assert HTTP status is `200 OK`.
    4.  Attempt a second booking for `bed_12` before release.
*   **Expected Results**:
    *   Admissions record updated in PostgreSQL.
    *   Redis cache state for `ward_4B:bed_12` is set to `occupied`.
    *   Second allocation attempt returns `400 Bad Request` with message `"Bed already occupied"`.

#### TC-HOSP-002: Inpatient Discharge & Automated Billing Generation
*   **Preconditions**:
    *   Patient is admitted and allocated a bed.
    *   Treatment logs (Medication: $120.00, Room Charge: $250.00/day for 2 days) are attached to the admission record.
*   **Test Data / Inputs**:
    *   Admission ID: `adm_3002`
*   **Test Steps**:
    1.  Send POST request to `/api/v1/hospital/admissions/adm_3002/discharge`.
    2.  Query RDS PostgreSQL: Assert Admission status is updated to `Discharged`.
    3.  Query `/api/v1/billing/invoices/adm_3002`.
*   **Expected Results**:
    *   Room availability status in Redis resets to `free`.
    *   The generated invoice calculates: `(250.00 * 2) + 120.00 = $620.00`.
    *   Invoice status is set to `Pending Settlement`.

---

### Suite 3: Pharmacy & Inventory (TC-PHAR)

#### TC-PHAR-001: Prescription Validation & Medication Dispense (Success Path)
*   **Preconditions**:
    *   Prescription is created in DocumentDB with status `Pending Pharmacy`.
    *   Amoxicillin is in stock (RDS Quantity: 50 units).
*   **Test Data / Inputs**:
    *   Prescription ID: `presc_88201`
*   **Test Steps**:
    1.  Send POST request to `/api/v1/pharmacy/dispense` with `prescriptionId: presc_88201`.
    2.  Assert HTTP status is `200 OK`.
    3.  Query RDS database for Amoxicillin stock count.
*   **Expected Results**:
    *   Prescription status changes to `Dispensed`.
    *   Amoxicillin stock level decrements from 50 to 49.
    *   A notification event is sent to Amazon Pinpoint SMS for patient pick-up notification.

#### TC-PHAR-002: Out-of-Stock Trigger & SQS Supplier Reorder (Edge Path)
*   **Preconditions**:
    *   Stock of Ibuprofen is 1 unit.
    *   Reorder threshold is set to 2 units.
*   **Test Steps**:
    1.  Process a dispense transaction for 1 unit of Ibuprofen.
    2.  Assert stock level is now 0.
    3.  Listen to the AWS SQS `supplier-reorder-queue`.
*   **Expected Results**:
    *   A message is published to the SQS queue containing: `{"item": "Ibuprofen", "quantity": 100, "supplierId": "sup_99"}`.
    *   Stock status in database is set to `Out of Stock / Reordered`.

---

### Suite 4: Remote Patient Monitoring (TC-RPM)

#### TC-RPM-001: Ingestion of IoT Vitals & Threshold Breach Notification
*   **Preconditions**:
    *   Patient IoT wearable device is paired with device ID `iot_wearable_404`.
    *   Vitals thresholds set for Patient: Max Heart Rate = 120 bpm.
*   **Test Data / Inputs**:
    *   Device Payload: `{"deviceId": "iot_wearable_404", "patientId": "pat_222", "heartRate": 145, "spO2": 96, "timestamp": 1778668800}`
*   **Test Steps**:
    1.  Publish the payload directly to AWS IoT Core topic `vitals/iot_wearable_404`.
    2.  Observe the downstream processing pipeline:
        *   Verify the data points are saved to Amazon Timestream.
        *   Verify the anomaly triggers the rule: `heartRate > 120`.
    3.  Assert an Amazon SNS message is dispatched to the doctor's alert topic.
    4.  Verify AWS AppSync pushes a WebSocket update payload containing the anomaly to the Doctor's active dashboard.
*   **Expected Results**:
    *   Timestream contains a new row.
    *   Alert is triggered and pushed in under 2 seconds.
    *   Doctor's dashboard displays a high-priority alert indicator.

---

### Suite 5: Insurance Claim Processing (TC-INS)

#### TC-INS-001: Claim Submission, Policy Check, and Split Settlement
*   **Preconditions**:
    *   Patient insurance policy is active with 80% coverage and $100 deductible.
    *   Invoice of $500 is generated.
*   **Test Data / Inputs**:
    *   Invoice ID: `inv_9091`
*   **Test Steps**:
    1.  Send POST request to `/api/v1/insurance/claims/submit` with `invoiceId: inv_9091`.
    2.  Verify the policy verification engine checks coverage rules.
    3.  Assert the resulting split:
        *   Insurance covers: `(500 - 100) * 0.80 = $320`
        *   Patient co-pay covers: `$100 + (400 * 0.20) = $180`
    4.  Query the database to verify patient co-pay invoice is created for `$180` and the insurance claim status is `Approved`.
*   **Expected Results**:
    *   Claim auto-approved.
    *   Co-pay calculation is numerically accurate.
    *   Split invoices are recorded correctly.

---

## 3. End-to-End Test Matrix & Coverage Traceability

| Test Case ID | Module | Feature Tested | Inputs | Expected Output | HIPAA Assertion |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-TELE-001** | Telemedicine | Appointment Booking | Patient, Doctor, Slot | `201 Created`, Slot Reserved | Token verification, Encrypted data |
| **TC-TELE-002** | Telemedicine | Concurrent Bookings | Match timestamps | `409 Conflict` | Error response does not leak PII |
| **TC-TELE-003** | Telemedicine | Video Consult & AI | Stream + Notes | Entity extraction, Prescription | Notes parsed and saved securely |
| **TC-TELE-004** | Telemedicine | Call Recovery | Disconnect socket | Automatic video stream recovery | Session key rotation checked |
| **TC-HOSP-001** | Hospital | Inpatient Bed Booking | Patient, Ward, Bed | Bed status `occupied` in Redis | Access controls checked |
| **TC-HOSP-002** | Hospital | Discharge Billing | Admission ID | Invoice calculated & Bed freed | Invoice details encrypted |
| **TC-PHAR-001** | Pharmacy | Dispense medication | Prescription ID | Stock decremented, SMS alert | SMS contains no sensitive diagnostic info |
| **TC-PHAR-002** | Pharmacy | Inventory Reorder | Dispense last unit | SQS reorder request generated | Inventory data is anonymized |
| **TC-RPM-001** | RPM | IoT Ingestion & Alert | High Heart Rate | SNS alert, Timestream point | Device ID mapping is hashed |
| **TC-INS-001** | Insurance | Claim Settlement | Invoice ID | 80/20 copay split invoice | Claim codes sent encrypted |

---

## 4. Test Execution & Reporting

### 4.1 Running Tests Locally
Ensure Docker is active, then execute:
```bash
# Run Unit and Component tests
npm run test

# Run microservice integration tests with Testcontainers
npm run test:integration

# Run system contract testing
npm run test:pact

# Run Web E2E tests via Playwright
npx playwright test

# Run Mobile E2E tests via Detox (iOS simulator example)
detox test --configuration ios.sim.debug
```

### 4.2 Quality Gate Thresholds
*   **Code Coverage**: Min 80% statement and branch coverage.
*   **Vulnerability Scan**: Zero critical or high severity alerts from npm audit, AWS Inspector, and SonarQube.
*   **Performance Baseline**: API response time < 500ms for 95% of requests; IoT anomaly response time < 3 seconds.
