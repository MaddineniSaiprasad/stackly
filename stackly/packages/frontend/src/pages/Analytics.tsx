import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Chip, Avatar } from '@mui/material';
import { Analytics as AnalyticsIcon, Psychology, HealthAndSafety, TrendingUp, Info, Insights } from '@mui/icons-material';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [risk, setRisk] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/advanced/risk-score/demo-patient')
      .then(res => setRisk(res.data))
      .catch(err => {
        console.warn('Failed to load risk score, using mock medical analytics.', err);
        setRisk({ score: 75, risk: 'HIGH' });
      });
  }, []);

  const scoreValue = risk?.score || 0;
  const isHigh = risk?.risk === 'HIGH';

  const data = {
    labels: ['AI Calculated Risk Score'],
    datasets: [{
      label: 'Patient Risk Level',
      data: [scoreValue],
      backgroundColor: isHigh ? 'rgba(239, 68, 68, 0.45)' : 'rgba(16, 185, 129, 0.45)',
      borderColor: isHigh ? '#ef4444' : '#10b981',
      borderWidth: 2,
      borderRadius: 12,
      borderSkipped: false,
      barThickness: 45,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: { color: '#64748b' },
        max: 100,
        min: 0,
      }
    }
  };

  const insightsList = [
    { text: "Patient volume is up 15% this month", detail: "Resource allocation is automatically matching load.", status: "neutral" },
    { text: "Resource optimization: 92% efficiency", detail: "Clinical scheduling algorithms are performing optimally.", status: "success" },
    { text: "Top concern: Hypertension in 40% of patients", detail: "AI suggests early preventative screening campaigns.", status: "warning" },
  ];

  return (
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <AnalyticsIcon color="primary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Medical Analytics & AI</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>AI predictive diagnostic modeling and system intelligence</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Risk Assessment Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 420, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', width: 40, height: 40 }}>
                <Psychology />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>AI Risk Assessment</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Neural network model analyzing current diagnostics</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, position: 'relative', height: '100%', maxHeight: 220, mb: 2 }}>
              <Bar data={data} options={chartOptions} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Clinical Diagnostic Status:</Typography>
              <Chip
                label={`${risk?.risk || 'UNKNOWN'} RISK (${scoreValue}%)`}
                color={isHigh ? 'error' : 'success'}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  bgcolor: isHigh ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid',
                  borderColor: isHigh ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Insights Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 420, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', width: 40, height: 40 }}>
                <Insights />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Clinical Insights</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Automated analysis of institutional and patient aggregates</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {insightsList.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      alignItems: 'flex-start',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <Info
                        sx={{
                          fontSize: 18,
                          color: item.status === 'success' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#38bdf8',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      secondary={item.detail}
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}
                      secondaryTypographyProps={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.5 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
