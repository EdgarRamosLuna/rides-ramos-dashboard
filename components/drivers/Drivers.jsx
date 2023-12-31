'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Drivers = ({data}) => {  
  
  const [loading, setLoading] = useState(null); 
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
          setOpen(true)
          //e.stopPropagation(); // don't select this row after clicking      
          // Handle edit action
        //  console.log(`Editing row with id: ${params.id}`);
          setIdSchedule(1)
          setScheduleToEdit(true)
        };

        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          // Handle delete action
          console.log(`Deleting row with id: ${params.id}`);
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
  
  return <div style={{ height: 400, width: '100%' }}>
    <>
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

export default Drivers;
