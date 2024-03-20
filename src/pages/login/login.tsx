'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { auth } from '../../firebase/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

// import { useRouter } from 'next/navigation'
interface UserLoginProps {
  email: string
  senha: string
}

const createLoginSchema = z.object({
  email: z.string().email({ message: 'Email não reconhecido.' }),
  senha: z.string().min(6, {
    message: 'Esse campo deve conter no minimo 6 caracters',
  }),
})

type CreateLoginFormData = z.infer<typeof createLoginSchema>

export default function Login() {
  // const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginSchema),
  })
  // console.log(auth)

  function handleLogin(data: UserLoginProps) {
    signInWithEmailAndPassword(auth, data.email, data.senha)
      .then(() => {
        console.log('Logado com sucesso!')
        // push('/')
      })
      .catch((err) => {
        console.log('Usuario n encontrado')
        // window.location.reload()
        console.log('deu erro: ' + err)
      })
  }
  return (
    <div className="h-screen py-16" id="fundo-login">
      <div className="max-w-md mx-auto h-[550px] shadow-2xl rounded-md border-[1px] bg-white ">
        <div className="container flex flex-col justify-center items-center gap-5 py-10">
          <img src="./logo-nay.jpg" className="w-44 h-32" alt="image" />
          <h1 className=" text-xs font-medium">Bem Vindo</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col max-w-80 mx-auto space-y-5"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Email</span>
              <input
                type="text"
                {...register('email')}
                placeholder="Digite seu email"
                className="shadow px-1.5 py-1 rounded outline-purple-400 border-2"
              />
              {errors.email && (
                <span className="text-xs font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Senha</span>
              <input
                type="password"
                {...register('senha')}
                placeholder="Digite sua senha"
                className="shadow px-1.5 py-1 rounded outline-purple-400 border-2"
              />
              {errors.senha && (
                <span className="text-xs font-medium">
                  {errors.senha.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="p-2 bg-zinc-950 rounded text-zinc-50 hover:bg-purple-600 hover:bg-opacity-40 hover:text-zinc-950 hover:shadow transition-all duration-300"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
