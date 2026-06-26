import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Tabs, Tab, Avatar } from '@mui/material';
import { HealthAndSafety } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../store/slices/authSlice';

export default function Login() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = tab === 0 ? '/api/auth/login' : '/api/auth/register';
    const data = tab === 0 ? { email, password } : { email, password, firstName, lastName, role: 'PATIENT' };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      dispatch(setCredentials(response.data));
    } catch (error) {
      alert('Authentication failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Container maxWidth="xs" sx={{ p: 0 }}>
        <Paper
          sx={{
            p: 4.5,
            borderRadius: 5,
            bgcolor: 'rgba(17, 24, 39, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 52,
              height: 52,
              mb: 2,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
            }}
          >
            <HealthAndSafety sx={{ fontSize: 32, color: 'background.default' }} />
          </Avatar>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            AI Healthcare Portal
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, textAlign: 'center' }}>
            Secure Medical Hub & Telehealth Command Center
          </Typography>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              mb: 3,
              width: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 3,
              p: 0.5,
              '& .MuiTabs-indicator': {
                bgcolor: 'primary.main',
                height: '100%',
                borderRadius: 2.5,
                zIndex: 0,
                opacity: 0.15,
              },
              '& .MuiTab-root': {
                zIndex: 1,
                borderRadius: 2.5,
                fontWeight: 600,
                minHeight: 40,
                textTransform: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tab === 1 && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Box>
              )}
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  mt: 1.5,
                  py: 1.5,
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.25)',
                }}
              >
                {tab === 0 ? 'Sign In to Portal' : 'Register Account'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
