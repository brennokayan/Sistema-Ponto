import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../utils/defaultFunctions';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Olá, {JSON.parse(localStorage.getItem("user") || "{}").nome}!
          </Typography>
          <Button color="inherit" onClick={() => {
            logout();
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
