import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";
import { useState } from "react";

const ManageContact = () => {
  const axiosPublic = useAxiosPublic();
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axiosPublic.get("contacts").then((res) => {
      setContacts(res.data);
    });
  }, [axiosPublic]);
  console.log(contacts);
  return (
    <div className="-mt-20">
      <Helmet>
        <title>Manage Contacts</title>
      </Helmet>
      <SectionTitle
        heading={"Manage contacts"}
        subHeading={"all User message here"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#No</th>
              <th>Name</th>
              <th>Email</th>
              <th>message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {contacts.map((contact, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>

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

export default ManageContact;
