'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../ui/Modal";
import UnitsForm from "./UnitsForm";
import MainContext from "@/context/MainContext";
import toast from "react-hot-toast";
import { useConfirm } from "material-ui-confirm";

const Units = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [idUnit, setIdUnit] = useState(0);  
  const { openUnitsModal, setOpenUnitsModal, unitToEdit, setUnitToEdit } = useContext(MainContext);
  const confirm = useConfirm();
  const getData = () => {
    setLoading(true);
    try {

      fetch("/api/units")
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
      field: 'id', headerName: 'Id unidad', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'model', headerName: 'Nombre completo', width: 200, flex: 1, headerAlign: 'center', align: 'center',
    },
    {
      field: 'capacity', headerName: 'Capacidad', width: 200, flex: 1, headerAlign: 'center', align: 'center',
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
          setOpenUnitsModal(true)
          //e.stopPropagation(); // don't select this row after clicking      
          // Handle edit action
          console.log(`Editing row with id: ${params.id}`);
          setIdUnit(params.id)
          setUnitToEdit(true)
        };
        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          confirm({ description: `This will permanently delete ${params.id}.` })
            .then(() => deleteUnit(params.id))
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
  async function addUnit(unitData) {
    try {
      const response = await fetch('/api/units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unitData),
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
          setOpenUnitsModal(false);
          toast.success('Datos guardados!')
          setData(prev => [...prev, {
            "id": lastInsertedId,
            full_name:unitData.fullName,
            phone_number:unitData.phoneNumber,
            user_name:unitData.userName,
            //    "description": unitData.description,           
          }])

        }
      }
      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      console.error('Failed to add unit:', error);
      toast.error('Error al guardar los datos')
      // Manejar errores aquí
    }
  }

  // Función para actualizar un horario existente
  async function editUnit(unitData) {
    try {
      const response = await fetch(`/api/units/update/${idUnit}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unitData),
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
          setOpenUnitsModal(false);
          setData(prev => prev.map(item =>
            Number(item.id) === Number(idUnit)
              ? {
                ...item,
                full_name:unitData.full_name,
                phone_number:unitData.phone_number,
                user_name:unitData.user_name,

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
  async function deleteUnit(idUnit) {
    try {
      const response = await fetch(`/api/units/delete/${idUnit}`, {
        method: 'PUT', // o 'PATCH' si solo vas a actualizar parte del recurso
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOpenUnitsModal(false);
      console.log('Unit updated successfully:', data);
      toast.success('Datos eliminados!')
      if (!data.result.error) {
        setOpenUnitsModal(false);
        setData(prev => prev.filter(d => Number(d.id) !== Number(idUnit)));

      }

      // Procesar los datos de respuesta como sea necesario
    } catch (error) {
      toast.error('Error al borrar los datos')
    }
  }



  return <div style={{ height: 400, width: '100%' }}>
    <>
      <Modal open={openUnitsModal} setOpen={setOpenUnitsModal} title={unitToEdit ? 'Editar chofer' : 'Crear chofer'} maxWidth="30%">
        <UnitsForm
          addUnit={addUnit}
          editUnit={editUnit}
          unitToEdit={unitToEdit}
          idUnit={idUnit}
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

export default Units;
