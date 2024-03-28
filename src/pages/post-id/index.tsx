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
    <div className=" max-w-full mx-auto flex flex-col px-10 items-center py-6">
      <div className="container flex flex-col gap-3 h-72 justify-center items-center max-w-4xl">
        <h1 className="text-3xl font-medium">{currentIdItem.title}</h1>
        <div className="text-sm">
          <p>{currentIdItem.description}</p>
        </div>
      </div>
      <motion.div
        className={`grid  ${currentIdItem.imagens.length <= 1 ? 'grid-cols-1' : 'grid-cols-3'} ${currentIdItem.imagens.length <= 1 ? 'w-4/6' : 'max-w-full'} h-full gap-3 mx-auto transition-all duration-700 items-center`}
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
