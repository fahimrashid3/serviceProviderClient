import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import SectionBanner from "../../components/SectionBanner";
import SectionTitle from "../../components/SectionTitle";

const ShortProfile = () => {
  const { _id } = useParams();
  console.log(_id);
  const axiosPublic = useAxiosPublic();
  const [provider, setProvider] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/user/${_id}`).then((res) => {
      const data = res.data;
      setProvider(data);
      setCategoryName(data.category);
    });
  }, [_id, axiosPublic]);
  useEffect(() => {
    axiosPublic
      .get("/category", { params: { category: categoryName } })
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      });
  }, [axiosPublic, categoryName]);
  console.log(provider);
  console.log(category);
  if (!provider || !category)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary "></span>
      </div>
    );

  return (
    <div className="-mt-20 mb-20 dark:bg-dark-700 text-dark-900 dark:text-white">
      <SectionBanner
        img={category.serviceImg}
        title={category.serviceProviderType}
      ></SectionBanner>
      <SectionTitle
        heading={provider.category}
        subHeading="Have a Look"
      ></SectionTitle>
      <div className="flex gap-10">
        <div className="flex-1">
          <img className="rounded-lg " src={provider.userImg} alt="" />
        </div>
        <div className="flex-1 lg:space-y-5">
          <p className="font-semibold lg:text-3xl md:text-2xl text-xl">
            Our Services
          </p>
          <div className=" rounded-lg p-5 bg-dark-200 dark:bg-dark-700">
            <p>{provider.name}</p>
            <p>{provider.qualification}</p>
            <p>{provider.location}</p>
          </div>
          <img
            className="w-full h-[200px] rounded-lg"
            src={category.serviceImg}
            alt=""
          />
          <p className="text-lg">{provider.about}</p>
          <Link
            to={`/fullProfile/${_id}`}
            provider={provider}
            category={category}
            className="btn btn-success btn-outline"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortProfile;
