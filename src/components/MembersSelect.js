import { useEffect, useState } from 'react';
import { findUser } from '../services/users-api';
import { useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function MembersSelect(props) {
  const currentUserEmail = useSelector(state => state.auth.user.email);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    findUser().then(data => {
      const filteredEmailList = data.data.filter(
        user => user.email !== currentUserEmail
      );
      setOptions(filteredEmailList);
    });
  }, []);

  return (
    <>
      <Autocomplete
        multiple
        id='tags-standard'
        options={options}
        getOptionLabel={option => option.email}
        defaultValue={props.defaultMembers}
        isOptionEqualToValue={(option, value) => option.email === value.email}
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
