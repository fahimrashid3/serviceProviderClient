import { FaPaperPlane } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-300 dark:bg-dark-700 rounded-lg text-dark-900 dark:text-white py-5 md:py-14 lg:my-20 space-y-5"
    >
      <div className="md:flex gap-5 justify-center  lg:px-36 md:px-20 px-5 mx-auto">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full "
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Phone number</span>
          </div>
          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder="Phone number"
            className="input input-bordered w-full "
          />
          {errors.phone && (
            <span className="text-red-500">Phone number is required</span>
          )}
        </label>
      </div>
      <label className="form-control w-full lg:px-36 md:px-20 px-5 mx-auto">
        <div className="label">
          <span className="label-text">Email address</span>
        </div>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email address"
          className="input input-bordered w-full "
        />
        {errors.email && (
          <span className="text-red-500">Email address is required</span>
        )}
      </label>
      <div className="lg:px-36 md:px-20 px-5 mx-auto">
        <label>
          <div className="label">
            <span className="label-text">Type Your Message</span>
          </div>
          <textarea
            {...register("message", { required: true })}
            placeholder="Message"
            className="w-full textarea textarea-bordered lg:h-60 md:h-40 h-28"
          ></textarea>
          {errors.message && (
            <span className="text-red-500">Message is required</span>
          )}
        </label>
      </div>
      <div className="flex justify-center lg:px-36 md:px-20 px-5 mx-auto">
        <button
          type="submit"
          className="btn btn-warning btn-outline flex gap-3 md:text-xl text-lg w-full "
        >
          <FaPaperPlane />
          Sent Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
