import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createComment } from '../services/comments-api';
import dateTransformer from '../utils/dateTransformer';
import { timeTransformer } from '../utils/dateTransformer';
import { editComment, deleteComment } from '../services/comments-api';

import {
  Grid,
  List,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Comments({ taskId, taskComments }) {
  const currentUserEmail = useSelector(state => state.auth.user.email);
  const [comments, setComments] = useState(taskComments);
  const [anchorEl, setAnchorEl] = useState({ anchorEl: null, menus: [] });
  const [isEditing, setIsEditing] = useState([]);

  useEffect(() => {
    const menus = comments.map(comment => false);
    setAnchorEl({ menus });
    setIsEditing([...menus]);
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [comments]);

  const commentInput = useRef('');
  const editCommentInput = useRef('');
  const bottomRef = useRef('');

  const submitCommentHandler = () => {
    if (commentInput.current.value.trim().length === 0) {
      commentInput.current.value = '';
      return;
    }
    createComment(taskId, { comment: commentInput.current.value }).then(
      data => {
        commentInput.current.value = '';
        setComments(data.data.comments);
      }
    );
  };

  console.log(comments);

  const handleClick = (event, index) => {
    const { menus } = anchorEl;
    menus[index] = true;
    setAnchorEl({ anchorEl: event.currentTarget, menus });
  };

  const handleClose = index => {
    const { menus } = anchorEl;
    menus[index] = false;
    setAnchorEl({ anchorEl: null, menus });
  };

  const isEditingHandler = index => {
    const editAllFalse = comments.map(comment => false);
    let editArray = editAllFalse;
    editArray[index] = true;
    setIsEditing(editArray);
    handleClose(index);
  };

  const editSubmitHandler = (commentId, index) => {
    if (editCommentInput.current.value.trim().length === 0) {
      editCommentInput.current.value = '';
      return;
    }
    editComment(taskId, commentId, {
      comment: editCommentInput.current.value,
    }).then(data => {
      setComments(data.data.comments);
      editCommentInput.current.value = '';
      handleClose(index);
    });
  };

  const deleteCommentHandler = (commentId, index) => {
    deleteComment(taskId, commentId).then(data => {
      setComments(data.data.comments);
      handleClose(index);
    });
  };

  return (
    <Grid container alignContent='flex-start'>
      <Grid container item xs={12} sx={{ height: '80%' }}>
        <Typography variant='h4'>Comments</Typography>
        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            height: { xl: '90%', lg: '80%' },
            maxHeight: { xl: 700, lg: 600 },
            mt: 1,
            mb: 1,
            pb: 0,
            '& ul': { padding: 0 },
          }}
        >
          {comments.map((comment, index) => (
            <Card key={comment._id} sx={{ maxWidth: '100%', boxShadow: 0 }}>
              <CardHeader
                sx={{ pl: 0.5, pb: 0 }}
                avatar={
                  <Avatar
                    src={comment.poster.image}
                  >{`${comment.poster.firstName[0]}${comment.poster.lastName[0]}`}</Avatar>
                }
                action={
                  currentUserEmail === comment.poster.email && (
                    <IconButton onClick={event => handleClick(event, index)}>
                      <MoreVertIcon />
                    </IconButton>
                  )
                }
                titleTypographyProps={{ variant: 'subtitle1' }}
                title={`${comment.poster.firstName} ${comment.poster.lastName}`}
                subheader={`${dateTransformer(
                  comment.published
                )} ${timeTransformer(new Date(comment.published))}`}
              />
              <Menu
                id='basic-menu'
                anchorEl={anchorEl.anchorEl}
                open={
                  anchorEl.menus[index] !== undefined && anchorEl.menus[index]
                }
                onClose={() => handleClose(index)}
              >
                <MenuItem onClick={() => isEditingHandler(index)}>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => deleteCommentHandler(comment._id, index)}
                >
                  Delete
                </MenuItem>
              </Menu>
              <CardContent sx={{ pl: 1 }}>
                {!isEditing[index] && (
                  <Typography
                    sx={{ wordWrap: 'break-word' }}
                    variant='subtitle2'
                  >
                    {comment.comment}
                  </Typography>
                )}
                {isEditing[index] && (
                  <>
                    <TextField
                      inputRef={editCommentInput}
                      defaultValue={comment.comment}
                      size='small'
                      multiline
                      rows={2}
                      sx={{ width: '100%' }}
                    />
                    <Link
                      component='button'
                      variant='body2'
                      sx={{ mr: 2, mt: 1 }}
                      onClick={() => editSubmitHandler(comment._id, index)}
                    >
                      Edit
                    </Link>
                    <Link
                      component='button'
                      variant='body2'
                      sx={{ mt: 1 }}
                      color='error'
                      onClick={() => {
                        const editFalse = comments.map(comment => false);
                        setIsEditing(editFalse);
                      }}
                    >
                      Cancel
                    </Link>
                  </>
                )}
              </CardContent>
              {index !== comments.length - 1 && <Divider />}
            </Card>
          ))}
          <div ref={bottomRef} />
        </List>
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={commentInput}
          size='small'
          multiline
          rows={2}
          sx={{ width: '100%', height: '20%', backgroundColor: 'white' }}
          InputProps={{
            endAdornment: (
              <Button
                size='small'
                variant='contained'
                onClick={submitCommentHandler}
                sx={{ height: '100%' }}
              >
                Comment
              </Button>
            ),
            sx: { pr: 0, pt: 0, pb: 0, backgroundColor: 'white' },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Comments;
