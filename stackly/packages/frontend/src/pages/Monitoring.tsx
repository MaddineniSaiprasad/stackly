import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar } from '@mui/material';
import { MonitorHeart, Favorite, Speed, WarningAmber, CheckCircleOutline } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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

  const latestVital = vitals.length > 0 ? vitals[vitals.length - 1] : { heartRate: 75, bloodPressure: '120/80', timestamp: new Date() };

  const data = {
    labels: vitals.map(v => new Date(v.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Real-time Heart Rate (BPM)',
      data: vitals.map(v => v.heartRate),
      borderColor: '#f43f5e',
      backgroundColor: 'rgba(244, 63, 94, 0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#f43f5e',
      borderWidth: 2,
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
        titleColor: '#94a3b8',
        bodyColor: '#f8fafc',
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#64748b',
          maxRotation: 0,
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#64748b',
        }
      }
    }
  };

  // Determine health status based on vitals
  const isHighHr = latestVital.heartRate > 100 || latestVital.heartRate < 60;

  return (
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <MonitorHeart color="primary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Remote Patient Monitoring</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Real-time telemetry stream from connected wearable biosensors</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Heart Rate Graph */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 420, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>ECG / Pulse Rate Telemetry</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444', animation: 'pulse 1s infinite' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>LIVE DATA STREAM</Typography>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, position: 'relative', height: '100%', minHeight: 280 }}>
              {vitals.length === 0 ? (
                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
                  Connecting to sensor telemetry channel...
                </Box>
              ) : (
                <Line data={data} options={chartOptions} />
              )}
            </Box>
          </Card>
        </Grid>

        {/* Vitals Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Heart Rate Card */}
            <Card
              sx={{
                p: 2.5,
                bgcolor: 'rgba(244, 63, 94, 0.03)',
                borderColor: isHighHr ? 'rgba(239, 68, 68, 0.2)' : 'rgba(244, 63, 94, 0.1)',
                boxShadow: isHighHr ? '0 0 20px rgba(239, 68, 68, 0.05)' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>PULSE / HEART RATE</Typography>
                <Avatar sx={{ bgcolor: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', width: 36, height: 36 }}>
                  <Favorite />
                </Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: isHighHr ? '#ef4444' : '#f8fafc' }}>
                  {latestVital.heartRate}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>bpm</Typography>
              </Box>
              <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                {isHighHr ? (
                  <>
                    <WarningAmber sx={{ color: '#ef4444', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700 }}>Vitals anomaly detected</Typography>
                  </>
                ) : (
                  <>
                    <CheckCircleOutline sx={{ color: '#10b981', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>Optimal Range (60-100)</Typography>
                  </>
                )}
              </Box>
            </Card>

            {/* Blood Pressure Card */}
            <Card sx={{ p: 2.5, bgcolor: 'rgba(6, 182, 212, 0.03)', borderColor: 'rgba(6, 182, 212, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>BLOOD PRESSURE</Typography>
                <Avatar sx={{ bgcolor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', width: 36, height: 36 }}>
                  <Speed />
                </Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {latestVital.bloodPressure}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>mmHg</Typography>
              </Box>
              <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutline sx={{ color: '#10b981', fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>Normal Systolic & Diastolic</Typography>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
