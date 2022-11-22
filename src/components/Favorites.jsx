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
import { deleteFavorite, getDataById } from "../helpers/firebase";
const Favorites = ({ id }) => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.email);
  const [data, setData] = React.useState();
  const getPost = async () => {
    const newData = await getDataById(id);
    setData(newData);
  };

  React.useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  const goDetail = () => {
    navigate(`/dashboard/${id}`);
  };
  const handleFavorite = () => {
    const filteredFavorite = data?.favorite?.filter(
      (item) => item.email !== userEmail
    );
    deleteFavorite(filteredFavorite, id);
  };

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
            {data?.name[0].toLocaleUpperCase()}
          </Avatar>
        }
        title={data?.name}
        subheader={data?.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={data?.picture}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="truncate">
          {data?.title}
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
                <FavoriteIcon sx={{ color: "red" }} />
                <span>&nbsp;{data?.favorite?.length - 1 || 0}</span>
              </IconButton>
              <IconButton aria-label="add to favorites" onClick={goDetail}>
                <CommentIcon />
                <span>&nbsp;{data?.comment?.length - 1 || 0}</span>
              </IconButton>
            </>
          )}
        </div>
        <button onClick={goDetail}>Detail</button>
      </Box>
    </Card>
  );
};

export default Favorites;
