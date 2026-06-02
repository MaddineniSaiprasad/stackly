## 2026-06-02 - [Dashboard Accessibility and Modernization]
**Learning:** Modern Material-UI (v5+) uses `ListItemButton` as the standard for interactive list items. The legacy `ListItem button` prop is deprecated and can cause TypeScript errors or accessibility regressions in some contexts.
**Action:** Always use `<ListItem disablePadding><ListItemButton onClick={...}>...</ListItemButton></ListItem>` for navigation menus in MUI.

## 2026-06-02 - [Accessibility for Icon-only Buttons]
**Learning:** Icon-only buttons (like Logout) are invisible to screen readers without an `aria-label` and can be confusing for mouse users without a `Tooltip`.
**Action:** Always wrap icon-only `IconButton` components in a `Tooltip` and provide a descriptive `aria-label`.
