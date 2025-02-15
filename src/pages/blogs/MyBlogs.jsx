import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUsers from "../../hooks/useUser";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const MyBlogs = () => {
  const [users] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [myBlogs, setMyBlogs] = useState([]);

  const userId = users?._id;
  // console.log("User ID:", userId);

  useEffect(() => {
    if (!userId) return;

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
      <p className="text-xl font-semibold text-blue-600">
        <Typewriter
          words={[
            "Welcome to our medical services.",
            "Find the best doctors.",
            "Book your appointment now!",
          ]}
          loop={Infinity}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </p>
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
