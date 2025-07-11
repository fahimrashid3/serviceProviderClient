import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { IoTime } from "react-icons/io5";

const Information = () => {
  return (
    <div className="w-full animate-fade-in-up">
      <div className="bg-white border border-primary-200 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {/* Phone Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-2xl shadow-md">
            <IoMdCall />
          </span>
          <span className="font-bold text-primary-700 text-lg sm:text-xl min-w-[110px]">
            PHONE
          </span>
          <span className="text-gray-800 text-base sm:text-lg font-medium break-all">
            +880 1405819175
          </span>
        </div>
        <div className="border-t border-primary-100 my-2" />
        {/* Location Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-2xl shadow-md">
            <FaLocationDot />
          </span>
          <span className="font-bold text-primary-700 text-lg sm:text-xl min-w-[110px]">
            LOCATION
          </span>
          <span className="text-gray-800 text-base sm:text-lg font-medium">
            Rupnagar R/A, Dhaka
          </span>
        </div>
        <div className="border-t border-primary-100 my-2" />
        {/* Working Hours Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-2xl shadow-md">
            <IoTime />
          </span>
          <span className="font-bold text-primary-700 text-lg sm:text-xl min-w-[110px]">
            WORKING HOURS
          </span>
          <span className="text-gray-800 text-base sm:text-lg font-medium">
            <span>Mon - Fri: 08:00 - 22:00</span>
            <br className="hidden sm:block" />
            <span>Sat - Sun: 10:00 - 23:00</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Information;
