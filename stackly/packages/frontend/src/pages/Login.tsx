import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Tabs, Tab } from '@mui/material';
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
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            AI Healthcare Portal
          </Typography>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" sx={{ mb: 3 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            {tab === 1 && (
              <>
                <TextField fullWidth label="First Name" margin="normal" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                <TextField fullWidth label="Last Name" margin="normal" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </>
            )}
            <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
            <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
              {tab === 0 ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
