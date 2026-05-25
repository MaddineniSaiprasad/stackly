import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, ListItemButton, Tooltip } from '@mui/material';
import { Dashboard as DashboardIcon, LocalHospital, VideoCall, LocalPharmacy, Science, Security, Event, MonitorHeart, Analytics as AnalyticsIcon, BugReport, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Telemedicine from './Telemedicine';
import Monitoring from './Monitoring';
import Hospital from './Hospital';
import Pharmacy from './Pharmacy';
import Laboratory from './Laboratory';
import Insurance from './Insurance';
import Analytics from './Analytics';
import Scheduling from './Scheduling';
import MockDashboard from './MockDashboard';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Hospital', icon: <LocalHospital />, path: '/hospital' },
  { text: 'Telemedicine', icon: <VideoCall />, path: '/telemedicine' },
  { text: 'Pharmacy', icon: <LocalPharmacy />, path: '/pharmacy' },
  { text: 'Laboratory', icon: <Science />, path: '/laboratory' },
  { text: 'Insurance', icon: <Security />, path: '/insurance' },
  { text: 'Scheduling', icon: <Event />, path: '/scheduling' },
  { text: 'Monitoring', icon: <MonitorHeart />, path: '/monitoring' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Mock Services', icon: <BugReport />, path: '/mock' },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            AI Healthcare Portal
          </Typography>
          <Typography sx={{ mr: 2 }}>{user?.email}</Typography>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => dispatch(logout())} aria-label="Logout">
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List disablePadding>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Typography variant="h4">Welcome to the Dashboard</Typography>} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mock" element={<MockDashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}
