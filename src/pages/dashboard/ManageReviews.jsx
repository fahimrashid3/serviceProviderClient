import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { useEffect } from "react";
import { Rating } from "@smastrom/react-rating";

const ManageReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosPublic.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="-mt-20">
      <Helmet>
        <title>Manage Contacts</title>
      </Helmet>
      <SectionTitle
        heading={"Manage Reviews"}
        subHeading={"all User Reviews here"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Star</th>
              <th>details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((review, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{review.name}</td>
                <td>
                  <Rating
                    className="mx-auto"
                    style={{ maxWidth: 120 }}
                    value={review.rating}
                    readOnly
                  />
                </td>
                <td>{review.details}</td>

                <th>
                  <button className="btn btn-ghost btn-outline btn-success">
                    Replay
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReviews;
