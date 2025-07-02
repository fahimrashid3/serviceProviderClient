import { CiBookmark, CiShare2 } from "react-icons/ci";
// import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
// import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MainNews = ({ blog }) => {
  const {
    _id,
    authorEmail,
    time,
    date,
    title,
    content,
    // rating,
    img,
    // totalView,
  } = blog;
  const axiosPublic = useAxiosPublic();
  const [author, setAuthor] = useState(null);

  // Fetch author details
  useEffect(() => {
    if (authorEmail) {
      axiosPublic
        .get(`/providersInBlog/${authorEmail}`)
        .then((res) => setAuthor(res.data))
        .catch((err) => console.error("Error fetching author:", err));
    }
  }, [authorEmail, axiosPublic]);

  const handleSaveButton = () => {
    Swal.fire("Feature not added!");
  };

  return (
    <div className="mb-24 border p-5 rounded-lg">
      <div className="flex bg-gray-50 text-black justify-between rounded-t-lg">
        <div className="flex">
          {author ? (
            <>
              <img
                className="rounded-full w-12 h-12 mr-3 object-cover object-center"
                src={author.userImg}
                alt={author.name}
              />
              <div>
                <p className="font-semibold text-xl">{author.name}</p>
                <div className="flex gap-5">
                  <p>{date}</p>
                  <p>{time}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-3 w-20"></div>
                  <div className="skeleton h-3 w-28"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSaveButton}
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
            <>
              {content.slice(0, 200)}
              <Link to={`/blog/${_id}`} className="text-blue-600">
                Read more...
              </Link>
            </>
          ) : (
            content
          )}
        </p>
        <hr />
      </div>

      {/* <div className="flex justify-between">
        <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
        <div className="flex items-center gap-2">
          <RxEyeOpen />
          <p>{totalView}</p>
        </div>
      </div> */}
    </div>
  );
};

export default MainNews;
