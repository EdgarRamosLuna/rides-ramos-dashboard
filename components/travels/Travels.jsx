'use client'
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../ui/Modal";
import TravelDetails from "./TravelDetails";
import EditIcon from '@mui/icons-material/Edit';
const Travels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [travelID, setTravelID] = useState(0);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {

      fetch("/api/travels")
        .then((response) => response.json())
        .then((data) => {
          const formattedRows = data[0].map(item => ({
            ...item,
            travel_date: formatDate(item.travel_date),
            schedule_time: `${item.start_time} - ${item.end_time}`,
            rate_amount: `$${item.rate_amount.toFixed(2)}`,
            actions: <>
              <button>Detalles</button>
              <button>Borrar</button>
            </>,
          }));
          setData(formattedRows)
          setLoading(false);

        });
    } catch (error) {
      setLoading(false);
    }
  }, []);


  const columns = [
    {
      field: 'id', headerName: '# Viaje', width: 60, headerAlign: 'center', align: 'center',
    },
    { field: 'from_destination', headerName: 'Origen', width: 150 },
    { field: 'to_destination', headerName: 'Destino', width: 150 },
    //{ field: 'distance', headerName: 'Distance (km)', type: 'number', width: 130 },
    { field: 'unit_model', headerName: 'Unidad', width: 150 },
    { field: 'travel_date', headerName: 'Fecha', flex: 1 },
    { field: 'schedule_time', headerName: 'Horario', width: 200 },
    { field: 'rate_amount', headerName: 'Precio unitario', width: 150 },
    {
      field: 'passengers_on_trip', headerName: 'Total viaje', width: 100,

      renderCell: (params) => {
        const { rate_amount, passengers_on_trip, travel_status } = params.row;

        const totalAmount = (Number(rate_amount.replaceAll('$', '')) * Number(passengers_on_trip));

        return (
          <Grid textAlign={'center'}>

            ${`${['COMPLETADO', 'AGENDADO'].includes(travel_status) ? totalAmount.toFixed(2) : '0.00'}`}
          </Grid>
        );
      }
    },
    { field: 'travel_status', headerName: 'Status del viaje', flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const viewTravelDetails = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          setOpenDetailsModal(true)
          setTravelID(params.id)
        };

        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          // Handle delete action
          console.log(`Deleting row with id: ${params.id}`);
        };
        const editTravelDetails = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          // Handle delete action
          console.log(`Editing row with id: ${params.id}`);
        };

        return (
          <Grid textAlign={'center'}>
            <Button
              width="auto"
              color="success"
              margin={'0'}
              padding={'0'}
            >
              <EditIcon onClick={editTravelDetails} />
            </Button>
            <Button
              width="auto"
              color="primary"
              margin={'0'}
              padding={'0'}
            >
              <InfoIcon onClick={viewTravelDetails} />
            </Button>
            <Button
              width="auto"
              color="secondary"
              margin={'0'}
              padding={'0'}
            >
              <DeleteIcon onClick={onClickDelete} />
            </Button>
          </Grid>
        );
      }
    }

  ];

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return <div style={{ height: 400, width: '100%' }}>
    <>

      <Modal open={openDetailsModal} setOpen={setOpenDetailsModal} title={'Detalles del viaje'}>
        <TravelDetails
          data={data.filter(d => Number(d.id) === Number(travelID))}
          travelID={travelID}
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

export default Travels;
