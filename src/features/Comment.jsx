import { React, useState } from "react";
import ReactDOM from "react-dom";

import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

import Swal from "sweetalert2";

import { useQuery, useMutation, gql } from "@apollo/client";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const ADD_COMMENT = gql`
  mutation ADD_COMMENT($bookId: Int!, $content: String!) {
    createOneComment(bookId: $bookId, content: $content) {
      content
      userId
      id
      createdAt
    }
  }
`;

const GET_COMMENTS = gql`
  query Comment($bookId: Int!) {
    Comment(bookId: $bookId) {
      content
      createdAt
      id
      userId
    }
  }
`;

function CommentBox({ bookId }) {
  const [inputValue, setInputValue] = useState("");

  const [createComment, { data, loading, error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { bookId: parseInt(bookId) } },
    ],
  });

  function handleOnClick() {
    createComment({
      variables: { bookId: parseInt(bookId), content: inputValue },
    });
    setInputValue("");
    Swal.fire("Added comment", "success");
    console.log("clicked", bookId);
  }
  return (
    <div>
      <TextField
        label="Comment"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        multiline
        rows={4}
      />
      <div></div>
      <Button variant="contained" color="primary" onClick={handleOnClick}>
        Submit
      </Button>
    </div>
  );
}

export default function Comment({ bookId }) {
  const {
    loading: commentLoading,
    error: commentError,
    data: commentData,
  } = useQuery(GET_COMMENTS, {
    variables: { bookId: parseInt(bookId) },
  });
  console.log("commentData", commentData);
  return (
    // <>
    //   {commentData?.Comment.map((comment) => (
    //     <div>
    //       {comment.userId},{comment.content},{comment.createdAt}
    //     </div>
    //   ))}
    // </>
    <>
      <div style={{ padding: 14 }} className="App">
        <h1>Comments</h1>
        <Paper style={{ padding: "40px 20px" }}>
          {commentData?.Comment.map((comment) => (
            <Grid key={comment.id} container wrap="nowrap" spacing={2}>
              {/* <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid> */}
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  userId: {comment.userId}
                </h4>
                <p style={{ textAlign: "left" }}>{comment.content}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted at {comment.createdAt}
                </p>
              </Grid>
            </Grid>
          ))}

          <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth></Grid>
          </Grid>
          <CommentBox bookId={bookId} />
        </Paper>
      </div>
    </>
  );
}
