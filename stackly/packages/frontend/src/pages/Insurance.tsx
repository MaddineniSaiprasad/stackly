import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

export default function Insurance() {
  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/supporting/policies').then(res => setPolicies(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Health Insurance</Typography>
      <Grid container spacing={3}>
        {policies.map((p) => (
          <Grid item xs={12} md={4} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.name}</Typography>
                <Typography color="textSecondary">{p.type}</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>Coverage: ${p.coverage}</Typography>
                <Typography variant="body1">Premium: ${p.premium}/mo</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} fullWidth>Select Plan</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
