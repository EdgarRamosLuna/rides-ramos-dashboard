'use client'
import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';

const ScheduleForm = ({ addSchedule, editSchedule, scheduleToEdit, idSchedule }) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      description: '',
      startTime: new Date(),
      endTime: new Date(),
    }
  });
  // Función para convertir la hora de formato 24 horas a objeto Date
  function createTimeObjectFromTimeString(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10), 0);
    return time;
  }

  useEffect(() => {
    if (scheduleToEdit) {
      // Set loading state, fetch data, then reset form with data
      fetch(`/api/schedules/${idSchedule}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming data is the schedule object with properties like { description, startTime, endTime }
          // Dentro de useEffect o la función que obtiene los datos de la API
          const startTime = createTimeObjectFromTimeString(data.start_time);
          const endTime = createTimeObjectFromTimeString(data.end_time);
          reset({ // This will set the values of the form fields
            description: data.description,
            startTime: startTime,
            endTime: endTime,
          });
        })
        .catch((error) => {
          console.error('Error fetching schedule:', error);
        });
    }
  }, [scheduleToEdit, reset, idSchedule]);

  const onSubmit = data => {
    const formattedData = {
      ...data,
      startTime: data.startTime.toTimeString().substring(0, 8),
      endTime: data.endTime.toTimeString().substring(0, 8),
    };
  
    if (scheduleToEdit) {
      editSchedule(formattedData);
    } else {
      addSchedule(formattedData);
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
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: 'Start time is required' }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label="Hora de inicio"
                renderInput={(params) => <TextField {...params} error={!!errors.startTime} />}
              />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            rules={{ required: 'End time is required' }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label="Hora de fin"
                renderInput={(params) => <TextField {...params} error={!!errors.endTime} />}
              />
            )}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained">
          {scheduleToEdit ? 'Actualizar' : 'Guardar'}
        </Button>
      </Grid>
    </form>
  );
}
export default ScheduleForm;
