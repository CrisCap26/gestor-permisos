'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react'

export default function ModalPassword() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onClose}>
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
