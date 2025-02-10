import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

const BlogFilter = () => {
  const categoriesData = useCategories();
  const categories = Array.isArray(categoriesData[0]) ? categoriesData[0] : [];

  return (
    <div className="pt-10">
      <div>
        <h2 className="font-bold text-xl mb-2">All Categories</h2>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              className="block p-2 space-y-2 ml-4 text-xl text-black"
              key={category._id}
              to={`/category/${category._id}`}
            >
              {category.serviceProviderType}
            </Link>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default BlogFilter;
