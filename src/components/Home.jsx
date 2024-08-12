import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [showWelcomeMessage] = useState(true);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {showWelcomeMessage && (
        <Box mb={4}>
          <Typography variant="h2" align="center" gutterBottom>
            Bienvenido a Pollos Hermanos
          </Typography>
          <Typography variant="h6" align="center">
            Su socio de confianza en servicios financieros
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Servicios Financieros
              </Typography>
              <Typography variant="body2">
                Ofrecemos una amplia gama de servicios financieros diseñados para satisfacer todas sus necesidades. Desde cuentas bancarias hasta préstamos personales, estamos aquí para ayudarle.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Consultoría Financiera
              </Typography>
              <Typography variant="body2">
                Nuestros expertos están disponibles para brindarle asesoría financiera personalizada y ayudarle a tomar decisiones informadas sobre sus inversiones y ahorro.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Soporte al Cliente
              </Typography>
              <Typography variant="body2">
                Nuestro equipo de soporte está disponible para asistirle en cualquier consulta o problema que pueda tener. No dude en contactarnos en cualquier momento.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botón de contacto */}
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" href="/contacto">
          Contáctenos
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
