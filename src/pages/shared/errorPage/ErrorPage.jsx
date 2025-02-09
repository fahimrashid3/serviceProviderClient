import { Link } from "react-router-dom";
import errorImg from "../../../assets/error.png";
import { IoArrowBack } from "react-icons/io5";

const ErrorPage = () => {
  return (
    <div className="bg-white  dark:bg-black">
      <Link to="/">
        <button className="flex items-center gap-2 mx-auto mt-20 font-rancho font-bold text-3xl text-primary-2">
          <IoArrowBack /> Back to home
        </button>
      </Link>

      <img className="mx-auto" src={errorImg} alt="" />
    </div>
  );
};

export default ErrorPage;
