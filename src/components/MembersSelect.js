import { useEffect, useState } from 'react';
import { findUser } from '../services/users-api';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function MembersSelect(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    findUser().then(data => setOptions(data.data));
  }, []);

  return (
    <>
      <Autocomplete
        multiple
        id='tags-standard'
        options={options}
        getOptionLabel={option => option.email}
        onChange={(event, value) => {
          props.onChange(value);
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant='standard'
            label='Members'
            placeholder='Add Members'
          />
        )}
      />
    </>
  );
}

export default MembersSelect;
