import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductoForm from './ProductoForm';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProductos();
    fetchClientes();
    fetchCuentas();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const fetchCuentas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cuentas');
      setCuentas(response.data);
    } catch (error) {
      console.error('Error fetching cuentas:', error);
    }
  };

  const handleSaveProducto = async (producto) => {
    try {
      if (producto.id) {
        // Update producto
        await axios.put(`http://localhost:8080/productos/${producto.id}`, producto);
      } else {
        // Create producto
        await axios.post('http://localhost:8080/productos', producto);
      }
      fetchProductos();
      setIsFormVisible(false);
      setSelectedProducto(null);
    } catch (error) {
      console.error('Error saving producto:', error);
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error deleting producto:', error);
    }
  };

  const handleEditProducto = (producto) => {
    setSelectedProducto(producto);
    setIsFormVisible(true);
  };

  const handleAddProducto = () => {
    setSelectedProducto(null);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setSelectedProducto(null);
    setIsFormVisible(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Productos
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddProducto} style={{ marginBottom: 16 }}>
        {isFormVisible ? 'Ocultar Formulario' : 'Añadir Producto'}
      </Button>
      <Collapse in={isFormVisible}>
        <ProductoForm producto={selectedProducto} clientes={clientes} cuentas={cuentas} onSave={handleSaveProducto} onCancel={handleCancel} />
      </Collapse>
      <List>
        {productos.map(producto => (
          <ListItem key={producto.id}>
            <ListItemText
              primary={`Tipo: ${producto.tipoCuenta}, Número: ${producto.numeroCuenta}`}
              secondary={`Estado: ${producto.estado}, Saldo: ${producto.saldo}, Cliente ID: ${producto.clienteId}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditProducto(producto)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProducto(producto.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductosList;
