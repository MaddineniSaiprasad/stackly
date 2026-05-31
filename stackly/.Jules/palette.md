## 2025-05-15 - MUI List Navigation Pattern
**Learning:** For modern MUI (v5/v6) navigation lists, the preferred pattern is to nest a `ListItemButton` inside a `ListItem` with `disablePadding` instead of using the deprecated `button` prop on `ListItem`. This ensures better styling consistency and accessibility.
**Action:** Always use `ListItemButton` inside `ListItem` for interactive list items, and explicitly manage the `selected` state using the current router path for clear user feedback.
