import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClienteForm from './ClienteForm';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const handleSaveCliente = async (cliente) => {
    try {
      if (cliente.id) {
        // Update cliente
        await axios.put(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
      } else {
        // Create cliente
        await axios.post('http://localhost:8080/api/clientes', cliente);
      }
      fetchClientes();
      setIsFormVisible(false);
      setSelectedCliente(null);
    } catch (error) {
      console.error('Error saving cliente:', error);
    }
  };

  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setIsFormVisible(true);
  };

  const handleAddCliente = () => {
    setSelectedCliente(null);
    setIsFormVisible(!isFormVisible); // Toggle visibility
  };

  const handleCancel = () => {
    setSelectedCliente(null);
    setIsFormVisible(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Clientes
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddCliente}>
        {isFormVisible ? "Ocultar Formulario" : "Añadir Cliente"}
      </Button>
      {isFormVisible && (
        <ClienteForm cliente={selectedCliente} onSave={handleSaveCliente} onCancel={handleCancel} />
      )}
      <List>
        {clientes.map(cliente => (
          <ListItem key={cliente.id}>
            <ListItemText
              primary={`${cliente.nombres} ${cliente.apellido}`}
              secondary={cliente.correoElectronico}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditCliente(cliente)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCliente(cliente.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ClientesList;
