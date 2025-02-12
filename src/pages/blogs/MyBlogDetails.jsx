import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const MyBlogDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle error messages

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/${_id}`);
        setBlog(res.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Invalid blog ID format");
        } else if (error.response && error.response.status === 404) {
          setError("Blog not found");
        } else {
          setError("An error occurred while fetching the blog.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id, axiosPublic]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <h1 className="font-semibold text-xl mb-2">Blog details</h1>
      <div className="border p-4 space-y-5">
        <img className="lg:h-96" src={blog.img} alt="Blog" />
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="text-lg text-justify">{blog.content}</p>
        {/* TODO: edit option */}
        <p className="text-red-500">Edit option will be introduce soon</p>
      </div>
    </div>
  );
};

export default MyBlogDetails;
