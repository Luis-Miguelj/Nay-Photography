import { useParams } from 'react-router-dom'
import { Database } from '../../firebase/database/database'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { motion } from 'framer-motion'

import './css/post.css'

export function PagePost() {
  const { item } = Database()

  const { id } = useParams()

  return (
    <motion.div className="h-screen flex flex-col px-20">
      {item.map((items, index) => {
        if (id === items.id) {
          return (
            <div key={index} className="flex items-center h-full w-full">
              <div className="w-1/2">
                <motion.div
                  className="h-96 flex flex-col space-y-5 justify-start items-start"
                  animate={{ opacity: [0, 1], x: [-500, 0] }}
                >
                  <h1 className="text-3xl font-medium">{items.title}</h1>
                  <div className="container w-3/4">
                    <p>{items.description}</p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="w-1/2 flex items-center overflow-hidden h-full rounded"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.8 }}
              >
                <Swiper
                  className="h-96 overflow-hidden rounded text-zinc-50"
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  // scrollbar={{ draggable: true }}
                >
                  {items.imagens.map((img, index) => {
                    // console.log(img.photos)
                    return (
                      <SwiperSlide key={index} className="">
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
    </motion.div>
  )
}
