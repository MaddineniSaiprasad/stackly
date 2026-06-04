# Palette's Journal - UX & Accessibility Learnings

## 2025-05-15 - MUI v6 Navigation Pattern
**Learning:** For navigation lists in modern Material-UI (v6+), the preferred pattern is to nest a `ListItemButton` inside a `ListItem` with `disablePadding` to ensure correct styling and accessibility. Direct use of the `button` prop on `ListItem` is deprecated and less flexible.
**Action:** Always use `<ListItem disablePadding><ListItemButton ...>...</ListItemButton></ListItem>` when building navigation sidebars with MUI v6+.
