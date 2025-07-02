// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img1 from "../../assets/home/01.jpg";
import img2 from "../../assets/home/02.jpg";
import img3 from "../../assets/home/03.jpg";
import img4 from "../../assets/home/04.jpg";

const Carousel = () => {
  return (
    <div className="mb-12 md:mb-20">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  "
      >
        <SwiperSlide>
          <img src={img1} className="mx-auto rounded-xl w-full md:h-screen" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img2} className="mx-auto rounded-xl w-full md:h-screen" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img3} className="mx-auto rounded-xl w-full md:h-screen" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img4} className="mx-auto rounded-xl w-full md:h-screen" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
