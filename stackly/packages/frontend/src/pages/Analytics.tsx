import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [risk, setRisk] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/advanced/risk-score/demo-patient').then(res => setRisk(res.data));
  }, []);

  const data = {
    labels: ['Risk Score'],
    datasets: [{
      label: 'Patient Risk Level',
      data: [risk?.score || 0],
      backgroundColor: risk?.risk === 'HIGH' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(75, 192, 192, 0.5)',
    }]
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Medical Analytics & AI</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">AI Risk Assessment</Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Bar data={data} options={{ maintainAspectRatio: false }} />
            </Box>
            <Typography variant="h5" sx={{ mt: 2, color: risk?.risk === 'HIGH' ? 'error.main' : 'success.main' }}>
              Status: {risk?.risk} RISK
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Key Insights</Typography>
            <List>
               <ListItemText primary="Patient volume is up 15% this month" />
               <ListItemText primary="Resource optimization: 92% efficiency" />
               <ListItemText primary="Top concern: Hypertension in 40% of patients" />
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

import { List, ListItemText } from '@mui/material';
