import { useEffect, useState } from 'react';
import { findUser } from '../services/users-api';
import { useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function MembersSelect(props) {
  const currentUser = useSelector(state => state.auth.user);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.memberOptions) {
      setOptions([currentUser, ...props.memberOptions]);
    } else {
      findUser().then(data => {
        const filteredEmailList = data.data.filter(
          user => user.email !== currentUser.email
        );
        setOptions(filteredEmailList);
      });
    }
  }, [currentUser, props.memberOptions]);

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
