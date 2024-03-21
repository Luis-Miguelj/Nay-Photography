import { useParams } from 'react-router-dom'
import { Database } from '../../firebase/database/database'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'
import { motion } from 'framer-motion'

import './css/post.css'

export function PagePost() {
  const { item } = Database()

  const { id } = useParams()

  return (
    <div className="h-screen flex max-md:flex-col justify-center items-center px-20 max-md:px-0">
      {item.map((items, index) => {
        if (id === items.id) {
          return (
            <div
              key={index}
              className="flex max-md:flex-col items-center h-full w-full"
            >
              <div className="w-1/2 max-md:w-full h-screen">
                <motion.div
                  className="h-96 flex flex-col space-y-5 justify-start items-start max-md:items-center max-md:justify-center max-md:h-96 bg-zinc-50"
                  animate={{ opacity: [0, 1], x: [-500, 0] }}
                >
                  <h1 className="text-3xl font-medium max-sm:text-lg">
                    {items.title}
                  </h1>
                  <div className="container w-3/4 max-sm:text-xs">
                    <p>{items.description}</p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="w-1/2 max-md:w-full bg-zinc-50 max-md:px-5 flex items-center justify-center overflow-hidden h-full rounded"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.8 }}
              >
                <Swiper
                  className="h-96 max-sm:h-48 w-full flex justify-center items-center overflow-hidden rounded text-zinc-50"
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  slidesPerView={1}
                  autoplay={{ delay: 3000 }}
                  navigation
                  pagination={{ clickable: true }}
                  // scrollbar={{ draggable: true }}
                >
                  {items.imagens.map((img, index) => {
                    // console.log(img.photos)
                    return (
                      <SwiperSlide
                        key={index}
                        className="flex justify-center items-center"
                      >
                        <img src={img.photos} alt="Ft" />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </motion.div>
            </div>
          )
        } else return ''
      })}
    </div>
  )
}
