# Palette Journal 🎨

## Critical UX/Accessibility Learnings

## 2025-07-01 - Enhance Telemedicine controls accessibility and safety
**Learning:** For toggleable icon buttons (like mic/cam), providing dynamic Tooltip titles and 'aria-label' values (e.g., `{micActive ? 'Mute' : 'Unmute'}`) ensures both accurate screen reader feedback and visual clarity as the state changes. Adding a simple confirmation dialog to high-stakes buttons (like "End Session") prevents accidental disconnects during critical medical consultations.
**Action:** Always implement dynamic ARIA labels for toggleable icons and use confirmation guards for terminal or destructive session actions.
