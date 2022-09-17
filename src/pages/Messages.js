import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { sendMessage, getMessages } from '../services/messages-api';

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
  const { email } = useParams();
  const location = useLocation();
  const currentUser = useSelector(state => state.auth.user);
  const [messages, setMessages] = useState([]);
  const messageInput = useRef('');

  useEffect(() => {
    getMessages(email).then(data => setMessages(data.data));
  }, [email]);

  const submitMessageHandler = () => {
    sendMessage({
      receiverEmail: email,
      content: messageInput.current.value,
    }).then(data => console.log(data.data));
    messageInput.current.value = '';
  };

  return (
    <Grid container direction='column'>
      <h4>You are chatting with {}</h4>
      <Grid container item xs={12}>
        <List>
          {messages.map(message => {
            console.log(message.sender);
            return (
              <ListItem key={message._id}>
                <ListItemAvatar>
                  <Avatar src={currentUser.image}>
                    {currentUser.firstName[0]} {currentUser.lastName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.content}
                  secondary={message.sender.firstName}
                />
              </ListItem>
            );
          })}
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
