import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Blog from "./Blog";
import BlogFilter from "./BlogFilter";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [axiosPublic]);

  return (
    <div className="pt-16">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
        {/* BlogFilter section with its own scroll */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <BlogFilter />
        </div>

        {/* Blog section with its own scroll */}
        <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
          {blogs.length > 0 ? (
            blogs.map((blog) => <Blog key={blog._id} blog={blog} />)
          ) : (
            <p>Loading blogs...</p>
          )}
        </div>
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <h1>we can show anything in this section</h1>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
