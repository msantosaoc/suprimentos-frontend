'use client';

import ButtonLogin from '@/components/Button/ButtonLogin';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '@/lib/schemas/SignInSchema';
import { zodResolver } from '@hookform/resolvers/zod'


export default function Home() {

  const router = useRouter()
  // const { data:session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema)
  })

  async function onSubmit(data: SignInSchema) {
    await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl: '/lobby'
    })
  }

  

  

  return (
    <div className=' w-screen h-screen flex bg-background'>
      <div className='h-3/4 w-4/6 max-w-screen-xl  max-sm:flex-col sm:flex bg-transparent m-auto rounded-xl '>
        <div className='h-full flex-1 bg-light-blue rounded-s-xl flex flex-col max-sm:hidden'>

          <div className='h-3/5 w-4/5  m-auto flex flex-col'>
            <Image alt='logo' src='/iconLogin.svg' width={350} height={600} className='m-auto' />
            <h2 className='mx-auto text-center mt-4 text-white text-xl'>Novas opções de acompanhamento de solicitações<br/> de materiais e compras</h2>
            <label className='text-xs mx-auto mt-2 text-white'>Trazendo mais rapidez e controle sobre os processos</label>
          </div>
          
        </div>
        <div className='h-full flex-1 bg-white rounded-e-xl flex flex-col text-black '>
          <div className='h-4/5 w-3/5 m-auto flex flex-col items-center gap-4  justify-center '>

            <div className='h-24 w-24 relative mx-auto'>
              <Image alt='logoEye' src='/logoEye.png' className='m-auto' fill />
            </div>

            <h1 className='text-2xl text-black font-semibold mt-4'>Olá Novamente!</h1>
            <h3>Faça seu login e entre no portal de compras.</h3>

            <form id='login' onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-4 '>

            <div className='relative w-full flex justify-center '>

              <input type='email' {...register('email')} placeholder='E-mail' className='border-[#d9d9d9] border rounded-md w-11/12 h-9 text-sm px-3 text-padrao' />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-at-sign text-zinc-400 h-4 w-4 absolute top-2.5 right-10"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path></svg>
            </div>
            {/* {errors.email?.message} */}

            <div className='relative w-full flex justify-center'>
              <input type='password' {...register('password')} placeholder='Senha' className='border-[#d9d9d9] border rounded-md w-11/12 h-9 text-sm px-3 text-padrao' />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-zinc-400 h-4 w-4 absolute top-2.5 right-10"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            {/* {errors.password?.message} */}

            </form>
            <div className='flex  justify-between w-11/12'>

              <div className="flex items-center">
                <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600  accent-[#5ea9d3] bg-gray-100 border-gray-300 rounded focus:ring-none  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="link-checkbox" className="text-sm text-zinc-400 ml-2 ">Lembre de mim</label>
              </div>

              <a className='text-light-blue text-sm underline hover:cursor-pointer'>Esqueci a Senha</a>
            </div>

            <ButtonLogin type='submit' form='login'>Login</ButtonLogin>

          </div>



          <div className='text-center mb-20'>
            <label className='text-sm text-smaller'>Em caso de dúvidas entre em contato com o TI</label>
          </div>






        </div>

      </div>
    </div>
  )
}
