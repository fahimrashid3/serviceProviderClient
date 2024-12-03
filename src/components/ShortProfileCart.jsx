const ShortProfileCart = ({ user }) => {
  const { name, userImg, qualification, category, rating } = user;
  return (
    <div
      onClick={() => {
        scrollTo(0, 0);
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
        <h2 className="md:text-xl text-lg md:font-bold font-semibold">
          {name}
        </h2>
        <p className="text-lg font-semibold ">{category}</p>
        <p className="text-lg font-semibold ">{qualification}</p>
      </div>
      <div>
        <p className="text-xl ">
          Rating: <span className="text-primary"> {rating}</span>
        </p>
      </div>
    </div>
  );
};

export default ShortProfileCart;
