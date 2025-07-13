import { Helmet } from "react-helmet";
import SectionBanner from "../../components/SectionBanner";
import Information from "./Information";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen pb-20 flex items-center justify-center bg-gradient-to-br from-primary-200 via-white to-primary-400">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="w-full max-w-7xl mx-auto px-2 md:px-0">
        <SectionBanner
          img={
            "https://res.cloudinary.com/dipwayvsu/image/upload/v1752420521/shv2e5xmauzbmceo3eig.jpg"
          }
          title="Contact Us"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Information Card */}
          <div className="animate-slide-in-left bg-white/90 border border-primary-100 rounded-3xl shadow-2xl flex flex-col justify-center p-10">
            <Information />
          </div>
          {/* Contact Form Card */}
          <div className="animate-slide-in-right bg-white/90 border border-primary-100 rounded-3xl shadow-2xl p-10">
            <div className="mb-8 text-left w-full">
              <h3 className="text-3xl lg:text-4xl font-bold text-primary-700 mb-2 tracking-wide">
                Contact Form
              </h3>
              <div className="w-16 h-1 bg-primary-400 rounded mb-3" />
              <span className="text-primary-500 text-base lg:text-xl font-medium italic block">
                Sent Us a Message
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
