import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default PrivetRoute;
