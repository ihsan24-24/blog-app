import { Avatar, Card, CardHeader, TextField } from "@mui/material";
import { red } from "@mui/material/colors";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../helpers/firebase";
import { toastErrorNotify } from "../helpers/toastNotify";

const Newcomment = ({ comments, setIsChange, isChange }) => {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const { name, email } = useSelector((state) => state.auth);

  const handleComment = () => {
    if (newComment) {
      addComment({ comment: newComment, email, name }, comments, id);
      setIsChange(!isChange);
      setNewComment("");
    } else {
      toastErrorNotify("Please enter a comment...");
    }
  };
  return (
    <Card>
      <div>
        <TextField
          label="Comment"
          name="title"
          type="text"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          multiline
          rows={3}
          sx={{ marginTop: "0.5rem" }}
        />
        <button onClick={handleComment}>Save</button>
      </div>
    </Card>
  );
};

export default Newcomment;
