import { useSelector } from 'react-redux';
import { useRef } from 'react';

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Messages() {
  const currentUser = useSelector(state => state.auth.user);
  const messageInput = useRef();

  const submitMessageHandler = () => {};

  return (
    <Grid container direction='column'>
      <Grid container item xs={12}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={currentUser.image}>
                {currentUser.firstName[0]} {currentUser.lastName[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Single-line item' />
          </ListItem>
        </List>
      </Grid>
      <Grid container item xs={12}>
        <TextField
          inputRef={messageInput}
          size='small'
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <Button
                size='small'
                variant='contained'
                onClick={submitMessageHandler}
                sx={{ height: '100%' }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            ),
            sx: {
              pr: 0,
              pt: 0,
              pb: 0,
              backgroundColor: 'white',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Messages;
