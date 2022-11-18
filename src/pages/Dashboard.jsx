import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogListListener } from "../helpers/firebase";

const Dashboard = () => {
  const [blogList, setBlogList] = useState([]);

  useBlogListListener(setBlogList);
  return (
    <div sx={{ display: "flex", flexWrap: "wrap" }}>
      {blogList?.map((item) => {
        return <BlogCard key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Dashboard;
