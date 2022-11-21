import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import BlogCard from "../components/BlogCard";
import Comments from "../components/Comments";

import { IsLogin } from "../helpers/firebase";

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const { blogList } = useSelector((state) => state.posts);

  useEffect(() => {
    IsLogin(setUserInfo);
  }, []);

  return (
    <div className="user-info">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          border: "2px solid blue",
        }}
      >
        <button>Posts</button>
        <button>Favorites</button>
        <button>Comments</button>
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
        <div>
          <div className="dashboard">
            {blogList
              ?.filter((item) => item?.email === email)
              .map((item) => {
                return <BlogCard key={item.id} {...item} />;
              })}
          </div>
          <div>
            <h2>Favorites</h2>
            {blogList
              ?.filter((item) => {
                const filteredPosts = item?.favorite?.filter(
                  (favList) => favList.email === email
                );
                return filteredPosts;
              })
              .map((fav) => {
                return <BlogCard key={uuid()} {...fav} />;
              })}
          </div>
          <div>
            <h2>Comments</h2>
            {blogList?.map((item) => {
              const filteredPosts = item?.comment.filter(
                (comList) => comList?.email === email
              );
              return filteredPosts.map((item) => (
                <Comments key={uuid()} {...item} />
              ));
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
