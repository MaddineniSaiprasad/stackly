import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

export default function Hospital() {
  const [patients, setPatients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ firstName: '', lastName: '', dob: '', gender: 'MALE' });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await axios.get('http://localhost:5000/api/hospital/patients');
    setPatients(res.data);
  };

  const handleCreate = async () => {
    await axios.post('http://localhost:5000/api/hospital/patients', {
      ...newPatient,
      dob: new Date(newPatient.dob)
    });
    setOpen(false);
    fetchPatients();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Hospital Management</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Register Patient</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.firstName} {p.lastName}</TableCell>
                <TableCell>{new Date(p.dob).toLocaleDateString()}</TableCell>
                <TableCell>{p.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Register New Patient</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="First Name" margin="normal" value={newPatient.firstName} onChange={e => setNewPatient({...newPatient, firstName: e.target.value})} />
          <TextField fullWidth label="Last Name" margin="normal" value={newPatient.lastName} onChange={e => setNewPatient({...newPatient, lastName: e.target.value})} />
          <TextField fullWidth label="DOB" type="date" margin="normal" InputLabelProps={{ shrink: true }} value={newPatient.dob} onChange={e => setNewPatient({...newPatient, dob: e.target.value})} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">Register</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
