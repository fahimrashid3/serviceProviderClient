import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import SectionBanner from "../../components/SectionBanner";
import useCategories from "../../hooks/useCategory";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAppointment from "../../hooks/useAppointment";
const Appointment = () => {
  const [, refetch] = useAppointment();
  const AxiosSecure = useAxiosSecure();
  const [categories] = useCategories();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("");
  const { user } = useAuth();

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSubmittedCategory(categoryName);
  };

  const getAvailableSlot = async () => {
    setTimeSlot([]); // Reset time slots

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the starting time to 10:00 AM
      if (i === 0 && today.getHours() > 10) {
        // If today is the current day and the time is past 10:00 AM
        currentDate.setHours(today.getHours() + 1, 0, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // End time at 9:00 PM

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment by 2 hours
        currentDate.setHours(currentDate.getHours() + 2);
      }

      setTimeSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlot();
  }, [selectedCategory]);

  const handelAppointment = () => {
    // Short formatted date
    const date = timeSlot[slotIndex][0].dateTime.toDateString();
    // remove day from object coz of  duplicate data . if we need day we can split after load date data
    // const day = date.split(" ")[0];

    const appointmentDetails = {
      category: submittedCategory,
      date,
      // day,
      time: slotTime,
      email: user.email,
    };
    console.log(appointmentDetails);
    AxiosSecure.post("/appointments", appointmentDetails).then((res) => {
      // refetch the card items to add item automatically
      console.log(res.data);
      if (res.data.insertedId) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You must login before add item",
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
          <title>ServiceFinder | Appointment</title>
        </Helmet>
        <SectionBanner
          img={"https://i.ibb.co.com/6bm34g2/appointment.jpg"}
          title="Appointment"
        ></SectionBanner>
        <SectionTitle
          heading={"Book an appointment"}
          subHeading={"Find your requirements"}
        ></SectionTitle>
        <div className="md:flex md:flex-row-reverse">
          <div className="w-1/4 bg-white  p-10 rounded-lg shadow-lg max-w-[90%] mx-auto space-y-6">
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>details</p>
              <p>details</p>
            </div>

            <div className="mx-auto flex justify-center mt-10">
              {slotTime ? (
                <button
                  onClick={handelAppointment}
                  className="
               btn border-b-8 font-semibold text-primary-900 hover:text-white 
                hover:border-primary-600  border-primary-700 bg-primary-300 hover:bg-primary-500
                 transition-all duration-200 w-full"
                >
                  Book now
                </button>
              ) : (
                <button
                  onClick={handelAppointment}
                  disabled
                  className="
                btn border-b-8 font-semibold text-primary-900 hover:text-white 
                 hover:border-primary-600  border-primary-700 bg-primary-300 hover:bg-primary-500
                  transition-all duration-200 w-full"
                >
                  Book now
                </button>
              )}
            </div>
          </div>
          <div className="w-3/4 md:px-20 px-6">
            {/* Booking category */}
            <div className=" mb-5">
              {!selectedCategory ? (
                <p className=" text-red-500 text-xl font-semibold">
                  Select a category
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Category
            </p>
            <div className="flex gap-5 justify-start mt-5">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() =>
                    handleCategoryClick(
                      category._id,
                      category.serviceProviderType
                    )
                  }
                  className={`border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-primary-400 ${
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

            {/* Booking slots */}
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Date
            </p>
            <div className=" mb-5">
              {!slotIndex && selectedCategory ? (
                <p className=" text-red-500 text-xl font-semibold">
                  Select Date
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              {selectedCategory ? (
                <div className="flex gap-3 items-center justify-start w-full overflow-x-scroll mt-4">
                  {timeSlot.length > 0 &&
                    timeSlot.map((item, index) => (
                      <div
                        onClick={() => setSlotIndex(index)}
                        className={` mb-4 text-center text-xl font-semibold py-6 min-w-32 rounded-xl cursor-pointer border shadow-lg hover:shadow-2xl hover:shadow-primary-400 ${
                          slotIndex === index
                            ? "bg-primary-300 text-primary-800 border-primary-800"
                            : "bg-white text-dark-600 border-gray-200"
                        }`}
                        key={index}
                      >
                        <p>
                          {item[0]?.dateTime &&
                            daysOfWeek[item[0].dateTime.getDay()]}
                        </p>
                        <p>{item[0]?.dateTime && item[0].dateTime.getDate()}</p>
                      </div>
                    ))}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Booking time */}
            {!slotTime && slotIndex ? (
              <div className=" mb-5">
                <p className=" text-red-500 text-xl font-semibold">
                  Select a time slot
                </p>
              </div>
            ) : (
              ""
            )}
            <p className="font-bold text-3xl pt-16 text-primary-600">
              Select Time
            </p>
            <div className="mt-10">
              {slotIndex ? (
                <div>
                  <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 sm:my-4 w-full mt-4">
                    {timeSlot.length &&
                      timeSlot[slotIndex].map((item, index) => (
                        <p
                          onClick={() => setSlotTime(item.time)}
                          className={`flex-shrink-0 py-2 rounded-full cursor-pointer text-center border shadow-lg hover:shadow-2xl hover:shadow-primary-400 ${
                            item.time === slotTime
                              ? "bg-primary-300 text-primary-800 border-primary-800"
                              : "bg-white text-dark-600 border-gray-200"
                          }`}
                          key={index}
                        >
                          {item.time.toLowerCase()}
                        </p>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <div className="mx-auto flex justify-center mt-10">
              {slotTime ? (
                <button
                  onClick={handelAppointment}
                  className="btn border-b-8 hover:border-primary-600 font-semibold border-primary-700 text-primary-900 bg-primary-300 hover:bg-primary-500 hover:text-white transition-all duration-200 rounded-lg w-[70%] md:w-[20%]"
                >
                  Book now
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
