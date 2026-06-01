# Palette's Journal

## 2025-05-15 - [Active Navigation State Pattern]
**Learning:** In MUI v6+, the preferred pattern for navigation lists is to use `ListItemButton` inside `ListItem` with `disablePadding`. Visual feedback for the active route (using the `selected` prop) significantly improves the user's sense of place in a multi-page dashboard.
**Action:** Always implement the `selected` state on navigation items by comparing the current route (via `useLocation`) with the item's path.
