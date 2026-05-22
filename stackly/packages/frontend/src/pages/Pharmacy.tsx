import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

export default function Pharmacy() {
  const [medicines, setMedicines] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hospital/medicines').then(res => setMedicines(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Pharmacy Management</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Expiry Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.stock}</TableCell>
                    <TableCell>${m.price}</TableCell>
                    <TableCell>{new Date(m.expiryDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
