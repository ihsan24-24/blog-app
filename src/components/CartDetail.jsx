import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getDataById } from "../helpers/firebase";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Newcomment from "./Newcomment";
import Comments from "./Comments";

import uuid from "react-uuid";
const CartDetail = () => {
  const [data, setData] = React.useState("");
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [color, setColor] = React.useState("");

  //! sayfada beğeni yada yorum olduğunda yeniden render etmesi gerektiğinden bu state herhangi bir değişiklikte true ve false olarak değişecek ve sayda yeniden render olacak. useEffect e yorum yada favoriyi dapencity array olarak yazamıyorum çünkü onlar data nın içinde useEffect ise datayı değişiyor. Yani data değişikliği useEffecti çağırıyor useEffecte datayı değiştiriyor bu yüzden sonsuz döngüye giriyor.
  const [isChange, setIsChange] = React.useState(false);
  const getData = async () => {
    const newData = await getDataById(id);
    setData(newData);
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [isChange]);
  const editThisBlog = () => {
    navigate("/newpost", {
      state: { title: data.title, picture: data.picture, edit: true, id },
    });
  };
  const deleteThisBlog = () => {
    deleteBlog(id, navigate);
  };
  const goBack = () => {
    navigate(-1);
  };
  const showComment = () => {};
  const addFavorite = () => {};
  return (
    <div className="detail-cart">
      <Card sx={{ width: "350px", minHeight: "500px" }}>
        <CardMedia
          component="img"
          height="350"
          image={data?.picture}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "18px" }}
          >
            {data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.date}
          </Typography>
        </CardContent>
        <div>
          {email && (
            <>
              <IconButton aria-label="add to favorites" onClick={addFavorite}>
                <FavoriteIcon sx={{ color: color }} />
                <span>&nbsp;{data?.favorite?.length - 1 || 0}</span>
              </IconButton>
              <IconButton aria-label="add to favorites" onClick={showComment}>
                <CommentIcon />
                <span>&nbsp;{data?.comment?.length - 1 || 0}</span>
              </IconButton>
            </>
          )}
        </div>
        <CardActions>
          <button size="small" onClick={goBack}>
            Go Back
          </button>
          {data?.email === email && (
            <button onClick={editThisBlog}>Edit</button>
          )}
          {data?.email === email && (
            <button onClick={deleteThisBlog}>Delete</button>
          )}
        </CardActions>
      </Card>
      <div>
        <Newcomment
          comments={data?.comment}
          isChange={isChange}
          setIsChange={setIsChange}
        />
        <div style={{ marginTop: "1rem" }}>
          {data?.comment?.map((item) => {
            return item?.email && <Comments key={uuid()} {...item} />;
          })}
        </div>
        {/* <Comments comments={data?.comment} /> */}
      </div>
    </div>
  );
};

export default CartDetail;
