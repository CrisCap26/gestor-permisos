'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { comparePasswords } from '../libs/validationPassword';

interface modalProps {
    userValidation: string;
}

export default function ModalPassword({userValidation}: modalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        const isCorrect = comparePasswords(password, userValidation);
        if (isCorrect) {
            alert("Thats correct password")
            //Cambiar estatus a true
        } else {
           alert("Thats incorrect password")
        }
    }

    return (
        <>
            <Button className='w-80' onPress={onOpen} color="success">Aceptar</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Para aceptar la solicitud escriba su contraseña
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Contraseña"
                                    placeholder="Escribe tu contraseña"
                                    type="password"
                                    onChange={handlePasswordChange}
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => { handleSubmit(); onClose(); }}>
                                   Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
