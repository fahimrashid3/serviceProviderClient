import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Blog from "./Blog";
import useCategories from "../../hooks/useCategories";
import Loading from "../../components/Loading";

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
        setDisplayBlogs(res.data); // Initially display all blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [axiosPublic]);

  const handelFilterBlogs = (category) => {
    setActiveCategory(category); // Set active category
    if (category === "allCategory") {
      setDisplayBlogs(blogs); // Show all blogs
    } else {
      const filteredBlogs = blogs.filter((blog) => blog.category === category);
      setDisplayBlogs(filteredBlogs); // Set filtered blogs
    }
  };

  if (!categories || !blogs.length) {
    return <Loading />;
  }

  return (
    <div className="pt-16">
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
          <h1>we can show anything in this section</h1>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
