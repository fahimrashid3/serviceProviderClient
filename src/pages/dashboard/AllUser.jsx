import { Helmet } from "react-helmet";
import useProviders from "../../hooks/useProviders";
import useUser from "../../hooks/useUser";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaEdit, FaEye } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { AiTwotoneDelete } from "react-icons/ai";
const AllUser = () => {
  const [users, loading] = useUser();
  const [providers, providersLoading] = useProviders();
  if (loading || providersLoading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );
  return (
    <div className="-mt-20">
      <Helmet>
        <title>All User</title>
      </Helmet>
      <SectionTitle
        heading={"AllUser"}
        subHeading={"Manage User"}
      ></SectionTitle>
      <Tabs>
        <div className="text-center">
          <TabList>
            <Tab>All Users</Tab>
            <Tab>All Providers</Tab>
          </TabList>
        </div>

        <TabPanel>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profile</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>

                  <td>{item.email}</td>
                  <td>
                    <button className="btn  btn-ghost btn-outline btn-success text-2xl">
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    <button className="btn  btn-ghost btn-outline btn-warning text-2xl">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profile</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.userImg}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>

                  <td>{item.email}</td>
                  <td>
                    {/* TODO:view full profile */}
                    <button className="btn  btn-ghost btn-outline btn-success text-2xl">
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    {/* TODO:delete user */}
                    <button className="btn  btn-ghost btn-outline btn-error text-2xl">
                      <AiTwotoneDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllUser;
