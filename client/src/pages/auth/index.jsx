import { Button } from '@/components/ui/button'
import React from 'react'
import Background from '@/assets/login2.png'
import Victory from '@/assets/victory.svg'

function Auth() {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>

          <div className='flex flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-5xl font-bold md:text-6xl'>WELCOME</h1>
                    <img src={Victory} alt='Victory emoji' className='h-[100px]'/>
                </div>

                <p className='font-medium text-center'>
                  Fill in the details to get started with the best chat app
                </p>
            </div>

            <div className='flex items-center justify-center w-full'>

            </div>
          </div>
            
          
        </div>
    </div>
  )
}

export default Auth
