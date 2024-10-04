'use client'
import { Image } from '@nextui-org/react'
import React from 'react'
//import logo from '../assets/logoJRM.png'
import logo from '../assets/NEXTPACK_LOGO.png'

export default function Header() {
  const isMobile = window.innerWidth < 768;
  return (
   <header className='flex flex-row p-2 md:h-[100px]'>
    <div className='basis-1/5 flex justify-center items-center md:basis-16 md:ml-1'>
    <Image
      width={isMobile ? 120 : 150}
      height={isMobile? 80 : 100}
      alt="Logo"
      src={logo.src}
    />
    </div>
    <div className='flex flex-col justify-center ml-3 md:text-xl'>
        <h1 className='text-md'>Aviso de incidencias a nominas</h1>
        <div>
            <p className="text-small text-default-500">Fecha de creación: 12/09/2024</p>
        </div>
    </div>
   </header>
  )
}
