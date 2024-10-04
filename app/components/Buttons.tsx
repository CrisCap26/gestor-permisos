import { Button } from '@nextui-org/react'
import React from 'react'
import ModalPassword from './ModalPassword'

export default function Buttons() {
    return (
        <div className="flex gap-6 justify-center items-center p-5 mt-2">
            <Button className='w-80' color="danger" variant="bordered">
                Rechazar
            </Button>

            <ModalPassword />
        </div>
    )
}
