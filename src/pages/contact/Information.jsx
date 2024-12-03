import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { IoTime } from "react-icons/io5";

const Information = () => {
  return (
    <div className="md:flex justify-around text-center mb-20">
      <div className="md:hover:-mt-5 transition-all duration-500 cursor-context-menu">
        <div className="border-2 border-dark-900 dark:border-white rounded-lg mt-5 md:mt-0 ">
          <div className="flex justify-center bg-primary text-white w-full py-4 md:text-2xl text-xl ">
            <IoMdCall />
          </div>
          <div className="p-10 rounded-lg  text-dark-900 dark:text-dark-200 bg-dark-200 dark:bg-dark-700 md:w-80 w-full h-44 mx-auto">
            <p className="md:text-2xl text-xl font-semibold ">PHONE</p>
            <p className="md:text-xl text-lg ">+880 1405819175</p>
          </div>
        </div>
      </div>
      <div className="md:hover:-mt-5 transition-all duration-500 cursor-context-menu">
        <div className="border-2 border-dark-900 dark:border-white rounded-lg mt-5 md:mt-0 ">
          <div className="flex justify-center bg-primary text-white w-full py-4 md:text-2xl text-xl ">
            <FaLocationDot />
          </div>
          <div className="p-10 rounded-lg  text-dark-900 dark:text-dark-200 bg-dark-200 dark:bg-dark-700 md:w-80 w-full h-44 mx-auto">
            <p className="md:text-2xl text-xl font-semibold ">Location</p>
            <p className="md:text-xl text-lg ">Rupnagar R/A, Dhaka</p>
          </div>
        </div>
      </div>
      <div className="md:hover:-mt-5 transition-all duration-500 cursor-context-menu">
        <div className="border-2 border-dark-900 dark:border-white rounded-lg mt-5 md:mt-0 ">
          <div className="flex justify-center bg-primary text-white w-full py-4 md:text-2xl text-xl ">
            <IoTime />
          </div>
          <div className="p-10 rounded-lg  text-dark-900 dark:text-dark-200 bg-dark-200 dark:bg-dark-700 md:w-80 w-full h-44 mx-auto">
            <p className="md:text-2xl text-xl font-semibold ">WORKING HOURS</p>
            <p className="md:text-xl text-lg ">Mon - Fri: 08:00 - 22:00</p>
            <p className="md:text-xl text-lg ">Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
