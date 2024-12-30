import { Link } from "react-router-dom";

const Cart = ({ provider }) => {
  const { _id, userImg, category, name, qualification } = provider;

  return (
    <div
      className="
      overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 border rounded-xl
        drop-shadow-lg shadow-dark-900 dark:shadow-dark-200"
    >
      <div className="card card-compact bg-base-100 shadow-xl ">
        <figure>
          <img
            className="w-full h-48 object-cover object-center"
            src={userImg}
            alt={category}
          />
        </figure>
        <div className="card-body -space-y-1">
          <p className="text-green-500">Available</p>
          <h2 className="card-title">{name}</h2>
          <p className="text-lg">{qualification}</p>
          <p className="text-lg">{category}</p>
          <div className="flex items-center card-actions justify-between">
            <Link
              to="/appointment"
              state={{ bookingBtnCategory: category }}
              className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-md"
            >
              Book Now
            </Link>
            <Link
              to={`/shortProfile/${_id}`}
              className="btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 flex gap-3 text-md"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
