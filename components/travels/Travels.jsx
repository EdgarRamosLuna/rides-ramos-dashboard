'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
const Travels = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/travels")
      .then((response) => response.json())
      .then((data) => {
        const formattedRows = data[0].map(item => ({
          ...item,
          travel_date: formatDate(item.travel_date),
          schedule_time: `${item.start_time} - ${item.end_time}`,
          rate_amount: `$${item.rate_amount}`,
          actions: <>
            <button>Detalles</button>
            <button>Borrar</button>
          </>,
        }));
        setData(formattedRows)
      });
  }, []);

  console.log(data[0])
  const columns = [
    { field: 'id', headerName: 'ID Viaje', width: 90 },    
    { field: 'from_destination', headerName: 'Origen', width: 150 },
    { field: 'to_destination', headerName: 'Destino', width: 150 },
    //{ field: 'distance', headerName: 'Distance (km)', type: 'number', width: 130 },
    { field: 'unit_model', headerName: 'Unidad', width: 150 },
    { field: 'travel_date', headerName: 'Fecha', flex:1 },
    { field: 'schedule_time', headerName: 'Horario', width: 200 },
    { field: 'rate_amount', headerName: 'Precio', width: 150 },
    { field: 'travel_status', headerName: 'Status del viaje', flex:1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      width: 150,
      headerAlign: 'center', 
      align:'center',
      renderCell: (params) => {
        const onClickEdit = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
          const thisRow = {};
  
          // api
          //   .getAllColumns()
          //   .forEach((c) => thisRow[c.field] = params.getValue(params.id, c.field));
          
          // Handle edit action
          console.log(`Editing row with id: ${params.id}`);
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
              color="primary"
            >
              <InfoIcon />
            </Button>
            <Button
              onClick={onClickDelete}
              color="secondary"
            >
              <DeleteIcon/>
            </Button>
          </Grid>
        );
      }
    }
    
  ];
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  
  return <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  </div>;
};

export default Travels;
