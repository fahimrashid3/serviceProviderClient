import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import SectionBanner from "../../components/SectionBanner";
import useCategories from "../../hooks/useCategories";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAppointment from "../../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";

const Appointment = () => {
  const navigate = useNavigate();
  const [, refetch] = useAppointment();
  const AxiosSecure = useAxiosSecure();
  const [categories] = useCategories();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("");
  const [submittedPrice, setSubmittedPrice] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");

  const { user } = useAuth();
  const [users] = useUsers();

  const handleCategoryClick = (
    categoryId,
    categoryName,
    categoryPrice,
    categoryTime
  ) => {
    setSelectedCategory(categoryId);
    setSubmittedCategory(categoryName);
    setSubmittedPrice(categoryPrice);
    setSubmittedTime(categoryTime);
  };

  const getAvailableSlot = () => {
    const today = new Date();
    const next7DaysSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const slots = [];
      let slotTime = new Date(currentDate);
      // Start time: 10:00 AM
      slotTime.setHours(10, 0, 0, 0);
      const endTime = new Date(currentDate);
      // End time: 9:00 PM
      endTime.setHours(21, 0, 0, 0);

      while (slotTime < endTime) {
        slots.push({
          dateTime: new Date(slotTime),
          time: slotTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        // Increment by 2 hours
        slotTime.setHours(slotTime.getHours() + 2);
      }

      next7DaysSlots.push(slots);
    }

    setTimeSlot(next7DaysSlots);
  };

  useEffect(() => {
    getAvailableSlot();
  }, []);

  const handleDateClick = (index) => {
    setSlotIndex(index);
    const date = timeSlot[index][0].dateTime.toDateString();
    setSelectedDate(date);
    setSlotTime("");
  };

  const handleTimeClick = (time) => {
    if (selectedCategory && slotIndex !== null) {
      setSlotTime(time);
    }
  };

  const handleAppointment = () => {
    const appointmentDetails = {
      category: submittedCategory,
      date: selectedDate,
      time: slotTime,
      price: submittedPrice,
      email: user.email,
      userName: users.name || "null",
      userId: users._id,
    };

    AxiosSecure.post("/appointments", appointmentDetails).then((res) => {
      if (res.data.insertedId) {
        refetch();
        navigate("/checkout");
        scrollTo(0, 0);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Appointment booked successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div className="pt-28 bg-primary-100">
      <div className="-mt-20 min-h-screen">
        <Helmet>
          <title>Appointment</title>
        </Helmet>
        <SectionBanner
          img={"https://i.ibb.co.com/6bm34g2/appointment.jpg"}
          title="Appointment"
        />
        <SectionTitle
          heading={"Book an appointment"}
          subHeading={"Find your requirements"}
        />
        <div className="flex flex-col-reverse md:flex-row-reverse lg:px-20 md:px-12 px-5">
          <div className="md:w-1/4 mt-10 md:mt-0">
            <div
              className="
            bg-white py-5 px-3 rounded-lg md:max-w-[98%] mx-auto
            space-y-6 flex flex-col  shadow-primary-400 shadow-2xl"
            >
              <div className="flex justify-between">
                <p>Category :</p>
                <p>
                  {selectedCategory ? submittedCategory : "Select category"}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Price (taka) :</p>
                <p>{selectedCategory ? submittedPrice : "Select category"}</p>
              </div>
              <div className="flex justify-between">
                <p>Meeting Time :</p>
                <p>{selectedCategory ? submittedTime : "Select category"}</p>
              </div>
              <div className="flex justify-between">
                <p>Date :</p>
                <p>{selectedDate || "Select Date"}</p>
              </div>
              <div className="flex justify-between">
                <p>Time :</p>
                <p>{slotTime || "Select Time"}</p>
              </div>
              <div className="mx-auto flex justify-center mt-10"></div>
              <button
                onClick={handleAppointment}
                disabled={!selectedCategory || !selectedDate || !slotTime}
                className={`btn border-b-8 font-semibold 
                    text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-300 hover:bg-primary-500 
                    transition-all duration-200 w-full ${
                      !selectedCategory || !selectedDate || !slotTime
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
              >
                Book now
              </button>
            </div>
          </div>
          <div className="md:w-3/4 md:pr-20 pr-5">
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Category
            </p>
            {/* category display section */}
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 justify-start mt-5">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() =>
                    handleCategoryClick(
                      category._id,
                      category.serviceProviderType,
                      category.price,
                      category.time
                    )
                  }
                  className={`border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-primary-500 hover:shadow-2xl ${
                    selectedCategory === category._id
                      ? "bg-primary-300 text-primary-800 border-primary-800"
                      : "bg-white text-dark-600 border-gray-200"
                  }`}
                >
                  <p className="text-2xl font-bold">
                    {category.serviceProviderType}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Date
            </p>
            {/* display date section */}
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-5 sm:my-4 w-full mt-4">
              {timeSlot.map((item, index) => (
                <div
                  onClick={() => handleDateClick(index)}
                  className={`mb-4 text-center text-xl font-semibold py-6 min-w-32 rounded-xl cursor-pointer border shadow-lg hover:shadow-primary-500  hover:shadow-2xl ${
                    slotIndex === index
                      ? "bg-primary-300 text-primary-800 border-primary-800"
                      : "bg-white text-dark-600 border-gray-200"
                  }`}
                  key={index}
                >
                  <p>
                    {item[0]?.dateTime && daysOfWeek[item[0].dateTime.getDay()]}
                  </p>
                  <p>{item[0]?.dateTime.getDate()}</p>
                </div>
              ))}
            </div>
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Time
            </p>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 sm:my-4 w-full mt-4">
              {timeSlot.length &&
                selectedCategory &&
                timeSlot[slotIndex]?.map((item, index) => (
                  <p
                    onClick={() => handleTimeClick(item.time)}
                    className={`py-2 rounded-full cursor-pointer text-center border shadow-lg hover:shadow-primary-400 hover:shadow-xl ${
                      item.time === slotTime
                        ? "bg-primary-300 text-primary-800 border-primary-800"
                        : "bg-white text-dark-600 border-gray-200"
                    } ${
                      !selectedCategory || slotIndex === null
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
