import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  return (
    <div className="pt-16">
      <Helmet>
        <title>About us</title>
      </Helmet>
      <SectionTitle
        heading="About Us"
        subHeading="Knew more about us"
      ></SectionTitle>
    </div>
  );
};

export default About;
