import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import SectionBanner from "../../components/SectionBanner";
// import SectionTitle from "../../components/SectionTitle";

const ShortProfile = () => {
  const { _id } = useParams();
  console.log(_id);
  const axiosPublic = useAxiosPublic();
  const [provider, setProvider] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/providers/${_id}`).then((res) => {
      const data = res.data;
      setProvider(data);
      setCategoryName(data.category);
    });
  }, [_id, axiosPublic]);

  useEffect(() => {
    axiosPublic
      .get("/category", { params: { category: categoryName } })
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      });
  }, [axiosPublic, categoryName]);

  // console.log(provider);
  // console.log(category);

  if (!provider || !category) {
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary "></span>
      </div>
    );
  }

  return (
    <div className="-mt-20 mb-20 dark:bg-dark-700 text-dark-900 dark:text-white">
      <SectionBanner
        img={category.serviceImg}
        title={category.serviceProviderType}
      ></SectionBanner>
      {/* <SectionTitle
        heading={provider.name}
        subHeading={provider.category}
      ></SectionTitle> */}
      <div className="md:flex gap-10 max-w-[95%] md:max-w-[90%] mx-auto mt-6 md:mt-10">
        <div className="flex-1">
          <div className="h-[700px]">
            <img
              className="object-cover rounded-lg w-full h-full"
              src={provider.userImg}
              alt={provider.name}
            />
          </div>
        </div>
        <div className="flex-1 lg:space-y-5">
          <p className="font-semibold lg:text-3xl md:text-2xl text-xl">
            Our Services
          </p>
          <div className="rounded-lg p-5 bg-dark-200 dark:bg-dark-700">
            <p className="font-bold text-lg">{provider.name}</p>
            <p>{provider.qualification}</p>
            <p>{provider.location}</p>
          </div>
          <img
            className="w-full h-56 object-cover rounded-lg"
            src={category.serviceImg}
            alt={category.serviceProviderType}
          />
          <p className="text-lg">{provider.about}</p>
          <div className="flex items-center card-actions">
            <Link
              to="/appointment"
              state={{ bookingBtnCategory: category }}
              className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-md"
            >
              Book Now
            </Link>
            <Link
              to={`/fullProfile/${_id}`}
              state={{ provider, category }}
              className="btn btn-success btn-outline max-w-40 my-3"
            >
              View Full Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortProfile;
