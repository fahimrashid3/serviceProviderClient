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
        <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
          <div className="flex-1">
            <img src={featuredImg} alt="" />
          </div>
          <div className="md:ml-10 flex-1 space-y-5">
            <p>Jan 5,2025</p>
            <p className="uppercase">Where can i get some?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              provident culpa, mollitia alias sapiente error aspernatur libero
              voluptate aperiam perferendis ipsum aut repellendus? Corrupti
              fugit, ut alias quo accusamus explicabo accusantium aliquam amet
              animi saepe quasi molestiae excepturi, sequi non.
            </p>
            <button className="btn btn-outline btn-primary border-0 border-b-4">
              Pre Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
