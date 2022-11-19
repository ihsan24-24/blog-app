import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { useBlogListListener } from "../helpers/firebase";

const Dashboard = () => {
  // const [blogList, setBlogList] = useState([]);
  const dispatch = useDispatch();
  const { blogList } = useSelector((state) => state.posts);
  // useBlogListListener(setBlogList);
  useBlogListListener(dispatch);

  return (
    <div className="dashboard">
      {blogList?.map((item) => {
        return <BlogCard key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Dashboard;
