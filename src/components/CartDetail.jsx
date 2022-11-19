import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getDataById, IsLogin } from "../helpers/firebase";
import { useSelector } from "react-redux";

const CartDetail = () => {
  const [data, setData] = React.useState("");
  const navigate = useNavigate();
  const { name, email } = useSelector((state) => state.auth);

  const { id } = useParams();
  const getData = async () => {
    const newData = await getDataById(id);
    console.log(newData);
    setData(newData);
  };

  React.useEffect(() => {
    getData();
  }, []);
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
  console.log("detail çalıştı");
  console.log("id : ", id);
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
    </div>
  );
};

export default CartDetail;
