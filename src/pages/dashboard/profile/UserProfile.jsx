import useUsers from "../../../hooks/useUser";
import Loading from "../../../components/Loading.jsx";

const UserProfile = () => {
  // const [users, loading, refetch] = useUsers();
  const [users, loading] = useUsers();

  if (loading) {
    return <Loading></Loading>;
  }
  console.log(users);

  return (
    <div className=" text-lg text-center lg:space-y-6 md:space-y-4 space-y-3 lg:max-w-[60%] md:max-w-[85%] max-w-[95%] mx-auto">
      <h1 className="font-semibold">Personal Information </h1>
      <div className="avatar flex justify-center">
        <div className="mask mask-squircle w-28 md:w-40 lg:w-56">
          <img src={users.photoUrl} />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p className="font-semibold">Name</p> <p>{users.name}</p>
        </div>
        <hr />
      </div>

      <div>
        <div className="flex justify-between">
          <p className="font-semibold">Email</p>
          {users.email ? <p>{users.email}</p> : <p>Email is not available</p>}
        </div>
        <hr />
      </div>
      <div>
        <div className="flex justify-between">
          <p className="font-semibold">Phone Number</p>
          {users.phone ? (
            <p>{users.phone}</p>
          ) : (
            <p>Phone number is not available</p>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default UserProfile;
