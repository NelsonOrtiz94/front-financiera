import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

const ProductoForm = ({ producto, clientes, cuentas, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tipoCuenta: '',
    estado: 'activa',
    saldo: '',
    exentaGMF: false,
    clienteId: '',
    numeroCuenta: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    } else {
      // Si no hay producto, resetea el número de cuenta
      setFormData(prev => ({ ...prev, numeroCuenta: generateAccountNumber(prev.tipoCuenta) }));
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar tipo de cuenta
    if (!['cuenta corriente', 'cuenta de ahorros'].includes(formData.tipoCuenta)) {
      newErrors.tipoCuenta = 'El tipo de cuenta debe ser "cuenta corriente" o "cuenta de ahorros".';
    }

    // Validar saldo para cuenta corriente
    if (formData.tipoCuenta === 'cuenta corriente' && formData.saldo < 0) {
      newErrors.saldo = 'El saldo no puede ser negativo para cuentas corrientes.';
    }

    // Validar saldo para cuenta de ahorros
    if (formData.tipoCuenta === 'cuenta de ahorros' && formData.saldo <= 0) {
      newErrors.saldo = 'El saldo de una cuenta de ahorros no puede ser menor a $0.';
    }

    // Validar cliente vinculado
    if (!formData.clienteId) {
      newErrors.clienteId = 'El producto debe estar vinculado a un cliente válido.';
    } else {
      const clienteCuentas = cuentas.filter(cuenta => cuenta.clienteId === formData.clienteId);
      const cuentaCorrienteCount = clienteCuentas.filter(cuenta => cuenta.tipoCuenta === 'cuenta corriente').length;
      const cuentaAhorrosCount = clienteCuentas.filter(cuenta => cuenta.tipoCuenta === 'cuenta de ahorros').length;

      if (formData.tipoCuenta === 'cuenta corriente' && cuentaCorrienteCount >= 1) {
        newErrors.clienteId = 'El cliente ya tiene una cuenta corriente.';
      }
      if (formData.tipoCuenta === 'cuenta de ahorros' && cuentaAhorrosCount >= 1) {
        newErrors.clienteId = 'El cliente ya tiene una cuenta de ahorros.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const generateAccountNumber = (tipoCuenta) => {
    const prefix = tipoCuenta === 'cuenta de ahorros' ? '53' : '33';
    const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(8, '0');
    return prefix + randomNumber;
  };

  useEffect(() => {
    if (formData.tipoCuenta && !producto) { // Solo generar número si es un nuevo producto
      setFormData(prev => ({ ...prev, numeroCuenta: generateAccountNumber(formData.tipoCuenta) }));
    }
  }, [formData.tipoCuenta]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal" error={Boolean(errors.tipoCuenta)}>
        <InputLabel>Tipo de Cuenta</InputLabel>
        <Select
          name="tipoCuenta"
          value={formData.tipoCuenta}
          onChange={handleChange}
        >
          <MenuItem value="cuenta corriente">Cuenta Corriente</MenuItem>
          <MenuItem value="cuenta de ahorros">Cuenta de Ahorros</MenuItem>
        </Select>
        {errors.tipoCuenta && <FormHelperText>{errors.tipoCuenta}</FormHelperText>}
      </FormControl>
      <TextField
        label="Número de Cuenta"
        name="numeroCuenta"
        value={formData.numeroCuenta || ''}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <MenuItem value="activa">Activa</MenuItem>
          <MenuItem value="inactiva">Inactiva</MenuItem>
          <MenuItem value="cancelada">Cancelada</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Saldo"
        name="saldo"
        type="number"
        value={formData.saldo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }} // No permite valores negativos en la entrada
        error={Boolean(errors.saldo)}
        helperText={errors.saldo}
      />
      <FormControl fullWidth margin="normal" error={Boolean(errors.clienteId)}>
        <InputLabel>Cliente</InputLabel>
        <Select
          name="clienteId"
          value={formData.clienteId}
          onChange={handleChange}
        >
          {clientes.map((cliente) => (
            <MenuItem key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </MenuItem>
          ))}
        </Select>
        {errors.clienteId && <FormHelperText>{errors.clienteId}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
        Guardar
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel}>
        Cancelar
      </Button>
    </Box>
  );
};

export default ProductoForm;
