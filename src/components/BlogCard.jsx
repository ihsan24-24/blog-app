import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";
import { Box, CardActions } from "@mui/material";
import kebap from "../assets/kebap.jpg";

const BlogCard = ({ date, email, id, name, picture, title, favorite }) => {
  const navigate = useNavigate();
  let color = "";
  const goDetail = () => {
    navigate(`/dashboard/${id}`);
  };
  const addFavorite = () => {};

  return (
    <Card
      sx={{
        width: "280px",
        height: "400px",
        backgroundColor: "rgba(16, 199, 199, 0.23)",
        padding: "1rem",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0].toLocaleUpperCase()}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={name}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={name.toLowerCase() === "dan brown" ? kebap : picture}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="truncate">
          {title}
        </Typography>
      </CardContent>

      <Box sx={{ textAlign: "center", display: "flex" }}>
        <div>
          <i
            className="fa-regular fa-heart"
            id="heart"
            onClick={addFavorite}
          ></i>
        </div>
        <button onClick={goDetail}>Detail</button>
      </Box>
    </Card>
  );
};

export default BlogCard;
