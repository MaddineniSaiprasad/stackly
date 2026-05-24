## 2026-05-24 - [Navigation Feedback Pattern]
**Learning:** For MUI-based sidebars, using `ListItemButton` with the `selected` prop linked to the current route (via `useLocation`) provides essential visual affordance for navigation.
**Action:** Always prefer `ListItemButton` inside `ListItem` with `disablePadding` and implement `selected` state for all sidebar-like navigation components.
