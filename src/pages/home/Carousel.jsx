// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img1 from "../../assets/home/01.png";
import img2 from "../../assets/home/02.png";
import img3 from "../../assets/home/03.png";
import img4 from "../../assets/home/04.png";
import img5 from "../../assets/home/05.png";
import img6 from "../../assets/home/06.png";

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
        className="mySwiper h-[720px]  "
      >
        <SwiperSlide>
          <img src={img1} className="mx-auto rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img2} className="mx-auto rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img3} className="mx-auto rounded-xl" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={img4} className="mx-auto rounded-xl" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} className="mx-auto rounded-xl" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} className="mx-auto rounded-xl" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
