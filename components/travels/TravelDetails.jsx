'use client'

import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
const TravelDetails = ({ data }) => {

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    //setLoading(true);

  }, []);


  const columns = [
    {
      field: 'travel_driver', headerName: 'Conductor', flex: 1, headerAlign: 'center', align: 'center', sortable: false, 
    },
    {
      field: 'passengers_reserved', headerName: 'Pasajes reservados', flex: 1, headerAlign: 'center', align: 'center', sortable: false, 
    },
    {
      field: 'passengers_on_trip', headerName: 'Pasajes confirmados', flex: 1, headerAlign: 'center', align: 'center', sortable: false, 
    },
    {
      field: 'passengers_completed', headerName: 'Pasajes completados', flex: 1, headerAlign: 'center', align: 'center', sortable: false, 
    },
    {
      field: 'passengers_cancelled', headerName: 'Pasajes cancelados', flex: 1, headerAlign: 'center', align: 'center', sortable: false, 
    },

  ];



  return <div style={{ height: 400, width: '100%' }}>
    <>
      <DataGrid
        rows={data}
        columns={columns}
        disableColumnMenu={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={data.length === 0}
      // checkboxSelection
      />
    </>
  </div>;
};

export default TravelDetails;
