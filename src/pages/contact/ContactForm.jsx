import { FaPaperPlane } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ContactForm = () => {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const contactSMSInfo = {
      ...data, // Spread the form data
      createdAt: Date.now(), // Save the current timestamp in milliseconds
      // Alternatively, use a human-readable format:
      // createdAt: new Date().toISOString(), // ISO format (e.g., "2023-10-05T12:34:56.789Z")
      // createdAt: new Date().toString(), // Human-readable format (e.g., "Wed Oct 05 2023 12:34:56 GMT+0000")
    };

    console.log(contactSMSInfo);

    AxiosSecure.post("/contacts", contactSMSInfo)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/");
          scrollTo(0, 0);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message sent successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting contact message:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to send message!",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  if (!user) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 mt-8 animate-fade-in-up"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full relative group">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder=" "
            className="peer w-full p-5 border border-primary-200 rounded-xl focus:outline-none focus:border-primary-500 text-base transition-all duration-200 bg-white shadow-sm focus:shadow-primary-100"
          />
          <label className="absolute left-5 top-1/2 -translate-y-1/2 bg-white px-1 text-primary-500 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 peer-focus:bg-white">
            Name
          </label>
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
              Name is required
            </span>
          )}
        </div>
        <div className="w-full relative group">
          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder=" "
            className="peer w-full p-5 border border-primary-200 rounded-xl focus:outline-none focus:border-primary-500 text-base transition-all duration-200 bg-white shadow-sm focus:shadow-primary-100"
          />
          <label className="absolute left-5 top-1/2 -translate-y-1/2 bg-white px-1 text-primary-500 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 peer-focus:bg-white">
            Phone number
          </label>
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
              Phone number is required
            </span>
          )}
        </div>
      </div>
      <div className="w-full relative group">
        <input
          disabled
          {...register("email")}
          type="email"
          placeholder={user.email}
          value={user.email}
          className="peer w-full p-5 border border-primary-100 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none text-base"
        />

        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block animate-fade-in">
            Email address is required
          </span>
        )}
      </div>
      <div className="w-full relative group">
        <textarea
          {...register("message", { required: true })}
          placeholder=" "
          className="peer w-full p-5 border border-primary-200 rounded-xl focus:outline-none focus:border-primary-500 text-base min-h-[120px] md:min-h-[160px] transition-all duration-200 bg-white shadow-sm focus:shadow-primary-100"
        ></textarea>
        <label className="absolute left-5 top-6 bg-white px-1 text-primary-500 pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary-600 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary-500 peer-focus:bg-white">
          Type Your Message
        </label>
        {errors.message && (
          <span className="text-red-500 text-sm mt-1 block animate-fade-in">
            Message is required
          </span>
        )}
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full py-5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
        >
          <span className="group-hover:animate-paperplane-move">
            <FaPaperPlane />
          </span>
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
