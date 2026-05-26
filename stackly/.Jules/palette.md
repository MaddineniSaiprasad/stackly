## 2025-05-15 - [MUI Navigation Patterns]
**Learning:** For navigation lists in Material-UI v5+, the `ListItem button` prop is deprecated. The preferred pattern is to nest a `ListItemButton` inside a `ListItem` with `disablePadding` to ensure correct styling, alignment, and proper `selected` state visualization.
**Action:** Always use `ListItemButton` for interactive list items and leverage the `selected` prop to provide visual feedback for the active route.

## 2025-05-15 - [Icon Button Accessibility]
**Learning:** Icon-only buttons (like a Logout icon) are invisible to screen readers if they lack a text equivalent.
**Action:** Always add an `aria-label` to `IconButton` and wrap it in a `Tooltip` to provide both accessible text and visual hints for sighted users.
