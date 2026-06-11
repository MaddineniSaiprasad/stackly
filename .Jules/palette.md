# Palette's Journal - Critical UX Learnings

## 2025-05-14 - Navigation and Icon Accessibility
**Learning:** For navigation lists in modern Material-UI (v6+), nesting a `ListItemButton` inside a `ListItem` with `disablePadding` ensures correct styling and accessibility. Using the `selected` prop on the `ListItemButton` provides essential visual feedback for the active route. Icon-only buttons (like Logout) require both an `aria-label` for screen readers and a `Tooltip` for sighted users to be fully accessible.
**Action:** Always use `ListItemButton` with `selected` for sidebar navigation and wrap icon-only `IconButton` components in `Tooltip` with a descriptive `aria-label`.
