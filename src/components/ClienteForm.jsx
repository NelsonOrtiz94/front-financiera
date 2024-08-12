import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

const ClienteForm = ({ cliente, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    nombres: "",
    apellido: "",
    correoElectronico: "",
    fechaNacimiento: "",
    fechaModificacion: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (cliente) {
      setFormData({
        ...cliente,
        fechaModificacion: new Date().toISOString(),
      });
    } else {
      // Resetea el formulario cuando no haya cliente seleccionado
      setFormData({
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        nombres: "",
        apellido: "",
        correoElectronico: "",
        fechaNacimiento: "",
        fechaModificacion: "",
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'numeroIdentificacion' ? value.replace(/[^0-9]/g, '') : value;
    const newErrors = { ...errors };

    // Validaciones específicas
    if (name === 'numeroIdentificacion' && newValue.length > 12) {
      newErrors.numeroIdentificacion = 'El número de identificación no puede tener más de 12 dígitos';
    } else {
      delete newErrors.numeroIdentificacion;
    }

    if (name === 'tipoIdentificacion' && !['CC', 'CE'].includes(value)) {
      newErrors.tipoIdentificacion = 'Tipo de identificación inválido';
    } else {
      delete newErrors.tipoIdentificacion;
    }

    if ((name === 'nombres' || name === 'apellido') && value.length < 2) {
      newErrors[name] = `El ${name === 'nombres' ? 'nombre' : 'apellido'} debe tener al menos 2 caracteres`;
    } else {
      delete newErrors[name];
    }

    if (name === 'correoElectronico') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(value)) {
        newErrors.correoElectronico = 'El correo electrónico no tiene un formato válido';
      } else {
        delete newErrors.correoElectronico;
      }
    }

    if (name === 'fechaNacimiento') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      let age = currentDate.getFullYear() - selectedDate.getFullYear();
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.fechaNacimiento = 'El cliente debe ser mayor de edad';
      } else {
        delete newErrors.fechaNacimiento;
      }
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tipoIdentificacion) {
      newErrors.tipoIdentificacion = 'El tipo de identificación es obligatorio';
    }

    if (!formData.numeroIdentificacion) {
      newErrors.numeroIdentificacion = 'El número de identificación no puede ser nulo';
    }

    if (!formData.nombres) {
      newErrors.nombres = 'Los nombres no pueden ser nulos';
    } else if (formData.nombres.length < 2) {
      newErrors.nombres = 'Los nombres deben tener al menos 2 caracteres';
    }

    if (!formData.apellido) {
      newErrors.apellido = 'El apellido no puede ser nulo';
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.correoElectronico) {
      newErrors.correoElectronico = 'El correo electrónico es obligatorio';
    } else if (!emailPattern.test(formData.correoElectronico)) {
      newErrors.correoElectronico = 'El correo electrónico no tiene un formato válido';
    }

    const currentDate = new Date();
    const selectedDate = new Date(formData.fechaNacimiento);
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
      age--;
    }
    if (age < 18) {
      newErrors.fechaNacimiento = 'El cliente debe ser mayor de edad';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && Object.keys(errors).length === 0) {
      onSave(formData)
        .then(() => {
          setSnackbarMessage(cliente ? "Cliente actualizado exitosamente." : "Cliente registrado exitosamente.");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Error al guardar el cliente.");
          setSnackbarOpen(true);
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.tipoIdentificacion}>
            <InputLabel>Tipo de Identificación</InputLabel>
            <Select
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleChange}
              label="Tipo de Identificación"
            >
              <MenuItem value="CC">Cédula de Ciudadanía (CC)</MenuItem>
              <MenuItem value="CE">Cédula de Extranjería (CE)</MenuItem>
            </Select>
            {errors.tipoIdentificacion && <FormHelperText>{errors.tipoIdentificacion}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="numeroIdentificacion"
            label="Número de Identificación"
            fullWidth
            value={formData.numeroIdentificacion}
            onChange={handleChange}
            error={!!errors.numeroIdentificacion}
            helperText={errors.numeroIdentificacion}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nombres"
            label="Nombres"
            fullWidth
            value={formData.nombres}
            onChange={handleChange}
            error={!!errors.nombres}
            helperText={errors.nombres}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="apellido"
            label="Apellido"
            fullWidth
            value={formData.apellido}
            onChange={handleChange}
            error={!!errors.apellido}
            helperText={errors.apellido}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="correoElectronico"
            label="Correo Electrónico"
            fullWidth
            value={formData.correoElectronico}
            onChange={handleChange}
            error={!!errors.correoElectronico}
            helperText={errors.correoElectronico}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            fullWidth
            value={formData.fechaNacimiento}
            onChange={handleChange}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {formData.fechaModificacion && (
          <Grid item xs={12}>
            <TextField
              name="fechaModificacion"
              label="Fecha de Modificación"
              fullWidth
              value={new Date(formData.fechaModificacion).toLocaleString()}
              disabled
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {cliente ? "Actualizar" : "Guardar"}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onCancel}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes("Error") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClienteForm;
