## 2026-06-27 - Dynamic Accessibility for Toggleable Controls
**Learning:** For interactive controls that toggle state (like mute/unmute or camera on/off), it's crucial to provide both visual (Tooltip) and non-visual (ARIA label) feedback that updates dynamically with the state. This ensures that screen reader users and sighted users both understand the current action available.
**Action:** Always use dynamic labels for toggle buttons. Instead of a static "Toggle Microphone", use "Mute microphone" when active and "Unmute microphone" when inactive.
