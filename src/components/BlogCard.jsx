import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";

import { useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import { addFavorite, deleteFavorite } from "../helpers/firebase";

const BlogCard = ({
  date,
  email,
  comment,
  id,
  name,
  picture,
  title,
  favorite,
}) => {
  const navigate = useNavigate();
  const [color, setColor] = React.useState();
  const userEmail = useSelector((state) => state.auth.email);

  React.useEffect(() => {
    if (favorite) {
      favorite?.forEach((item) => {
        item.email === userEmail ? setColor("red") : setColor("");
      });
    }

    // eslint-disable-next-line
  }, [favorite]);

  const goDetail = () => {
    navigate(`/dashboard/${id}`);
  };
  const handleFavorite = () => {
    const isFavorite = favorite?.filter((item) => item.email === userEmail);
    if (isFavorite.length > 0) {
      const filteredFavorite = favorite?.filter(
        (item) => item.email !== userEmail
      );
      deleteFavorite(filteredFavorite, id);
    } else if (isFavorite.length === 0) {
      addFavorite(userEmail, favorite, id);
    }
  };

  return (
    <Card
      sx={{
        width: "280px",
        height: "400px",
        backgroundColor: "rgba(16, 199, 199, 0.23)",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0].toLocaleUpperCase()}
          </Avatar>
        }
        title={name}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={picture}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="truncate">
          {title}
        </Typography>
      </CardContent>

      <Box sx={{ textAlign: "center", display: "flex" }}>
        <div>
          {userEmail && (
            <>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavorite}
              >
                <FavoriteIcon sx={{ color: color }} />
                <span>&nbsp;{favorite?.length - 1 || 0}</span>
              </IconButton>
              <IconButton aria-label="add to favorites" onClick={goDetail}>
                <CommentIcon />
                <span>&nbsp;{comment?.length - 1 || 0}</span>
              </IconButton>
            </>
          )}
        </div>
        <button onClick={goDetail}>Detail</button>
      </Box>
    </Card>
  );
};

export default BlogCard;
