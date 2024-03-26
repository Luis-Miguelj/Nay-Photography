import { useParams } from 'react-router-dom'
import { Database } from '../../firebase/database/database'
import { motion } from 'framer-motion'
import { Divide } from 'lucide-react'

export function PostId() {
  const { item } = Database()
  const { id } = useParams()
  // const [render, setRender] = useState(false)
  // const [animated, setAnimated] = useState<object>({ width: 20 })

  return (
    <>
      {item.map((items, index) => {
        if (id === items.id && items.imagens.length > 1) {
          return (
            <div
              key={index}
              className="h-screen flex gap-5 px-10 items-center "
            >
              <div className="container flex flex-col gap-3 w-1/2 px-5 h-96">
                <h1 className="text-3xl font-medium">{items.title}</h1>
                <div className="text-sm">
                  <p>{items.description}</p>
                </div>
              </div>
              <motion.div
                className="grid grid-cols-3 overflow-scroll w-1/2 duration-700 h-96 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {items.imagens.map((img, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="w-full h-full"
                    >
                      <img
                        src={img.photos}
                        alt=""
                        className="object-cover w-full h-96 p-1 transition-all duration-300 overflow-hidden rounded"
                      />
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          )
        } else if (id === items.id && items.imagens.length <= 1) {
          console.log(items.imagens)
          console.log(index)
          return (
            <div
              key={index}
              className="h-screen flex gap-5 px-10 items-center "
            >
              <div className="container flex flex-col gap-3 w-1/2 px-5 h-96">
                <h1 className="text-3xl font-medium">{items.title}</h1>
                <div className="text-sm">
                  <p>{items.description}</p>
                </div>
              </div>
              <motion.div
                className="flex justify-center items-center rounded overflow-scroll w-1/2 duration-700 h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                {items.imagens.map((img, index) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="w-full h-full"
                    >
                      <img
                        src={img.photos}
                        alt=""
                        className="object-cover w-full h-full p-1 transition-all duration-300 overflow-hidden rounded-sm"
                      />
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          )
        } else {
          return ''
        }
      })}
    </>
  )
}
