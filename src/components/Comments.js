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
  Tooltip,
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
    const editedComment = editCommentInput.current.value.trim();
    if (editedComment.length === 0) {
      return;
    } else if (editedComment === comments[index].comment) {
      return setIsEditing(comments.map(comment => false));
    }
    editComment(taskId, commentId, {
      comment: editedComment,
    }).then(data => {
      setComments(data.data.comments);
      editCommentInput.current.value = '';
    });
  };

  const deleteCommentHandler = (commentId, index) => {
    deleteComment(taskId, commentId).then(data => {
      setComments(data.data.comments);
      handleClose(index);
    });
  };

  return (
    <Grid
      container
      alignContent='flex-start'
      sx={{ height: '90vh' }}
      rowGap={2}
    >
      <Grid container item xs={12}>
        <Typography variant='h4'>Comments</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          mt: 2,
          mb: 2,
          height: '90%',
          overflow: 'auto',
          maxHeight: { xl: 550, sm: 500 },
        }}
      >
        <List sx={{ width: '100%' }}>
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
                  comment.createdAt
                )} ${timeTransformer(new Date(comment.createdAt))}`}
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
                  <>
                    <Typography
                      sx={{ wordWrap: 'break-word', display: 'inline' }}
                      variant='subtitle2'
                    >
                      {comment.comment}
                    </Typography>
                    {comment.createdAt !== comment.updatedAt && (
                      <Tooltip
                        title={`${dateTransformer(
                          comment.updatedAt
                        )} ${timeTransformer(new Date(comment.updatedAt))}`}
                      >
                        <Typography
                          sx={{
                            wordWrap: 'break-word',
                            ml: 1,
                            color: '#BEBEBE',
                          }}
                          variant='caption'
                        >
                          (edited)
                        </Typography>
                      </Tooltip>
                    )}
                  </>
                )}
                {isEditing[index] && (
                  <>
                    <TextField
                      defaultValue={comment.comment}
                      inputRef={editCommentInput}
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
          sx={{ width: '100%', height: '10%', backgroundColor: 'white' }}
          onKeyDown={event => {
            if (event.code === 'Enter') {
              submitCommentHandler();
            }
          }}
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
