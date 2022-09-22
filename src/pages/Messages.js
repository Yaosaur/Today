import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { getMessages } from '../services/messages-api';
import dateTransformer from '../utils/dateTransformer';
import { timeTransformer } from '../utils/dateTransformer';
import { io } from 'socket.io-client';

import {
  Grid,
  CircularProgress,
  Typography,
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
  const locationState = useLocation().state;
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef('');
  const messageInput = useRef('');
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BACKEND_URL);
    socket.current.emit('joinRoom', roomId);
    socket.current.on('receiveMsg', message => {
      setArrivalMessage(message);
    });

    const socketInstance = socket.current;

    getMessages(email).then(data => {
      setMessages(data.data);
      setIsLoading(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [currentUserId, roomId, email]);

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    messages &&
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [messages]);

  const submitMessageHandler = () => {
    const receiverEmail = email;
    const sender = currentUser.id;
    const content = messageInput.current.value;
    socket.current.emit('sendMsg', { receiverEmail, sender, content });
    messageInput.current.value = '';
  };

  return (
    <>
      {locationState === null && <Navigate replace to={-1} />}
      {locationState && isLoading && (
        <Grid
          container
          height='100%'
          width='100%'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size='7rem' />
        </Grid>
      )}
      {locationState && (
        <Grid container sx={{ display: isLoading && 'none', height: '90vh' }}>
          <Grid container item lg={12} justifyContent='center' columnGap={1}>
            <Typography variant='h4'>You are chatting with </Typography>
            <Typography variant='h4' fontWeight='bold'>
              {locationState.firstName.split(' (Creator)')[0]}{' '}
              {locationState.lastName}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sx={{
              mt: 3,
              mb: 3,
              height: '70%',
              overflow: 'auto',
              maxHeight: { xl: 550, sm: 500 },
            }}
          >
            <List ref={socket}>
              {messages.map(message => {
                return (
                  <ListItem key={message._id}>
                    <ListItemAvatar>
                      <Avatar
                        src={message.sender.image}
                        sx={{ width: '3rem', height: '3rem' }}
                      >
                        {message.sender.firstName[0]}{' '}
                        {message.sender.lastName[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondaryTypographyProps={{
                        color: 'black',
                        fontWeight: '500',
                      }}
                      primary={
                        <>
                          {message.sender.firstName}
                          <Typography
                            sx={{
                              display: 'inline',
                              marginLeft: 1,
                              fontSize: '0.75rem',
                            }}
                          >
                            {`${dateTransformer(message.createdAt)} at
                      ${timeTransformer(new Date(message.createdAt))}`}
                          </Typography>
                        </>
                      }
                      secondary={message.content}
                    />
                  </ListItem>
                );
              })}
              <div ref={bottomRef} />
            </List>
          </Grid>
          <Grid container item xs={12} sx={{ height: '10%' }}>
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
      )}
    </>
  );
}

export default Messages;
