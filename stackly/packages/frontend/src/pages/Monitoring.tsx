import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io('http://localhost:5000');

export default function Monitoring() {
  const [vitals, setVitals] = useState<any[]>([]);

  useEffect(() => {
    socket.emit('subscribe-vitals', 'demo-patient');
    socket.on('vitals-update', (data) => {
      setVitals(prev => [...prev.slice(-19), data]);
    });
    return () => { socket.off('vitals-update'); };
  }, []);

  const data = {
    labels: vitals.map(v => new Date(v.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Heart Rate',
      data: vitals.map(v => v.heartRate),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Remote Patient Monitoring</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Real-time Heart Rate</Typography>
            <Line data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Latest Vitals</Typography>
            {vitals.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography>Heart Rate: {vitals[vitals.length - 1].heartRate} bpm</Typography>
                <Typography>Blood Pressure: {vitals[vitals.length - 1].bloodPressure}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
