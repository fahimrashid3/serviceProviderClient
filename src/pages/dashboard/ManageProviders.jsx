import { Helmet } from "react-helmet";
import useProviders from "../../hooks/useProviders";
import "react-tabs/style/react-tabs.css";
import { FaEye } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { AiTwotoneDelete } from "react-icons/ai";

const ManageProviders = () => {
  const [providers, providersLoading] = useProviders();

  if (providersLoading) {
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400"></span>
      </div>
    );
  }

  return (
    <div className="-mt-20">
      <Helmet>
        <title>All User</title>
      </Helmet>
      <SectionTitle heading={"All User"} subHeading={"Manage User"} />

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
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
              <td>{provider.name}</td>
              <td>{provider.email}</td>
              <td>
                <button className="btn btn-ghost btn-outline btn-success text-2xl">
                  <FaEye />
                </button>
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
