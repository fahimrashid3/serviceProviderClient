import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Blog from "./Blog";
import useCategories from "../../hooks/useCategories";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("allCategory"); // New state for active category
  const categoriesData = useCategories();
  const categories = Array.isArray(categoriesData[0]) ? categoriesData[0] : [];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosPublic.get("/blogs");
        setBlogs(res.data);
        setDisplayBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [axiosPublic]);

  const handelFilterBlogs = (category) => {
    setActiveCategory(category);
    if (category === "allCategory") {
      setDisplayBlogs(blogs);
    } else {
      const filteredBlogs = blogs.filter((blog) => blog.category === category);
      setDisplayBlogs(filteredBlogs);
    }
  };

  if (!categories || !blogs.length) {
    return (
      <div className="pt-16">
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
          <div className=" space-y-3 pl-5">
            <div className="skeleton h-10 w-72"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
            <div className="skeleton h-14 w-44"></div>
          </div>

          {/* middle section  */}
          <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
            <div className="mb-24 border p-5 rounded-lg animate-pulse">
              {/* Header */}
              <div className="flex bg-gray-50 text-black justify-between rounded-t-lg p-3">
                <div className="flex w-full min-h-[60px] items-center">
                  <div className="skeleton h-12 w-12 rounded-full"></div>
                  <div className="ml-3 space-y-2">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-3 w-36"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="skeleton h-6 w-6 rounded"></div>
                  <div className="skeleton h-6 w-6 rounded"></div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5 mb-5">
                <div className="skeleton h-6 w-3/4 mx-auto"></div>
                <div className="skeleton h-80 w-full rounded"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between">
                <div className="skeleton h-5 w-24"></div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-5 w-5 rounded"></div>
                  <div className="skeleton h-5 w-8"></div>
                </div>
              </div>
            </div>
          </div>

          {/* middle section */}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
        {/* BlogFilter section with its own scroll */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <div className="pt-10">
            <div>
              <button
                onClick={() => handelFilterBlogs("allCategory")}
                className={`block p-2 space-y-2 ml-4 text-xl text-black ${
                  activeCategory === "allCategory"
                    ? "bg-primary-500 text-white btn"
                    : ""
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  className={`block p-2 space-y-2 ml-4 text-xl text-black ${
                    activeCategory === category.serviceProviderType
                      ? "bg-primary-500 text-white btn"
                      : ""
                  }`}
                  key={category._id}
                  onClick={() =>
                    handelFilterBlogs(category.serviceProviderType)
                  }
                >
                  {category.serviceProviderType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog section with its own scroll */}
        <div className="md:col-span-2 h-[80vh] overflow-y-auto min-h-screen px-5">
          {displayBlogs.length > 0 ? (
            displayBlogs.map((blog) => <Blog key={blog._id} blog={blog} />)
          ) : (
            <p>No blogs found in this category</p>
          )}
        </div>

        {/* Third section - placeholder for additional content */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <h1 className="font-semibold text-xl mb-2">Additional content</h1>
          <h1>we can show anything in this section</h1>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
