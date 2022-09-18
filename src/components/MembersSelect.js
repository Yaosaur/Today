import { useEffect, useState } from 'react';
import { findUsers } from '../services/users-api';
import { useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function MembersSelect({ memberOptions, defaultMembers, onChange, errMsg }) {
  const currentUser = useSelector(state => state.auth.user);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (memberOptions) {
      setOptions([currentUser, ...memberOptions]);
    } else {
      findUsers().then(data => {
        console.log(data);
        const filteredEmailList = data.data.filter(
          user => user.email !== currentUser.email
        );
        setOptions(filteredEmailList);
      });
    }
  }, [currentUser, memberOptions]);

  return (
    <>
      <Autocomplete
        multiple
        id='tags-standard'
        options={options}
        getOptionLabel={option => option.email}
        defaultValue={defaultMembers}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        fullWidth={true}
        chip={{ size: 'small' }}
        onChange={(event, value) => {
          onChange(value);
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant='standard'
            label='Members'
            placeholder='Add Members'
            error={Boolean(errMsg)}
            helperText={errMsg && errMsg}
          />
        )}
      />
    </>
  );
}

export default MembersSelect;
