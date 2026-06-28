# Palette's Journal - UX & Accessibility Learnings

## 2026-06-28 - Dynamic Accessibility for Toggle Controls
**Learning:** For toggleable icon buttons (like microphone or camera controls), static ARIA labels are insufficient as they don't reflect the current state or the action that will be performed. Using dynamic labels (e.g., "Mute" vs "Unmute") provides much clearer feedback to screen reader users.
**Action:** Always use dynamic `aria-label` and `Tooltip` titles for toggle buttons that change state.
