## 2025-05-15 - [Visual Context in Navigation]
**Learning:** Users can feel "lost" in a multi-module application without clear visual indicators of their current location. An active state in the sidebar is not just a polish, but a fundamental usability requirement.
**Action:** Always implement `selected` states for navigation items using `useLocation` or similar routing hooks.

## 2025-05-15 - [Accessibility for Icon Buttons]
**Learning:** Icon-only buttons (like a Logout icon) are completely inaccessible to screen readers without an explicit `aria-label`.
**Action:** Audit all icon-only interactive elements for missing labels during any UX pass.

## 2025-05-15 - [MUI Component Modernization]
**Learning:** Transitioning from deprecated patterns like `ListItem button` to `ListItemButton` not only solves build errors in modern environments but also provides better support for themes and states.
**Action:** Prefer specialized MUI sub-components (`ListItemButton`, `ListItemIcon`, etc.) over passing props to a generic `ListItem`.
