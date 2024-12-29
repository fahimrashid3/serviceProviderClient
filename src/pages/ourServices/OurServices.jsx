import { Helmet } from "react-helmet";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionBanner from "../../components/SectionBanner";
import useProviders from "../../hooks/useProviders";

import { useState } from "react";
import Cart from "../../components/Cart";
import img from "../../assets/services/doctorSectionBanner.png";
import SectionTitle from "../../components/SectionTitle";
import useCategories from "../../hooks/useCategories";

const OurServices = () => {
  const [providers, providersLoading] = useProviders();
  const [categories, categoriesLoading] = useCategories();
  const [tabIndex, setTabIndex] = useState(0);

  if (providersLoading || categoriesLoading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );

  return (
    <div className="pt-5">
      <Helmet>
        <title>Our services</title>
      </Helmet>

      <div className="-mt-20 min-h-screen">
        <SectionBanner
          title="All Provider "
          img={img}
          alt="Section banner"
        ></SectionBanner>
        <div className="max-w-[95%] md:max-w-[90%] mx-auto">
          <SectionTitle
            heading="All Providers"
            subHeading="Browse what you need"
          ></SectionTitle>
          {/* <p className="text-2xl font-semibold text-center my-10 dark:text-white text-dark-900">
          Browse through the Provider categories
        </p> */}
          <div>
            <Tabs
              defaultIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <div className="text-center">
                <TabList>
                  {categories.map((category, index) => (
                    <Tab key={index}>{category.serviceProviderType}</Tab>
                  ))}
                </TabList>
              </div>
              <div className="mt-10">
                {categories.map((category) => (
                  <TabPanel key={category._id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                      {providers
                        .filter(
                          (provider) =>
                            provider.category === category.serviceProviderType
                        )
                        .map((item) => (
                          <Cart key={item._id} provider={item}></Cart>
                        ))}
                    </div>
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
