import { Swiper, SwiperSlide, } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
// import { useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export function Carrossel(){

  // const swiper = useSwiper()

  return(
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='flex justify-center items-center h-80 bg-zinc-300'
      >
        {Array.from(({length: 5}), (_,index)=>(
              <SwiperSlide key={index} className='flex items-center justify-center'>{index}</SwiperSlide>
          )
        )}
      </Swiper>
    </>
  )
}