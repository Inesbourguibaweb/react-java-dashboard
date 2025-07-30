import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
import ClientList from './ClientList.jsx';
import CollaborateurList from './CollaborateurList.jsx';
import TransactionList from './TransactionList.jsx';
import DashboardHome from './DashboardHome.jsx';

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/clients">
                <ListItemText primary="Clients" />
              </ListItem>
              <ListItem button component={Link} to="/collaborateurs">
                <ListItemText primary="Collaborateurs" />
              </ListItem>
              <ListItem button component={Link} to="/transactions">
                <ListItemText primary="Transactions" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/clients" element={<ClientList />} />
            <Route path="/collaborateurs" element={<CollaborateurList />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/" element={<DashboardHome />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default Dashboard;
