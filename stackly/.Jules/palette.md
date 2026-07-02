## 2026-07-02 - [Visual Verification of Transient States]
**Learning:** Capturing short-lived UI states (like loading spinners) in screenshots during frontend verification is difficult when the backend is disconnected or too fast.
**Action:** Temporarily insert a manual delay (e.g., 'await new Promise(r => setTimeout(r, 2000))') into the submission logic to ensure the transient state is visible for Playwright snapshots.
