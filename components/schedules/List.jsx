'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../ui/Modal";
import ScheduleForm from "./ScheduleForm";
import MainContext from "@/context/MainContext";
import toast from "react-hot-toast";
import { useConfirm } from "material-ui-confirm";

const SchedulesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [idSchedule, setIdSchedule] = useState(0);

  const { openSchedulesModal, setOpenSchedulesModal, scheduleToEdit, setScheduleToEdit } = useContext(MainContext);
  const confirm = useConfirm();
  const getData = () => {
    setLoading(true);
    try {

      fetch("/api/schedules")
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0])
          const formattedRows = data[0].map(item => ({
            ...item,
            schedule_time: `${formatTime(item.start_time)} - ${formatTime(item.end_time)}`,
          }));
          setData(formattedRows)
          setLoading(false);
        });

    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData()
  }, []);

  const columns = [

    {
      field: 'description', headerName: 'Descripción', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'schedule_time', headerName: 'Horario', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const onClickEdit = (e) => {
          setOpenSchedulesModal(true)
          //e.stopPropagation(); // don't select this row after clicking      
          // Handle edit action
          console.log(`Editing row with id: ${params.id}`);
          setIdSchedule(params.id)
          setScheduleToEdit(true)
        };
        // const onClickDelete = (e) => {

        //   // Handle delete action
        //   //console.log(`Deleting row with id: ${params.id}`);
        //   e.stopPropagation(); // don't select this row after clicking


        // };
        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          confirm({ description: `This will permanently delete ${params.id}.` })
            .then(() => deleteSchedule(params.id))
            .catch(() => console.log("Deletion cancelled."));
        };

        return (
          <Grid textAlign={'center'}>
            <Button
              onClick={onClickEdit}
              color="success"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={onClickDelete}
              color="secondary"
            >
              <DeleteIcon />
            </Button>
          </Grid>
        );
      }
    }

  ];

  function formatTime(timeString) {
    // Asumimos que timeString está en formato 'HH:mm:ss'
    const [hours, minutes] = timeString.split(':');

    // Creamos una fecha de referencia y establecemos las horas y minutos
    const referenceDate = new Date();
    referenceDate.setHours(hours, minutes, 0, 0);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return referenceDate.toLocaleTimeString(undefined, options);
  }


  // Función para añadir un nuevo horario
  async function addSchedule(scheduleData) {
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.result.error) {

        const { typeResponse, statusMessage, lastInsertedId } = data.result[0][0];
        if (typeResponse === 'error') {
          toast.error(statusMessage)
        } else {
          setOpenSchedulesModal(false);
          toast.success('Datos guardados!')
          setData(prev => [...prev, {
            "id": lastInsertedId,
            "description": scheduleData.description,
            "schedule_time": `${formatTime(scheduleData.startTime)} - ${formatTime(scheduleData.endTime)}`,
          }])

        }
      }
      //setData(prev => [...prev, {} ])
      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      console.error('Failed to add schedule:', error);
      // Manejar errores aquí
    }
  }

  // Función para actualizar un horario existente
  async function editSchedule(scheduleData) {
    try {
      const response = await fetch(`/api/schedules/${idSchedule}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.result.error) {
        const { typeResponse, statusMessage, lastInsertedId } = data.result[0][0];
        if (typeResponse === 'error') {
          toast.error(statusMessage)
        } else {
          toast.success('Datos actualizados!')
          setOpenSchedulesModal(false);
          setData(prev => prev.map(item =>
            Number(item.id) === Number(idSchedule)
              ? {
                ...item,
                description: scheduleData.description,
                schedule_time: `${formatTime(scheduleData.startTime)} - ${formatTime(scheduleData.endTime)}`
              }
              : item
          ));
        }

      }

      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      console.error('Failed to update schedule:', error);
      // Manejar errores aquí
    }
  }
  // Función para actualizar un horario existente
  async function deleteSchedule(idSchedule) {
    try {
      const response = await fetch(`/api/schedules/delete/${idSchedule}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOpenSchedulesModal(false);
      console.log('Schedule updated successfully:', data);
      toast.success('Datos eliminados!')
      if (!data.result.error) {
        setOpenSchedulesModal(false);
        setData(prev => prev.filter(d => Number(d.id) !== Number(idSchedule)));

      }

      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      console.error('Failed to update schedule:', error);
      // Manejar errores aquí
    }
  }



  return <div style={{ height: 400, width: '100%' }}>
    <>
      <Modal open={openSchedulesModal} setOpen={setOpenSchedulesModal} title={scheduleToEdit ? 'Editar horario' : 'Crear horario'}>
        <ScheduleForm
          addSchedule={addSchedule}
          editSchedule={editSchedule}
          scheduleToEdit={scheduleToEdit}
          idSchedule={idSchedule}
        />
      </Modal>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
      // checkboxSelection
      />
    </>
  </div>;
};

export default SchedulesList;
