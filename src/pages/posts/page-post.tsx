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
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex justify-center items-center px-20 max-md:px-0">
        {item.map((items, index) => {
          if (id === items.id) {
            return (
              <div
                key={index}
                className="flex max-md:flex-col max-md:justify-center items-center h-full w-full"
              >
                <div className="w-1/2 max-md:w-full h-full break-words max-md:px-5">
                  <motion.div
                    className="h-[550px] max-md:h-96 flex flex-col space-y-5 justify-center items-start max-md:items-start max-md:justify-center break-words overflow-hidden text-wrap"
                    animate={{ opacity: [0, 1], x: [-500, 0] }}
                  >
                    <h1 className="text-3xl font-medium max-sm:text-lg">
                      {items.title}
                    </h1>
                    <div className="container w-3/4 max-md:w-96 max-sm:text-xs">
                      <p>{items.description}</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="w-1/2 max-md:w-full max-md:px-5 flex items-center justify-center overflow-hidden h-96"
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.8 }}
                >
                  <Swiper
                    className="max-sm:h-48 w-full max-md:w-96 flex justify-center items-center overflow-hidden rounded text-zinc-50"
                    modules={[
                      Navigation,
                      Pagination,
                      Scrollbar,
                      A11y,
                      Autoplay,
                    ]}
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
    </div>
  )
}
