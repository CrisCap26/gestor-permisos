'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { comparePasswords } from '../libs/validationPassword';
import CustomButton from './CustomButton';

interface modalProps {
    userValidation: string;
    onPasswordValidation: (isCorrect: boolean) => void;
    title: string;
}

export default function ModalPassword({ userValidation, onPasswordValidation, title }: modalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        const isCorrect = comparePasswords(password, userValidation);
        onPasswordValidation(isCorrect);
        if (isCorrect) {
            alert("Thats correct password")
            //Cambiar estatus a true
        } else {
            alert("Thats incorrect password")
        }
    }

    return (
        <>
            {
                title === "Aceptar" ?
                    <CustomButton 
                        title='Aceptar'
                        classProp='w-80'
                        colorProp='success'
                        onPressProp={onOpen}
                    />
                    :
                    <CustomButton
                        title='Rechazar'
                        classProp='w-80'
                        colorProp='danger'
                        variantProp='bordered'
                        onPressProp={onOpen}
                    />
            }
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Para {title} la solicitud escriba su contraseña
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
                                {/* <Button 
                                    color="danger" 
                                    variant="flat" 
                                    onPress={onClose}
                                >
                                    Cancelar
                                </Button> */}
                                <CustomButton 
                                    title='Cancelar'
                                    colorProp='danger'
                                    variantProp='flat'
                                    onPressProp={onClose}
                                />
                                {/* <Button 
                                    color="primary" 
                                    onPress={() => { handleSubmit(); onClose(); }}
                                >
                                    Aceptar
                                </Button> */}
                                <CustomButton 
                                    title='Aceptar'
                                    colorProp='primary'
                                    onPressProp={() => { handleSubmit(); onClose(); }}
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
