import { Helmet } from "react-helmet";
import useProviders from "../../hooks/useProviders";
import "react-tabs/style/react-tabs.css";
import { FaEye } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const ManageProviders = () => {
  const [providers, providersLoading] = useProviders();

  // const navigate = useNavigate();

  if (providersLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  // const handelViewProfile = (_id) => {
  //   navigate(`/fullProfile/${_id}`);
  // };

  return (
    <div className="-mt-20">
      <Helmet>
        <title>Manage Providers</title>
      </Helmet>
      <SectionTitle heading={"All Providers"} subHeading={"Manage Providers"} />

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>category</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr key={provider._id}>
              <th>{index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={provider.userImg} alt="Provider Avatar" />
                  </div>
                </div>
              </td>
              <td>{provider.category}</td>
              <td>{provider.name}</td>
              <td>{provider.email}</td>
              <td>
                <Link
                  to={`/shortProfile/${provider._id}`}
                  className="btn btn-ghost btn-outline btn-success text-2xl"
                >
                  <FaEye />
                </Link>
              </td>
              <td>
                <button className="btn btn-ghost btn-outline btn-error text-2xl">
                  <AiTwotoneDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProviders;
