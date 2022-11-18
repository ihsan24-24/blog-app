import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addBloggItem, IsLogin } from "../helpers/firebase";

const NewBlock = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    picture: "",
  });
  const [nowUser, setNowUser] = useState();

  const handleClick = () => {
    addBloggItem(newPost, nowUser);
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
            //   value={values.content}
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
            // value={image}
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
