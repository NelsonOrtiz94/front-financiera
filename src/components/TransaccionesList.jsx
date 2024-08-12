import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";

const TransaccionesList = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/transacciones");
        const data = response.data;

        if (Array.isArray(data)) {
          setTransacciones(data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
          setError("La respuesta de la API no es un array");
        }
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
        setError("Error al obtener las transacciones");
      } finally {
        setLoading(false);
      }
    };

    fetchTransacciones();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Tipo de Cuenta</TableCell>
          <TableCell>Saldo</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Cuenta Origen</TableCell>
          <TableCell>Cuenta Destino</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transacciones.map((transaccion) => (
          <TableRow key={transaccion.id}>
            <TableCell>{transaccion.id}</TableCell>
            <TableCell>{transaccion.tipoCuenta}</TableCell>
            <TableCell>{transaccion.saldo}</TableCell>
            <TableCell>
              {new Date(transaccion.fecha).toLocaleString()}
            </TableCell>
            <TableCell>{transaccion.cuentaOrigen?.numeroCuenta}</TableCell>
            <TableCell>
              {transaccion.cuentaDestino?.numeroCuenta || "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    
  );
};

export default TransaccionesList;
