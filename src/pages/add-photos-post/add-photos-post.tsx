'use client'
import { db } from '../../firebase/firebaseConnection'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { v4 as uuidV4 } from 'uuid'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'

// tipagem do formulario.
const createPostSchema = z.object({
  title: z.string().nonempty({ message: 'Esse campo é obrigatorio.' }),
  description: z
    .string()
    .min(1, { message: 'Esse campo deve conter ao menos um caractere.' }),
  images: z.array(
    z.object({
      photos: z.string(),
    }),
  ),
})

type CreatePostFormData = z.infer<typeof createPostSchema>

export function AddPhotosPost() {
  const [heightAddImages, setHeightAddImages] = useState('h-0')
  const [count, setCount] = useState<number>(0)
  // const [index, setIndex] = useState<boolean>(false)

  // estanciando o useForm do react-hook-form.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  // metadodos criado no intuito de dizer qual o tipo de imagem vai ser enviada.
  // const metadados = {
  //   contentType: 'image/jpg',
  // }
  function handleHeight(index: number) {
    if (index === 0) {
      setHeightAddImages('h-16')
    } else if (index > 0) {
      setHeightAddImages('h-20')
    } else {
      setHeightAddImages('h-0')
    }
  }

  function addNewImage(index: number) {
    append({
      photos: '',
    })
    handleHeight(index)
  }

  function removeNewImage(index: number) {
    remove(index)
  }

  // função para adicionar as imagens e o titulo e a discrição da postagem
  async function addPhotsPost(data: CreatePostFormData) {
    // const files = Array.from(data.images)

    // addDoc e a "função" que adiciona os titulos e descrição da postagem
    addDoc(collection(db, 'blog-photos'), {
      id: uuidV4(),
      title: data.title,
      description: data.description,
      imagens: data.images,
      created: new Date().toString(),
    })
      .then(() => {
        console.log('Adicionado com sucesso!')
        reset()
      })
      .catch((err) => {
        console.log(new Error(err))
      })

    // // Como o nome ja diz, "uploadImages" adiciona as imagens no storage do banco
    // const uploadImages = files.map(async (file) => {
    //   // aqui eu crio o caminho para adicionar as imagens
    //   const imagePath = `${data.title}/${file.name}`
    //   // informo qual storage esse caminho pertence
    //   const addImage = ref(storage, imagePath)
    //   // valido o file, garantindo que ele seja um desses tipos
    //   if (
    //     file instanceof Blob ||
    //     file instanceof Uint8Array ||
    //     file instanceof ArrayBuffer
    //   ) {
    //     return await uploadBytes(addImage, file, metadados)
    //       .then((snapshot) => {
    //         console.log('sucesso ', snapshot)
    //         // console.log(img)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   } else {
    //     throw new Error('Tipo de arquivo inválido.')
    //   }
    // })
    // try {
    //   await Promise.all(uploadImages)
    //   console.log('Todas as imagens foram enviadas com sucesso.')
    // } catch (error) {
    //   console.error('Erro ao enviar imagens:', error)
    // }

    // console.log(data.images)
    console.log(JSON.stringify(data))
  }

  return (
    <div
      className="h-screen flex justify-center items-center w-full"
      id="fundo-add"
    >
      <form
        onSubmit={handleSubmit(addPhotsPost)}
        className="w-full mx-auto h-screen flex flex-col justify-center items-center space-y-3 bg-zinc-300"
      >
        <div className="container max-w-96 flex flex-col gap-3">
          <div className="container flex flex-col gap-1">
            <span className="text-xs font-medium">Titulo:</span>
            <input
              type="text"
              {...register('title')}
              className="w-full p-1 rounded outline-purple-400 shadow border"
            />
            {errors.title && (
              <span className="text-xs font-medium text-red-600">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="container w-full flex flex-col gap-1">
            <span className="text-xs font-medium">Descrição:</span>
            <textarea
              {...register('description')}
              rows={10}
              cols={30}
              className="w-full p-1 rounded outline-purple-400 shadow border transition-all duration-300"
            />
            {errors.description && (
              <span className="text-xs font-medium text-red-600">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="container max-w-96 flex flex-col justify-start items-center ">
          <label className="flex items-center justify-between font-medium text-sm w-full py-4">
            <p className="underline">Imagens</p>
            <button
              type="button"
              onClick={() => {
                setCount(count + 1)
                addNewImage(count)
              }}
              className="px-2 py-1 bg-zinc-950 text-zinc-50 rounded hover:bg-zinc-800 transition-all duration-200"
            >
              Adicionar
            </button>
          </label>
          <div
            className={`container max-w-96 space-y-2 ${heightAddImages} gap-2 overflow-hidden overflow-y-auto transition-all duration-300`}
          >
            {fields.map((feild, index) => {
              console.log(feild.photos)
              return (
                <div key={index} className="w-full flex flex-col gap-1">
                  <p className="text-xs font-medium">
                    Imagem {index === 0 ? 'inicial' : index}
                  </p>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      {...register(`images.${index}.photos`)}
                      placeholder="Insira as Fotos"
                      className="w-full p-1 rounded outline-purple-400 shadow border"
                    />
                    <button
                      type="button"
                      className="w-10 bg-red-600 rounded text-zinc-50"
                      onClick={() => removeNewImage(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-1/4">
          <button
            type="submit"
            className="p-2 font-medium bg-zinc-900 w-full text-zinc-50 rounded hover:bg-zinc-800 hover:shadow-xl transition-all duration-200"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
