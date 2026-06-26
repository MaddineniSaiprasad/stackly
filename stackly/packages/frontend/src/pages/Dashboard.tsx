import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar, Chip } from '@mui/material';
import { Dashboard as DashboardIcon, LocalHospital, VideoCall, LocalPharmacy, Science, Security, Event, MonitorHeart, Analytics as AnalyticsIcon, BugReport, Logout, HealthAndSafety } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
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

const drawerWidth = 260;

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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'rgba(7, 10, 19, 0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)' }}>
              <HealthAndSafety sx={{ color: 'background.default' }} />
            </Avatar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI Healthcare Portal
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{user?.email?.[0].toUpperCase()}</Avatar>}
              label={user?.email}
              variant="outlined"
              sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', bgcolor: 'rgba(255, 255, 255, 0.03)' }}
            />
            <IconButton
              color="inherit"
              onClick={() => dispatch(logout())}
              sx={{
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 2.5,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  borderColor: 'rgba(239, 68, 68, 0.2)',
                },
              }}
            >
              <Logout fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#0c0f1b',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <ListItemButton
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 3,
                    py: 1.2,
                    px: 2,
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    bgcolor: isActive ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? 'primary.main' : 'text.primary',
                    },
                  }}
                >
                  {isActive && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '25%',
                        height: '50%',
                        width: '3px',
                        bgcolor: 'primary.main',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: '0 0 8px #06b6d4',
                      }}
                    />
                  )}
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      minWidth: 40,
                      transition: 'all 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.92rem',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Welcome back,
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    Access AI insights, real-time vitals, and virtual consultations in one high-security portal.
                  </Typography>
                  {/* Grid or summary dashboard cards if needed, otherwise user can navigate */}
                  <MockDashboard />
                </Box>
              }
            />
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
    </Box>
  );
}
