import { motion } from 'framer-motion'
interface RenderImagensProps {
  imagens: [{ photos: string }]
}

export function RenderImagens({ imagens }: RenderImagensProps) {
  return (
    <>
      {imagens.map((img, index) => {
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
              alt="Fotos"
              className={`object-cover w-full h-${imagens.length > 1 ? '96' : 'full'} p-1 transition-all duration-300 overflow-hidden rounded${imagens.length <= 1 ? '-sm' : ''}`}
            />
          </motion.div>
        )
      })}
    </>
  )
}
