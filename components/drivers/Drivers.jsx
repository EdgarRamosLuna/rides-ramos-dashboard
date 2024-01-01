'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../ui/Modal";
import DriversForm from "./DriversForm";
import MainContext from "@/context/MainContext";
import toast from "react-hot-toast";
import { useConfirm } from "material-ui-confirm";

const DriversList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [idDriver, setIdDriver] = useState(0);
  console.log(data)
  const { openDriversModal, setOpenDriversModal, driverToEdit, setDriverToEdit } = useContext(MainContext);
  const confirm = useConfirm();
  const getData = () => {
    setLoading(true);
    try {

      fetch("/api/drivers")
        .then((response) => response.json())
        .then((data) => {          
          const formattedRows = data[0].map(item => ({
            ...item,  
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
      field: 'full_name', headerName: 'Nombre completo', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'phone_number', headerName: 'Telefono', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'user_name', headerName: 'Usuario', width: 200, flex: 1, headerAlign: 'center', align: 'center',
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
          setOpenDriversModal(true)
          //e.stopPropagation(); // don't select this row after clicking      
          // Handle edit action
          console.log(`Editing row with id: ${params.id}`);
          setIdDriver(params.id)
          setDriverToEdit(true)
        };
        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          confirm({ description: `This will permanently delete ${params.id}.` })
            .then(() => deleteDriver(params.id))
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

  // Función para añadir un nuevo horario
  async function addDriver(driverData) {
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
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
          setOpenDriversModal(false);
          toast.success('Datos guardados!')
          setData(prev => [...prev, {
            "id": lastInsertedId,
            full_name:driverData.fullName,
            phone_number:driverData.phoneNumber,
            user_name:driverData.userName,
            //    "description": driverData.description,           
          }])

        }
      }
      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      console.error('Failed to add driver:', error);
      toast.error('Error al guardar los datos')
      // Manejar errores aquí
    }
  }

  // Función para actualizar un horario existente
  async function editDriver(driverData) {
    try {
      const response = await fetch(`/api/drivers/update/${idDriver}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.result.error) {
        const { typeResponse, statusMessage } = data.result[0][0];
        if (typeResponse === 'error') {
          toast.error(statusMessage)
        } else {
          toast.success('Datos actualizados!')
          setOpenDriversModal(false);
          setData(prev => prev.map(item =>
            Number(item.id) === Number(idDriver)
              ? {
                ...item,
                full_name:driverData.full_name,
                phone_number:driverData.phone_number,
                user_name:driverData.user_name,

              }
              : item
          ));
        }

      }

      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      toast.error('Error al actualizar los datos')
    }
  }
  // Función para actualizar un horario existente
  async function deleteDriver(idDriver) {
    try {
      const response = await fetch(`/api/drivers/delete/${idDriver}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOpenDriversModal(false);
      console.log('Driver updated successfully:', data);
      toast.success('Datos eliminados!')
      if (!data.result.error) {
        setOpenDriversModal(false);
        setData(prev => prev.filter(d => Number(d.id) !== Number(idDriver)));

      }

      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      toast.error('Error al borrar los datos')
    }
  }



  return <div style={{ height: 400, width: '100%' }}>
    <>
      <Modal open={openDriversModal} setOpen={setOpenDriversModal} title={driverToEdit ? 'Editar chofer' : 'Crear chofer'} maxWidth="30%">
        <DriversForm
          addDriver={addDriver}
          editDriver={editDriver}
          driverToEdit={driverToEdit}
          idDriver={idDriver}
        />
      </Modal>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        loading={loading}
        autoHeight={true}

      // checkboxSelection
      />
    </>
  </div>;
};

export default DriversList;
