'use client'

import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { comparePasswords } from '../libs/validationPassword';
import CustomButton from './CustomButton';
import { jefeUpdateStatus, rhUpdateStatus } from '../libs/fetchDataIncidencia';
import { userValidationAccess } from '../libs/userValidationAccess';
import { showToast } from './showToast';
import { getDataRhByAuth } from '../libs/getDataRhByAuth';
import { sendWhatsappRh } from '../libs/sendWhatsappRh';

interface modalProps {
    userValidation: string;
    onPasswordValidation: (isCorrect: boolean) => void;
    title: string;
    idIncidencia: number;
    statusJefe: number;
    usernameJefe: string;
    nameJefe: string;
    role: string;
    updateJefeStatus: (status: number) => void;
    updateRhStatus: (status: number) => void;
    nombreEmpleado: string;
}

export default function ModalPassword({
    userValidation,
    onPasswordValidation,
    title,
    idIncidencia,
    statusJefe,
    usernameJefe,
    role,
    updateJefeStatus,
    updateRhStatus,
    nombreEmpleado,
    nameJefe,
}: modalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    let status = 0;
    if (title === 'Aceptar') {
        status = 1;
    }

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleUserChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async () => {

        let response: { ok: boolean; idStatus: number; };
        if (statusJefe === -1 && role === "0") {
            setUsername(usernameJefe)
            const isCorrect: boolean = comparePasswords(password, userValidation);
            onPasswordValidation(isCorrect);
            if (isCorrect) {
                response = await jefeUpdateStatus(idIncidencia, status);
                if (response.ok) {
                    showToast('Se ha guardado la respuesta a la solicitud', 'success', 3000)
                    updateJefeStatus(response.idStatus)
                    setTimeout(async () => {
                        if (response.idStatus === 0) {
                            showToast('Rechazaste la solicitud de incidencia', 'info', 4000)
                        } else {
                            showToast('Aceptaste la solicitud de incidencia', 'info', 4000)
                            //Mandar url a RH
                            const arrNumbers = await getDataRhByAuth();
                            sendWhatsappRh(arrNumbers, idIncidencia, nombreEmpleado)
                        }
                    }, 4000)
                } else {
                    showToast('Algo salio mal, no se pudo guardar la respuesta', 'error', 5000)
                }
            } else {
                showToast('Contraseña incorrecta', 'error', 5000)
            }

        } else {
            const userAccess = await userValidationAccess(username, password);
            if (userAccess) {
                onPasswordValidation(userAccess);
                response = await rhUpdateStatus(idIncidencia, status);
                if (response.ok) {
                    showToast('Se ha guardado la respuesta a la solicitud', 'success', 3000)
                    updateRhStatus(response.idStatus)
                    setTimeout(() => {
                        if (!response.idStatus) {
                            showToast('Rechazaste la solicitud de incidencia', 'info', 4000)
                        } else {
                            showToast('Aceptaste la solicitud de incidencia', 'info', 4000)
                        }
                    }, 4000)
                } else {
                    showToast('Algo salio mal, no se pudo guardar la respuesta', 'error', 5000)
                }
            } else {
                onPasswordValidation(false);
                showToast('Contraseña incorrecta', 'error', 5000)
            }
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
                            {
                                role === "1" ?
                                    <ModalHeader className="flex flex-col gap-1">
                                        Para {title} la solicitud escriba su usuario
                                        y contraseña de nextpack
                                    </ModalHeader>
                                    :
                                    <ModalHeader className="flex flex-col gap-1">
                                        Para {title} la solicitud escriba su contraseña de nextpack
                                    </ModalHeader>
                            }
                            <ModalBody>
                                {
                                    role === "1" ?
                                        <Input
                                            label="Usuario"
                                            placeholder="Escribe tu usuario"
                                            type="text"
                                            onChange={handleUserChange}
                                            variant="bordered"
                                        /> : <>
                                            <p className=''>Nombre: {nameJefe}</p>
                                            <p className=''>Usuario: {usernameJefe}</p>
                                        </>
                                }
                                <Input
                                    label="Contraseña"
                                    placeholder="Escribe tu contraseña"
                                    type="password"
                                    onChange={handlePasswordChange}
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <CustomButton
                                    title='Cancelar'
                                    colorProp='danger'
                                    variantProp='flat'
                                    onPressProp={onClose}
                                />

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
