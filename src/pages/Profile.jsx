import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import BlogCard from "../components/BlogCard";
import Comments from "../components/Comments";
import Favorites from "../components/Favorites";

import { IsLogin } from "../helpers/firebase";

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const { blogList } = useSelector((state) => state.posts);
  const [visibility, setVisibility] = useState({
    post: "block",
    fav: "none",
    com: "none",
  });
  const [disable, setDisable] = useState({
    post: true,
    fav: false,
    com: false,
  });

  useEffect(() => {
    IsLogin(setUserInfo);
  }, []);
  const changeVisbility = (e) => {
    if (e.target.id === "post") {
      setVisibility({
        post: "block",
        fav: "none",
        com: "none",
      });
      setDisable({
        post: true,
        fav: false,
        com: false,
      });
    } else if (e.target.id === "fav") {
      setVisibility({
        post: "none",
        fav: "block",
        com: "none",
      });
      setDisable({
        post: false,
        fav: true,
        com: false,
      });
    } else if (e.target.id === "com") {
      setVisibility({
        post: "none",
        fav: "none",
        com: "block",
      });
      setDisable({
        post: false,
        fav: false,
        com: true,
      });
    }
  };
  return (
    <div className="user-info">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "90vw",
          border: "2px solid blue",
        }}
        onClick={changeVisbility}
      >
        <button
          id="post"
          disabled={disable.post}
          style={{ background: disable.post && "red" }}
        >
          Posts
        </button>
        <button
          id="fav"
          disabled={disable.fav}
          style={{ background: disable.fav && "red" }}
        >
          Favorites
        </button>
        <button
          id="com"
          disabled={disable.com}
          style={{ background: disable.com && "red" }}
        >
          Comments
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <div className="user-info-cart">
          <h2 style={{ borderBottom: "1px solid black" }}>Your Information</h2>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>: {userInfo?.name}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Email</td>
                <td>: {userInfo?.email}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Sign in Date</td>
                <td>: {userInfo?.creatTime}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Last Sign up Date</td>
                <td>: {userInfo?.singupTime}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className="show">
          <div className="dashboard" style={{ display: visibility.post }}>
            {blogList
              ?.filter((item) => item?.email === email)
              .map((item) => {
                return <BlogCard key={item.id} {...item} />;
              })}
          </div>
          <div className="dashboard" style={{ display: visibility.fav }}>
            <h2>Favorites</h2>

            {blogList?.map((item) => {
              const filteredPosts = item?.favorite.filter(
                (favList) => favList?.email === email
              );
              return filteredPosts.map((item) => (
                <Favorites key={uuid()} id={item.id} />
              ));
            })}
          </div>
          <div style={{ display: visibility.com }}>
            <h2>Comments</h2>
            {
              // eslint-disable-next-line
              blogList?.map((item) => {
                if (item.comment) {
                  const filteredPosts = item?.comment.filter(
                    (comList) => comList?.email === email
                  );
                  return filteredPosts.map((item) => (
                    <Comments key={uuid()} {...item} profilComment />
                  ));
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// blogList
// // eslint-disable-next-line
// ?.filter((item) => {
//   if (item?.favorite) {
//     const filteredPosts = item?.favorite?.filter(
//       (favList) => favList.email === email
//     );
//     return filteredPosts;
//   }
// })
// .map((fav) => {
//   console.log("fav yenilendi...");
//   return <BlogCard key={uuid()} {...fav} />;
// })

// blogList?.map((item) => {
//   const filteredPosts = item?.favorite?.filter(
//     (favList) => favList.email === email
//   );
//   console.log(filteredPosts);
//   return filteredPosts.map(
//     (item) => console.log("item", item)
//     <BlogCard key={uuid()} {...item.post} />
//   );
// })
