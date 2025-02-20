import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import ShortProfileCart from "../../components/ShortProfileCart";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const PopularServicesProviders = () => {
  const navigate = useNavigate();
  const [topProviders, setTopProviders] = useState([]);
  const axiosPublic = useAxiosPublic(); // Axios instance for public API calls

  useEffect(() => {
    let isMounted = true; // Prevents updating state on an unmounted component

    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/topProvider");
        if (isMounted && res.data.length > 0) {
          setTopProviders(res.data); // Update state with providers
        } else {
          console.warn("No popular service providers found.");
        }
      } catch (error) {
        console.error("Error fetching top providers:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [axiosPublic]);

  return (
    <div className="mb-12 md:mb-20">
      <SectionTitle heading="Popular Services" subHeading="from our services" />
      {topProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mb-12 md:mb-20">
          {topProviders.map((provider) => (
            <ShortProfileCart key={provider._id} user={provider} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mb-12 md:mb-20">
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
          {/* skeleton start */}
          <div className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer">
            <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
              <div className="skeleton w-full h-full"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-32"></div>
              <div className="skeleton h-5 w-28"></div>
              <div className="skeleton h-5 w-36"></div>
            </div>
            <div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
          {/* skeleton end */}
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate("/ourServices");
            scrollTo(0, 0);
          }}
          className="btn bg-transparent border border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg"
        >
          Show all
        </button>
      </div>
    </div>
  );
};

export default PopularServicesProviders;
