import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

import { IsLogin } from "../helpers/firebase";

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const { blogList } = useSelector((state) => state.posts);
  console.log(blogList);
  useEffect(() => {
    IsLogin(setUserInfo);
  }, []);

  return (
    <div className="user-info">
      <div className="user-info-cart">
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
      <div className="dashboard">
        {blogList
          ?.filter((item) => item.email === email)
          .map((item) => {
            return <BlogCard key={item.id} {...item} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
