import { Link, useLocation } from "react-router-dom";
// import SectionTitle from "../../components/SectionTitle";
import SectionBanner from "../../components/SectionBanner";
import { Rating } from "@smastrom/react-rating";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";

const FullProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabName = ["Overview", "Location", "Review", "Business Hours"];
  const location = useLocation();
  const { provider, category } = location.state || {};
  // console.log(provider.totalReview);
  if (!provider || !category)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary "></span>
      </div>
    );
  console.log("Provider Data:", provider);
  return (
    <div className="-mt-20 mb-20 dark:bg-dark-700 text-dark-900 dark:text-white bg-gray-200">
      <SectionBanner
        img={category.serviceImg}
        title={category.serviceProviderType}
      ></SectionBanner>
      {/* <SectionTitle
        heading={provider.name}
        subHeading={provider.category}
      ></SectionTitle> */}
      <div className="md:max-w-[90%] bg-white dark:bg-dark-900 md:mx-auto mt-5 md:mt-16">
        <div className="hero border dark:border-dark-500">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={provider.userImg}
              className="max-h-80 min-h-60 rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold text-center md:text-left">
                {provider.name}
              </h1>
              <p className="py-6 -mb-3 text-center md:text-left">
                {provider.qualification}
              </p>
              <div className="flex gap-2 items-center justify-center md:justify-start">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={provider.rating}
                  readOnly
                />
                <p>({provider.totalReview})</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-2">
                {provider.services.map((service, index) => (
                  <p
                    key={index}
                    className="
                  border p-1 border-dark-900 dark:border-gray-100 text-dark-900 dark:text-white rounded-md cursor-default hover:bg-primary-500 hover:text-white transition-all duration-300"
                  >
                    {service}
                  </p>
                ))}
              </div>
              <Link
                to="/appointment"
                state={{ bookingBtnCategory: category }}
                className="
                btn bg-transparent border-1 border-b-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 mt-4 text-md"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-10">
          <Tabs
            defaultIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <div className="text-center">
              <TabList>
                {tabName.map((name, index) => (
                  <Tab key={index}>{name}</Tab>
                ))}
              </TabList>
            </div>
            <div className="mt-10">
              {/* over view section */}
              <TabPanel>
                <div className="max-w-[95%] md:max-w-[90%] mx-auto">
                  <p className="font-bold text-xl mb-2">About Me</p>
                  <p>{provider.about}</p>
                  <div className="md:flex mt-5">
                    <div className="flex-1 md:space-y-10 space-y-5">
                      <div>
                        {/* education */}
                        <p className="font-bold text-xl mb-2">Education</p>

                        {provider.education.map((education, index) => (
                          <div key={index} className="py-2">
                            <p className="font-bold text-sm">
                              {education.institution}
                            </p>
                            <p>{education.degree}</p>
                            <p>{education.time}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        {/* workingExperience */}
                        <p className="font-bold text-xl mb-2">
                          working Experience
                        </p>

                        {provider.workingExperience.map(
                          (workingExperience, index) => (
                            <div key={index} className="py-2">
                              <p>{workingExperience}</p>
                            </div>
                          )
                        )}
                      </div>
                      <div>
                        {/* services */}
                        <p className="font-bold text-xl mb-2">services</p>

                        {provider.services.map((services, index) => (
                          <div key={index} className="py-2">
                            <p>{services}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      {" "}
                      <div>
                        {/* rewards */}
                        <p className="font-bold text-xl mb-2">rewards</p>

                        {provider.rewards.map((rewards, index) => (
                          <div key={index} className="py-2">
                            <p className="font-bold text-sm">{rewards.name}</p>
                            <p>{rewards.date}</p>
                            <p>{rewards.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              {/* location section */}
              <TabPanel>
                <div>
                  <h2 className="text-lg font-bold text-center">Location</h2>
                  <p className="text-sm text-dark-600 text-center">
                    {provider.location}
                  </p>
                  <div className="max-w-[95%] md:max-w-[90%] mx-auto mt-5 md:mt-10">
                    {/* Embed Google Maps iframe  */}
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        provider.location
                      )}&output=embed`}
                      width="100%"
                      height="600"
                      allowFullScreen=""
                      loading="lazy"
                      title="Provider Location"
                    ></iframe>
                  </div>
                </div>
              </TabPanel>
              {/* TODO: save provider review and display here */}
              <TabPanel>
                <div>
                  <p>Reviews</p>
                </div>
              </TabPanel>
              {/* business hours */}
              <TabPanel>
                <div className="w-[95%] md:max-w-[50%] mx-auto">
                  <h2 className="text-lg font-bold text-center">
                    Business Hours
                  </h2>

                  {Object.entries(provider.timeTable).map(
                    ([day, timing], index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b"
                      >
                        <p className="font-medium">{day}</p>
                        <p>{timing}</p>
                      </div>
                    )
                  )}
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
