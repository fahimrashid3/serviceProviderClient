import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUsers from "../../hooks/useUser";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [myBlogs, setMyBlogs] = useState([]); // Initialize as an empty array

  const userId = users?._id; // Prevent accessing _id if users is undefined
  console.log("User ID:", userId);

  useEffect(() => {
    if (!userId) return; // Don't run the effect if userId is undefined

    const fetchMyBlogs = async () => {
      try {
        const res = await axiosPublic.get(`/myBlogs/${userId}`);
        setMyBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchMyBlogs();
  }, [axiosPublic, userId]);

  return (
    <div>
      <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div key={blog._id} className="space-y-5 mt-5 mb-5 border">
              <p className="font-bold text-2xl">{blog.title}</p>
              <img
                className="h-80 mx-auto"
                src={blog.img}
                alt={"Image not available"}
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
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
