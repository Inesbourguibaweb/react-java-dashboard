import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
  });

  useEffect(() => {
    api.get('/transactions')
      .then(response => {
        const transactions = response.data;
        const total = transactions.length;
        const paid = transactions.filter(t => t.payee).length;
        const unpaid = total - paid;
        setStats({ total, paid, unpaid });
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
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
                Total Transactions
              </Typography>
              <Typography variant="h5" component="h2">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Paid Transactions
              </Typography>
              <Typography variant="h5" component="h2">
                {stats.paid}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unpaid Transactions
              </Typography>
              <Typography variant="h5" component="h2">
                {stats.unpaid}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardHome;
