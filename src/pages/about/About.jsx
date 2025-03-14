import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="pt-16">
      <Helmet>
        <title>About us</title>
      </Helmet>

      <div className="min-h-screen grid md:grid-cols-2 justify-around items-center md:max-w-[90%] lg:max-w-[85%] mx-auto gap-5">
        <div>
          <img
            src="https://res.cloudinary.com/dipwayvsu/image/upload/v1740128751/ylwjmpespysqztizbjmn.jpg"
            alt=""
          />
        </div>
        <div className="space-y-10">
          <p className="text-3xl font-bold text-primary-500">About Us</p>
          <p className="text-justify">
            We’re not just another service provider—we’re your partner in making
            things easier. Whether you need a helping hand or a smart solution,
            we’re here to support you every step of the way. Our team is built
            on a foundation of trust, innovation, and a genuine desire to
            improve the way people get things done.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
