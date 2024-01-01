'use client'
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';

const DriversForm = ({ addDriver, editDriver, driverToEdit, idDriver }) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      userName: '',
    }
  });
  useEffect(() => {
    if (driverToEdit) {
      // Set loading state, fetch data, then reset form with data
      fetch(`/api/drivers/update/${idDriver}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming data is the driver object with properties like { description, startTime, endTime }
          // Dentro de useEffect o la función que obtiene los datos de la API          
          reset({ // This will set the values of the form fields            
            fullName:data[0].full_name,
            phoneNumber:data[0].phone_number,
            userName:data[0].user_name,
          });
        })
        .catch((error) => {
          console.error('Error fetching driver:', error);
        });
    }
  }, [driverToEdit, reset, idDriver]);

  const onSubmit = data => {
    console.log('hey')
    if (driverToEdit) {
      editDriver(data);
    } else {
      addDriver(data);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxSizing: 'border-box',
          padding: '15px 15px'
        }}
      >
        <Controller
          name="fullName"
          control={control}
          rules={{ required: 'Nombre completo obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre completo"
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: 'Telefono obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefono"
              variant="outlined"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          )}
        />
        <Controller
          name="userName"
          control={control}
          rules={{ required: 'Usuario obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Usuario"
              variant="outlined"
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Contraseña obligatoria' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              type='password'
            />
          )}
        />
      
        <Button variant="outlined" color="success" type='submit'>
          {driverToEdit ? 'Actualizar' : 'Guardar'}
        </Button>
      </Grid>
    </form>
  );
}
export default DriversForm;
