import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Avatar } from '@mui/material';
import { PersonAdd, LocalHospital } from '@mui/icons-material';
import axios from 'axios';

export default function Hospital() {
  const [patients, setPatients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ firstName: '', lastName: '', dob: '', gender: 'MALE' });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hospital/patients');
      setPatients(res.data);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/hospital/patients', {
        ...newPatient,
        dob: new Date(newPatient.dob)
      });
      setOpen(false);
      setNewPatient({ firstName: '', lastName: '', dob: '', gender: 'MALE' });
      fetchPatients();
    } catch (err) {
      console.error('Failed to register patient', err);
    }
  };

  return (
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LocalHospital color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>Hospital Management</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Registry and tracking of admitted or registered patients</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setOpen(true)}
          sx={{
            py: 1.2,
            px: 2.5,
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.25)',
          }}
        >
          Register Patient
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.06)',
          bgcolor: 'rgba(17, 24, 39, 0.4)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Patient Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell sx={{ pr: 3, textAlign: 'right' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  No registered patients found. Click "Register Patient" to add one.
                </TableCell>
              </TableRow>
            ) : (
              patients.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' },
                  }}
                >
                  <TableCell sx={{ pl: 3, py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'secondary.main',
                          width: 38,
                          height: 38,
                          fontSize: '0.95rem',
                          fontWeight: 700,
                        }}
                      >
                        {p.firstName[0]}
                        {p.lastName[0]}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600 }}>
                        {p.firstName} {p.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(p.dob).toLocaleDateString(undefined, { dateStyle: 'medium' })}</TableCell>
                  <TableCell>
                    <Chip
                      label={p.gender}
                      size="small"
                      color={p.gender === 'MALE' ? 'primary' : 'secondary'}
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        borderColor: p.gender === 'MALE' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ pr: 3, textAlign: 'right' }}>
                    <Chip
                      label="Admitted"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#111827',
            backgroundImage: 'none',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 4,
            p: 1.5,
            maxWidth: 420,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Register New Patient</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1.5 }}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={newPatient.firstName}
            onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={newPatient.lastName}
            onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newPatient.dob}
            onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
          />
          <TextField
            fullWidth
            select
            label="Gender"
            value={newPatient.gender}
            onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            SelectProps={{ native: true }}
          >
            <option value="MALE" style={{ background: '#111827' }}>Male</option>
            <option value="FEMALE" style={{ background: '#111827' }}>Female</option>
            <option value="OTHER" style={{ background: '#111827' }}>Other</option>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" sx={{ px: 3 }}>Register</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
