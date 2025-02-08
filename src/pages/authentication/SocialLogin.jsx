import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { PiGithubLogoFill } from "react-icons/pi";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();

      if (!result?.user) {
        console.error("Google sign-in failed: No user data found.");
        return;
      }

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("Google Access Token:", token);

      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        photoUrl: result.user.photoURL,
      };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center gap-5 font-bold">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline rounded-full"
      >
        <FaGoogle />
      </button>
      <button className="btn btn-outline rounded-full btn-disabled">
        <FaFacebookF />
      </button>
      <button className="btn btn-outline rounded-full btn-disabled">
        <PiGithubLogoFill />
      </button>
    </div>
  );
};

export default SocialLogin;
