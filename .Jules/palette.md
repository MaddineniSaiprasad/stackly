## 2025-06-13 - [Dashboard Sidebar Active State & Accessible Logout]
**Learning:** Highlighting the active route in a permanent navigation drawer significantly improves user orientation within a multi-module application. Using `ListItemButton` with the `selected` prop is the standard MUI pattern for this. Additionally, icon-only buttons in the AppBar (like Logout) must have `aria-label` and `Tooltip` to meet accessibility and UX standards.
**Action:** Always implement `selected` prop on navigation items by comparing `location.pathname` and provide tooltips/aria-labels for header actions.
