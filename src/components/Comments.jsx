import { Avatar, CardHeader } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const Comments = ({ name, comment, date, id, profilComment }) => {
  return (
    <div style={{ border: "2px solid gray", marginTop: "1rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0]?.toLocaleUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={date}
      />
      <div style={{ borderTop: "1px solid gray" }}>
        <p style={{ marginLeft: "1rem", fontSize: "18px" }}>{comment}</p>
      </div>
      {profilComment && (
        <Link style={{ margin: "1rem" }} to={`/dashboard/${id}`}>
          Go To This Post
        </Link>
      )}
    </div>
  );
};

export default Comments;
