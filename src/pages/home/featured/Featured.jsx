import SectionTitle from "../../../components/SectionTitle";
import featuredImg from "../../../assets/home/featured.png";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured_item text-white mb-12 md:mb-20">
      <div className="bg-dark-800 bg-opacity-70 hover:bg-opacity-80 transition-all duration-500 rounded-xl">
        <SectionTitle
          heading="Featured Item"
          subHeading="Check it out"
        ></SectionTitle>
        <div className="md:flex justify-center items-center pb-20 pt-12 md:px-36 px-10 mx-auto">
          <div className="flex-1">
            <img src={featuredImg} alt="" />
          </div>
          <div className="md:ml-10 flex-1 space-y-5">
            <p>Jan 5,2025</p>
            <p className="uppercase">Where can i get some?</p>
            <p>
              FEATURED ITEM Get the Right Help — Exactly When You Need It From
              doctors to teachers to lawyers, we connect you with experts you
              can rely on. You are not feeling well, need academic advice, or
              have legal issues — we make life easier. <br />
              • Consult licensed doctors for healthcare tips and treatment
              <br />
              • Receive competent teachers to guide you or your child <br />
              • Get expert, easy-to-understand advice from qualified lawyers
              <br />
              Each of our experts is handpicked, skilled, and on call to help
              you — anywhere, anytime. <br />
              Schedule your session now — expert guidance in the palm of your
              hand!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
