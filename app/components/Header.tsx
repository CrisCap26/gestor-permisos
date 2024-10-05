'use client'
import { Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
//import logo from '../assets/logoJRM.png'
import logo from '../assets/NEXTPACK_LOGO.png'
import { HeaderProps } from '../interfaces/Header'
import { formatDate } from '../libs/formatFecha'

export default function Header({ fecha }: HeaderProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Actualizar isMobile cuando el componente se monta
    setIsMobile(window.innerWidth < 768);

    // Opcional: agregar un listener para manejar cambios de tamaño de ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);
  //const isMobile = window.innerWidth < 768;
  const fechaFormatted = formatDate(fecha)
  return (
    <header className='flex flex-row p-2 md:h-[100px]'>
      <div className='basis-1/5 flex justify-center items-center md:basis-16 md:ml-1'>
        <Image
          width={isMobile ? 120 : 150}
          height={isMobile ? 80 : 100}
          alt="Logo"
          src={logo.src}
        />
      </div>
      <div className='flex flex-col justify-center ml-3 md:text-xl'>
        <h1 className='text-md'>Aviso de incidencias a nominas</h1>
        <div>
          <p className="text-small text-default-500">Fecha de creación: {fechaFormatted}</p>
        </div>
      </div>
    </header>
  )
}
