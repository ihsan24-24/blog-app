import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addBloggItem, editBlog, IsLogin } from "../helpers/firebase";
import { useLocation } from "react-router-dom";

const NewBlock = () => {
  const { state: editData } = useLocation();
  const [newPost, setNewPost] = useState({
    title: editData?.title || "",
    picture: editData?.picture || "",
  });
  const [nowUser, setNowUser] = useState();
  const handleClick = () => {
    if (editData?.edit) {
      //   newPost = {
      //     title: newPost.title || editData.title,
      //     picture: newPost.picture || editData.picture,
      //   };
      editBlog(newPost, nowUser, editData.id);
    } else {
      addBloggItem(newPost, nowUser);
    }
  };
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    IsLogin(setNowUser);
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Box
          sx={{
            width: "80vw",
            border: "2px solid red",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "3rem", marginLeft: "1rem" }}>
            Content
          </span>
          <TextField
            label="Content"
            name="title"
            type="text"
            variant="outlined"
            value={newPost?.title}
            onChange={handleChange}
            //   onBlur={handleBlur}
            //   error={touched.content && Boolean(errors.content)}
            //   helperText={touched.content && errors.content}
            multiline
            rows={4}
            sx={{ marginLeft: "3rem" }}
          />
        </Box>
        <Box
          sx={{
            width: "80vw",
            border: "2px solid red",
            display: "flex",

            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "1.8rem", marginLeft: "1rem" }}>
            Image URL
          </span>
          <TextField
            id="outlined-error-helper-text"
            name="picture"
            label="Error"
            value={newPost?.picture}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ marginLeft: "1rem", marginTop: "1rem" }}
            onClick={handleClick}
          >
            Contained
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default NewBlock;
