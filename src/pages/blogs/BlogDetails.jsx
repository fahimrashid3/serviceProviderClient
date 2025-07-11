import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const BlogDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (_id) {
      axiosPublic
        .get(`/blog/${_id}`)
        .then((res) => {
          setBlog(res.data);
        })
        .catch((error) => console.error("Error fetching blog:", error))
        .finally(() => setLoading(false));
    } else {
      console.warn("No blog ID found in params");
    }
  }, [_id, axiosPublic]);
  if (loading) {
    return <Loading />;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="lg:pt-24 lg:max-w-[90%] max-w-[95%] mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6">
            <h1 className="font-bold text-3xl mb-4 text-primary-700">
              {blog.title}
            </h1>
            <img
              className="w-full max-h-96 object-cover rounded-lg mb-6 border border-gray-100"
              src={blog.img}
              alt=""
            />
            <p className="text-lg text-gray-800 mb-6 text-justify">
              {blog.content}
            </p>
            <Link
              to={"/blogs"}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-primary-600 text-primary-600 font-bold hover:bg-primary-600 hover:text-white transition-colors"
            >
              <IoMdArrowRoundBack />
              Back to Blogs
            </Link>
            <p className="text-red-600 mt-4 text-sm">
              NOTE: rating system will add soon........{" "}
            </p>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h1 className="font-semibold text-xl mb-2">Additional content</h1>
            <p className="text-gray-600">
              Any additional content can be displayed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
