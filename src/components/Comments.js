import { useState, useRef } from 'react';
import { createComment } from '../services/comments-api';
import dateTransformer from '../utils/dateTransformer';
import { timeTransformer } from '../utils/dateTransformer';

import {
  Grid,
  List,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fontWeight } from '@mui/system';

function Comments({ taskId, taskComments }) {
  const [comments, setComments] = useState(taskComments);

  const commentInput = useRef('');

  const submitCommentHandler = () => {
    createComment(taskId, { comment: commentInput.current.value }).then(
      data => {
        commentInput.current.value = '';
        setComments(data.data.comments);
      }
    );
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
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                titleTypographyProps={{ variant: 'subtitle1' }}
                title={`${comment.poster.firstName} ${comment.poster.lastName}`}
                subheader={`${dateTransformer(
                  comment.published
                )} ${timeTransformer(new Date(comment.published))}`}
              />
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
