## 2026-06-09 - [Active Navigation Highlighting]
**Learning:** Material UI's `ListItemButton` with the `selected` prop is the standard way to indicate the active route in a sidebar. Nesting it within a `ListItem` with `disablePadding` ensures correct spacing and accessibility.

**Action:** Always use `useLocation` from `react-router-dom` to determine the current path and apply the `selected` prop to the corresponding navigation item.
