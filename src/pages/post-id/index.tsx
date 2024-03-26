import { useParams } from 'react-router-dom'
import { Database } from '../../firebase/database/database'
import { motion } from 'framer-motion'
import { RenderImagens } from './render-imagens/render-imagens'

export function PostId() {
  const { item } = Database()
  const { id } = useParams()

  const currentIdItem = item.find((items) => items.id === id)

  if (!currentIdItem) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>Error - Item buscado não existe</h1>
      </div>
    )
  }

  return (
    <div className="h-screen flex gap-5 px-10 items-center ">
      <div className="container flex flex-col gap-3 w-1/2 px-5 h-96">
        <h1 className="text-3xl font-medium">{currentIdItem.title}</h1>
        <div className="text-sm">
          <p>{currentIdItem.description}</p>
        </div>
      </div>
      <motion.div
        className={`grid  ${currentIdItem.imagens.length <= 1 ? 'grid-cols-1' : 'grid-cols-3'} overflow-scroll w-1/2 duration-700 h-96 items-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <RenderImagens imagens={currentIdItem.imagens} />
      </motion.div>
    </div>
  )
}
