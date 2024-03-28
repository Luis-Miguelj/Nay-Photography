import { motion } from 'framer-motion'
interface RenderImagensProps {
  imagens: [{ photos: string }]
}

export function RenderImagens({ imagens }: RenderImagensProps) {
  return (
    <>
      {imagens.map((img, index) => {
        console.log(index)
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`group ${index < 1 ? 'w-full' : 'w-96'} h-96 rounded overflow-hidden`}
            style={{
              backgroundImage: `url('${img.photos}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ y: 500, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col justify-end items-center overflow-hidden transition-all duration-500 bg-gradient-to-t from-zinc-900 to-transparent"
            >
              <button
                className={`text-white border p-1 rounded w-24 hover:shadow-xl transition-all duration-200 hover:bg-white hover:text-zinc-950 `}
              >
                Abrir
              </button>
              <div className="container flex justify-center items-end h-1/2 py-10">
                <h1 className="text-white font-medium text-xs">
                  Nay Photography
                </h1>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </>
  )
}
