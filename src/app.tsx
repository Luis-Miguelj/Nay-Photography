// import { useEffect, useLayoutEffect } from "react"
import { MoveRight } from 'lucide-react'
import { Database } from './firebase/database/database'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function App() {
  const { item } = Database()

  return (
    <div>
      <motion.div
        className="flex flex-col gap-2 w-full bg-zinc-800 justify-center h-screen home-start duration-500"
        transition={{ duration: 1 }}
        animate={{ alignItems: 'center' }}
        id="image-home"
      >
        <motion.h1
          className="text-6xl font-semibold text-zinc-100 max-sm:text-2xl"
          transition={{ duration: 0.8 }}
          animate={{ x: [-700, 0], opacity: [0, 1] }}
        >
          Seja bem vindo(a)
        </motion.h1>
        <motion.p
          className="text-base font-medium text-zinc-100 max-sm:text-sm"
          transition={{ duration: 0.8 }}
          animate={{ x: [-700, 0], opacity: [0, 1] }}
        >
          Nay Photography
        </motion.p>
      </motion.div>
      <div className="h-96 max-w-5xl mx-auto my-5">
        {item.map((items, index) => {
          // console.log(items.imagens[0].photos)
          return (
            <motion.div
              key={index}
              className="w-full mx-auto flex flex-col my-10 justify-center items-center"
              id={`animated-${index}`}
            >
              <div className="w-3/4 flex flex-col space-y-5 my-5">
                <div className="flex flex-col space-y-5">
                  <div className="border-b py-1 border-zinc-900">
                    <h1 className="text-3xl font-medium">{items.title}</h1>
                  </div>
                  <p className="text-sm font-medium">{items.description}</p>
                </div>
                <motion.div
                  className="w-full h-96 max-sm:h-72 rounded shadow"
                  style={{
                    backgroundImage: `url('${items.imagens[0].photos}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                  animate={{
                    opacity: [0, 1],
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-full h-full bg-gradient-to-l from-zinc-900 flex items-end justify-end px-10 py-5">
                    <Link to={`/${items.id}`} className="text-zinc-50">
                      <MoveRight
                        size={40}
                        className="hover:text-purple-400 transition-all duration-300 shadow-sm"
                      />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
