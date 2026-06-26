## 2025-06-26 - Dynamic Accessibility for Toggle Buttons
**Learning:** Icon-only toggle buttons (like microphone or camera) need dynamic `aria-label` and `Tooltip` titles that update with their state. Static labels like "Toggle Microphone" are less helpful for screen readers than "Mute microphone" or "Unmute microphone".
**Action:** Always use ternary expressions or derived state to provide context-aware labels for toggleable icon buttons.
