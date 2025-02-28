import { AiTwotoneDelete } from "react-icons/ai";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useAppointments from "../../hooks/useAppointments";
import { Link } from "react-router-dom";

const ManageAppointment = () => {
  // const axiosSecure = useAxiosSecure();

  // Fetch appointments data using react-query
  // const { data: appointments = [] } = useQuery({
  //   queryKey: ["appointments"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/allAppointments`);
  //     return res.data;
  //   },
  // });
  const [allAppointments] = useAppointments();
  allAppointments;
  // Filter appointments by status
  const pendingAppointments = allAppointments.filter(
    (item) => item.status === "pending" || !item.status
  );
  const paidAppointments = allAppointments.filter(
    (item) => item.status === "paid"
  );
  const placedAppointments = allAppointments.filter(
    (item) => item.status === "placed"
  );
  const inProgressAppointments = allAppointments.filter(
    (item) => item.status === "in-progress"
  );
  const onGoingAppointments = allAppointments.filter(
    (item) => item.status === "on-going"
  );
  // const completeAppointments = allAppointments.filter(
  //   (item) => item.status === "complete"
  // );

  // Tab state
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="-mt-20">
      <Helmet>
        <title>Manage Appointment</title>
      </Helmet>
      <SectionTitle
        heading="Manage Appointment"
        subHeading="All Appointment"
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <Tabs
            defaultIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <div className="text-center">
              <TabList>
                <Tab>Pending</Tab>
                <Tab>Paid</Tab>
                <Tab>Placed</Tab>
                <Tab>In progress</Tab>
                <Tab>On going</Tab>
                {/* <Tab>Complete</Tab> */}
              </TabList>
            </div>
            <div className="my-5">
              {/* Pending appointment table */}
              <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total Pending appointment : {pendingAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Price (Taka)</th>
                      <th>Status</th>

                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.price}</td>
                        <td>{item.status || "Pending"}</td>
                        <td>
                          <button className="btn btn-ghost btn-outline btn-error text-2xl">
                            <AiTwotoneDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              {/* Paid appointment table */}
              <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total paid appointment : {paidAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Place</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.status || "Paid"}</td>
                        <td>
                          <Link to={`/dashboard/assignProvider/${item._id}`}>
                            <div className="btn btn-ghost btn-outline btn-success text-2xl">
                              <FaEdit />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              {/* Placed appointment table */}
              <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total placed appointment : {placedAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Provider Email</th>
                      <th>Change provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placedAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.providerEmail}</td>
                        <td>
                          <Link to={`/dashboard/assignProvider/${item._id}`}>
                            <div className="btn btn-ghost btn-outline btn-warning text-2xl">
                              <FaEdit />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              {/* in progress table */}
              <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total placed appointment : {inProgressAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Provider Email</th>
                      {/* <th>Change provider</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {inProgressAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.providerEmail}</td>
                        {/* <td>
                          <Link to={`/dashboard/assignProvider/${item._id}`}>
                            <div className="btn btn-ghost btn-outline btn-warning text-2xl">
                              <FaEdit />
                            </div>
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              {/* On going table */}
              <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total placed appointment : {onGoingAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Provider Email</th>
                      {/* <th>Change provider</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {onGoingAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.providerEmail}</td>
                        {/* <td>
                          <Link to={`/dashboard/assignProvider/${item._id}`}>
                            <div className="btn btn-ghost btn-outline btn-warning text-2xl">
                              <FaEdit />
                            </div>
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>

              {/* Complete appointment table */}
              {/* <TabPanel>
                <p className="lg:text-4xl md:text-3xl text-2xl md:font-bold font-semibold md:my-5 my-3">
                  Total complete appointment : {completeAppointments.length}
                </p>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>User Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Price (Taka)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completeAppointments.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.category}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.price}</td>

                        <td>{item.status || "Complete"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel> */}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointment;
