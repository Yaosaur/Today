import { useSelector } from 'react-redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages } from '../services/messages-api';
import { io } from 'socket.io-client';

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
  const currentUserId = currentUser.id;
  const { roomId } = useParams();
  const email = roomId
    .split('&')
    .find(emailAddress => emailAddress !== currentUser.email);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInput = useRef('');
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BACKEND_URL);
    socket.current.emit('joinRoom', roomId);
    socket.current.on('receiveMsg', message => {
      console.log(message);
      setArrivalMessage(message);
    });
    const socketInstance = socket.current;

    getMessages(email).then(data => setMessages(data.data));

    return () => {
      socketInstance.disconnect();
    };
  }, [currentUserId, roomId, email]);

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const submitMessageHandler = () => {
    const receiverEmail = email;
    const sender = currentUser.id;
    const content = messageInput.current.value;
    socket.current.emit('sendMsg', { receiverEmail, sender, content });
    messageInput.current.value = '';
  };

  return (
    <Grid container direction='column'>
      <h4>You are chatting with {}</h4>
      <Grid container item xs={12}>
        <List ref={socket}>
          {messages.map(message => {
            return (
              <ListItem key={message._id}>
                <ListItemAvatar>
                  <Avatar src={message.sender.image}>
                    {message.sender.firstName[0]} {message.sender.lastName[0]}
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
