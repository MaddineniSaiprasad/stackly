import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CalendarPicker, LocalizationProvider, StaticDatePicker } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

export default function Scheduling() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hospital/doctors').then(res => setDoctors(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Appointment & Scheduling</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Select Date</Typography>
             {/* Note: In a real app we'd use a full calendar library, but here we'll use a simple picker */}
             <Typography>Calendar selection for: {date?.toDateString()}</Typography>
             <Button variant="outlined" onClick={() => setDate(new Date())} sx={{ mt: 2 }}>Today</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Available Doctors</Typography>
            <List>
              {doctors.map(d => (
                <ListItem button key={d.id}>
                  <ListItemText primary={`Dr. ${d.firstName} ${d.lastName}`} secondary={d.specialization} />
                  <Button size="small" variant="contained">Book</Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

import { List, ListItem, ListItemText, Button } from '@mui/material';
