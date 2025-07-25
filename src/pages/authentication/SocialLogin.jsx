import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const SocialLogin = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoUrl: result.user?.photoURL,
      };

      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        setShouldNavigate(true);
      });
    });
  };
  useEffect(() => {
    if (shouldNavigate) {
      navigate(from, { replace: true });
    }
  }, [shouldNavigate, navigate, from]);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-primary-200 dark:border-primary-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-primary-50 dark:hover:bg-primary-800 transition-all duration-200 font-semibold text-base"
    >
      <svg
        aria-label="Google logo"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      <span>Continue with Google</span>
    </button>
  );
};

export default SocialLogin;
