import { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

export default function MockDashboard() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hospital/mock-logs');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Mock Service Dashboard</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Simulated Notifications & Payments</Typography>
        <List>
          {logs.length === 0 ? <Typography>No activity yet...</Typography> : logs.map((log, i) => (
            <Box key={i}>
              <ListItem>
                <ListItemText
                  primary={log.type}
                  secondary={`${new Date(log.timestamp).toLocaleString()} - ${JSON.stringify(log.data)}`}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
