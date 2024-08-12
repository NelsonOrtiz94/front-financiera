import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const TransaccionForm = () => {
  const [formType, setFormType] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [saldo, setSaldo] = useState("");
  const [numeroCuentaOrigen, setNumeroCuentaOrigen] = useState("");
  const [numeroCuentaDestino, setNumeroCuentaDestino] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/transacciones", {
        tipoCuenta,
        saldo,
        numeroCuentaOrigen,
        numeroCuentaDestino:
          tipoCuenta === "Transferencia" ? numeroCuentaDestino : null,
      });
      console.log("Transacción creada:", response.data);
    } catch (error) {
      console.error("Error al crear la transacción:", error);
    }
  };

  const renderForm = () => {
    if (!formType) return null;

    return (
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Transacción</InputLabel>
          <Select value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
            <MenuItem value="Consignación">Consignación</MenuItem>
            <MenuItem value="Retiro">Retiro</MenuItem>
            <MenuItem value="Transferencia">Transferencia</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Saldo"
          value={saldo}
          onChange={(e) => setMonto(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número de Cuenta Origen"
          value={numeroCuentaOrigen}
          onChange={(e) => setNumeroCuentaOrigen(e.target.value)}
          fullWidth
          margin="normal"
        />
        {tipoCuenta === "Transferencia" && (
          <TextField
            label="Número de Cuenta Destino"
            value={numeroCuentaDestino}
            onChange={(e) => setNumeroCuentaDestino(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Transacción
        </Button>
      </form>
    );
  };

  return (
    <div>
      <h1>Transacciones</h1>
      <Box>
      <Button variant="contained" onClick={() => setFormType("Transferencia")}>
        Generar transacción
      </Button>
      {renderForm()}
    </Box>
    </div>
  );
};

export default TransaccionForm;
