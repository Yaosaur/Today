import { useState, useEffect, useRef } from 'react';
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Comments({ taskId, taskComments }) {
  const [comments, setComments] = useState(taskComments);
  const [anchorEl, setAnchorEl] = useState({ anchorEl: null, menus: [] });

  useEffect(() => {
    const menus = comments.map(comment => false);
    setAnchorEl({ menus });
  }, [comments]);

  const commentInput = useRef('');

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

  const deleteCommentHandler = (commentId, index) => {
    deleteComment(taskId, commentId).then(data => {
      setComments(data.data.comments);
      handleClose(index);
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4'>Comments</Typography>
        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            height: '100%',
            maxHeight: 580,
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
                  <Avatar>{`${comment.poster.firstName[0]}${comment.poster.lastName[0]}`}</Avatar>
                }
                action={
                  <IconButton onClick={event => handleClick(event, index)}>
                    <MoreVertIcon />
                  </IconButton>
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
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem
                  onClick={() => deleteCommentHandler(comment._id, index)}
                >
                  Delete
                </MenuItem>
              </Menu>
              <CardContent sx={{ pl: 1 }}>
                <Typography sx={{ wordWrap: 'break-word' }} variant='subtitle2'>
                  {comment.comment}
                </Typography>
              </CardContent>
              {index !== comments.length - 1 && <Divider />}
            </Card>
          ))}
        </List>
      </Grid>
      <TextField
        inputRef={commentInput}
        size='small'
        multiline
        rows={2}
        sx={{ width: '100%', height: 100 }}
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
          sx: { pr: 0, pt: 0, pb: 0 },
        }}
      />
    </Grid>
  );
}

export default Comments;
