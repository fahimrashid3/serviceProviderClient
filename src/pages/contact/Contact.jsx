import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle";
import SectionBanner from "../../components/SectionBanner";
import Information from "./Information";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="pt-5">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <SectionBanner
        img={"https://i.ibb.co.com/gVxQNWv/contact-Us.jpg"}
        title="Contact Us"
      ></SectionBanner>
      <SectionTitle
        subHeading={"Visit Us"}
        heading={"Our Location"}
      ></SectionTitle>
      <Information></Information>
      <SectionTitle
        heading="Contact Form"
        subHeading={"Sent Us a Message"}
      ></SectionTitle>
      <ContactForm></ContactForm>
    </div>
  );
};

export default Contact;
