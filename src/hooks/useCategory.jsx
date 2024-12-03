import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategoriesLoading(false);
      });
  }, []);

  return [categories, categoriesLoading];
};

export default useCategories;
