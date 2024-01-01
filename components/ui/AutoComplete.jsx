import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function AutoComplete({label = '', options}) {  

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
    //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default AutoComplete;
