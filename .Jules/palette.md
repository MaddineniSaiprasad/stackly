## 2025-05-15 - [Active State Highlighting in Sidebar]
**Learning:** In Material-UI v5/v6, using the `selected` prop on `ListItemButton` provides immediate visual feedback to the user about their current location, which is a key UX requirement for persistent navigation drawers. The modern pattern also requires nesting `ListItemButton` inside `ListItem` with `disablePadding`.
**Action:** Always implement active state highlighting for sidebars and navigation lists using the `selected` prop and `useLocation` hook.

## 2025-05-15 - [A11y for Icon Buttons]
**Learning:** Icon-only buttons (like a logout icon in a header) are inaccessible to screen readers without an explicit `aria-label`.
**Action:** Ensure all `IconButton` components that do not contain visible text have a descriptive `aria-label`.
