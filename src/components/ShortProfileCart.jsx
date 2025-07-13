import { useNavigate } from "react-router-dom";

const ShortProfileCart = ({ user }) => {
  const navigate = useNavigate();
  const { _id, name, userImg, qualification, category, rating } = user;
  return (
    <div
      onClick={() => {
        navigate(`/shortProfile/${_id}`);
      }}
      className="flex justify-between items-center gap-5 border p-4 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <div className="w-32 h-32 overflow-hidden rounded-b-full rounded-r-full">
        <img
          className="object-cover object-center w-full h-full"
          src={userImg}
          alt={name}
        />
      </div>
      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-lg font-semibold ">{category}</p>
        <p>{qualification}</p>
      </div>
      <div>
        <p>
          Rating: <span className="text-primary-400"> {rating}</span>
        </p>
      </div>
    </div>
  );
};

export default ShortProfileCart;
