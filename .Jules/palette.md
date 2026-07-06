## 2025-05-15 - [Dynamic Accessibility Pattern]
**Learning:** For toggleable icon buttons (like microphone and camera in Telemedicine), the ARIA label and Tooltip must dynamically update to reflect the *result* of clicking the button (e.g., "Mute" when active, "Unmute" when inactive).
**Action:** Always use conditional logic for `aria-label` and `Tooltip` title on stateful icon buttons.

## 2025-05-15 - [Safety Confirmation for Destructive Actions]
**Learning:** In clinical or real-time communication contexts, ending a session is a high-stakes action. A confirmation dialog prevents accidental disconnections and improves user confidence.
**Action:** Implement `window.confirm` or a modal for "End Session" or "Delete" actions.
