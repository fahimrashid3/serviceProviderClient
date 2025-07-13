// import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import loginBg from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // getting the path name when user navigate by privet route
  const form = location.state?.form?.pathname || "/";

  // console.log(location.state);
  // console.log(location.state?.form?.pathname);
  // console.log(form);
  // show and hide password
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    signIn(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `welcome back ${user.displayName}`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(form, { replace: true });
        scrollTo(0, 0);
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        // ..
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <Helmet>
        <title>Service | Login</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row-reverse lg:gap-48 md:gap-16">
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="card flex-1 shrink-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <p className="font-bold text-center lg:text-4xl md:text-3xl text-2xl md:mb-10 mb-5 text-dark-900 dark:text-white">
              <Typewriter
                words={["Welcome Back", " Sign In now"]}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              {/*TODO: add show password using useState change */}
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered bg-white text-dark-900"
              />
              {errors.email && (
                <span className="text-red-500">Email required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              {/* <input
                type="password"
                placeholder="Password"
                className="input input-bordered bg-white text-dark-900"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              /> */}
              <div className="flex items-center">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  className="input input-bordered bg-white text-dark-900 w-full"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 16,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute right-12 text-xl cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500">Password required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be up to 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">
                  Password must be less then 16 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password must have one uppercase one lowercase one number and
                  one special characters
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <p>{errorMessage}</p>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="px-8 py-3 border border-b-4 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-600 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Login Now
              </button>
            </div>
          </form>
          <div className="space-y-5">
            <p className="text-[#D1A054] text-lg text-center">
              New here ?
              <span className="font-semibold">
                <Link to="/registration">Create an account</Link>
              </span>
            </p>
            <p className="text-center text-lg">Or sign in with</p>
            <div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
