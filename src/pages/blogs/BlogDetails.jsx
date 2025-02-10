import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const BlogDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null); // Initial state as null for loading state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosPublic.get(`/blog/${_id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [_id, axiosPublic]);

  if (loading) {
    return <Loading />; // Show loading state
  }

  if (!blog) {
    return <p>Blog not found</p>; // Error or not found state
  }

  return (
    <div className="lg:pt-24 lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3">
          <h1 className="font-semibold text-xl mb-2">Blog details</h1>

          <div className="border p-4  space-y-5">
            <img className="lg:h-96" src={blog.img} alt="" />
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-lg text-justify">{blog.content}</p>
            {/* Render other details from the blog object */}
            <Link
              className="
            btn bg-transparent border-1 border-b-4 mx-auto
             border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white
              hover:border-primary-600"
            >
              <IoMdArrowRoundBack />
              Back to Blocks
            </Link>
            {/* TODO:add ratting system */}
            <p className="text-red-600">
              NOTE: rating system will add soon........{" "}
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="font-semibold text-xl mb-2">Additional content</h1>
          <h1>Any additional content can be displayed</h1>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
