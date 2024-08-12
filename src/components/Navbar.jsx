import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Entidad Financiera
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/clientes">
          Clientes
        </Button>
        <Button color="inherit" component={Link} to="/productos">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/crear-transaccion">
          Crear Transacciones
        </Button>
        <Button color="inherit" component={Link} to="/transacciones">
          Agregado Transacciones
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
