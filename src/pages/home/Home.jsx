import SectionBanner from "../../components/SectionBanner";
import Carousel from "./Carousel";
import Categories from "./Categories";
import img from "../../assets/home/HomePageBanner.png";
import PopularServicesProviders from "./PopularServicesProviders";
import Featured from "./featured/Featured";
import Reviews from "./Reviews";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const title = "ServiceFinder";
  const descriptions =
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

  return (
    <div className="pt-5 max-w-[95%] lg:max-w-[90%] mx-auto">
      <Helmet>
        <title>Service Provider</title>
      </Helmet>
      <Carousel></Carousel>
      <Categories></Categories>
      <SectionBanner
        img={img}
        title={title}
        descriptions={descriptions}
      ></SectionBanner>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/about"), scrollTo(0, 0);
          }}
          className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-lg"
        >
          More about us
        </button>
      </div>

      <PopularServicesProviders></PopularServicesProviders>
      <Featured></Featured>
      {/* TODO: filter the reviews according to the rating(star) */}
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
