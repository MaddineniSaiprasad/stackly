import { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

export default function Laboratory() {
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/supporting/tests').then(res => setTests(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Laboratory Management</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Available Tests</Typography>
        <List>
          {tests.length === 0 ? <Typography>No tests available</Typography> : tests.map((t) => (
            <Box key={t.id}>
              <ListItem>
                <ListItemText primary={t.name} secondary={t.description} />
                <Typography variant="body2">${t.price}</Typography>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
