import { CiBookmark, CiShare2 } from "react-icons/ci";
import { RxEyeOpen } from "react-icons/rx";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";

const MainNews = ({ blog }) => {
  console.log(blog);

  const axiosPublic = useAxiosPublic();

  const {
    _id,
    authorId,
    time,
    date,
    title,
    category,
    content,
    rating,
    img,
    totalView,
  } = blog;
  //   const { _id, total_view, title, author, image_url, details } = blog;
  //   const { name, published_date, img } = author;
  //   const { number } = author;

  //   const [length, setLength] = useState(500);
  //   const [readMore, setReadMore] = useState(true);

  //   const handelClickReadMore = () => {
  //     setLength(details.length);

  //     setReadMore(!readMore);
  //     console.log(length);
  //   };

  return (
    <div className="mb-24">
      <div className="flex bg-gray-50 text-black justify-between rounded-t-lg">
        <div className="flex">
          <img className="rounded-full w-12 h-12 mr-3" src={img} alt="" />
          <div>
            <p className="font-semibold text-xl">{name}</p>
            <div className="flex gap-5">
              <p>{date}</p>
              <p>{time}</p>
            </div>
          </div>
        </div>
        <div className="flex text-xl items-center gap-2 mr-3">
          <CiBookmark />
          <CiShare2 />
        </div>
      </div>
      <div className="space-y-5 mt-5 mb-5">
        <p className="font-bold text-2xl">{title}</p>
        <img src={img} alt="" />
        <p>
          {content.length > 200 ? (
            <p>
              {content.slice(0, 200)}
              <Link to={`/news/${_id}`} className="text-blue-600">
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
    // <div>bolg</div>
  );
};

export default MainNews;
