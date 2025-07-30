import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardHome = () => {
  const [summary, setSummary] = useState({
    total: 0,
    totalPayee: 0,
    totalNonPayee: 0,
  });

  useEffect(() => {
    api.get('/transactions/summary')
      .then(response => {
        setSummary(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the transaction summary!', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Paid
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.totalPayee}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Unpaid
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.totalNonPayee}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardHome;
