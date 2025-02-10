import { CiBookmark, CiShare2 } from "react-icons/ci";
import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";

const MainNews = ({ blog }) => {
  const {
    _id,
    authorName,
    authorImage,
    time,
    date,
    title,
    content,
    rating,
    img,
    totalView,
  } = blog;

  const handelSaveButton = () => {
    Swal.fire("Features not added!");
  };

  return (
    <div className="mb-24 border p-5 rounded-lg">
      <div className="flex bg-gray-50 text-black justify-between rounded-t-lg">
        <div className="flex">
          <img
            className="rounded-full w-12 h-12 mr-3 object-cover object-center"
            src={authorImage}
            alt={authorName}
          />
          <div>
            <p className="font-semibold text-xl">{authorName}</p>
            <div className="flex gap-5">
              <p>{date}</p>
              <p>{time}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handelSaveButton}
          className="flex text-xl items-center gap-2 mr-3"
        >
          <CiBookmark />
          <CiShare2 />
        </button>
      </div>

      <div className="space-y-5 mt-5 mb-5">
        <p className="font-bold text-2xl">{title}</p>
        <img className="h-80 mx-auto" src={img} alt={"Image not available"} />
        <p>
          {content.length > 200 ? (
            <p>
              {content.slice(0, 200)}
              <Link to={`/blog/${_id}`} className="text-blue-600">
                Read more...
              </Link>
            </p>
          ) : (
            <p>{content}</p>
          )}
        </p>

        <hr />
      </div>

      <div className="flex justify-between">
        <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
        <div className="flex items-center gap-2">
          <RxEyeOpen />
          <p>{totalView}</p>
        </div>
      </div>
    </div>
  );
};

export default MainNews;
