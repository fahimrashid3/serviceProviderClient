import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUsers from "../../hooks/useUser";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = users?.email; // ✅ Use email instead of _id

  useEffect(() => {
    if (!userEmail) return;

    const fetchMyBlogs = async () => {
      try {
        console.log("Fetching blogs for user email:", userEmail);
        const res = await axiosPublic.get(`/myBlogs/${userEmail}`);
        console.log("API Response:", res.data);
        setMyBlogs(res.data);
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [axiosPublic, userEmail]);

  return (
    <div>
      <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
        {loading ? (
          <p className="text-center text-gray-500 mt-5">Loading blogs...</p>
        ) : myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="space-y-5 mt-5 mb-5 border p-5 rounded-lg shadow-md"
            >
              <p className="font-bold text-2xl">{blog.title}</p>
              <img
                className="h-80 mx-auto rounded-md"
                src={blog.img}
                alt="Blog Image"
              />
              <p>
                {blog.content.length > 200 ? (
                  <>
                    {blog.content.slice(0, 200)}
                    <Link
                      to={`/dashboard/myBlogDetails/${blog._id}`}
                      className="text-blue-600"
                    >
                      Read more...
                    </Link>
                  </>
                ) : (
                  blog.content
                )}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
