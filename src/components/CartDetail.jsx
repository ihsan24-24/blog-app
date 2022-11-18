import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router-dom";
import { editBlog, getDataById, IsLogin } from "../helpers/firebase";

const CartDetail = () => {
  const [nowUser, setNowUSer] = React.useState(null);
  const [data, setData] = React.useState("");

  //   const {
  //     state: { date, email, id, name, picture, title },
  //   } = useLocation();
  const { id } = useParams();
  const getData = async () => {
    const newData = await getDataById(id);
    setData(newData);
  };

  React.useEffect(() => {
    getData();
    IsLogin(setNowUSer);
  }, []);
  const editThisBlog = () => {
    // editBlog()
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={data?.picture}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nowUser?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.date}
        </Typography>
      </CardContent>
      <CardActions>
        {data?.email === nowUser?.email && (
          <Button size="small" onClick={editThisBlog}>
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CartDetail;
