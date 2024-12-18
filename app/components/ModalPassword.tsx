'use client'

import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { comparePasswords } from '../libs/validationPassword';
import CustomButton from './CustomButton';
import { incidenciaUpdateStatus, jefeUpdateStatus, rhUpdateStatus } from '../libs/fetchDataIncidencia';
import { userValidationAccess } from '../libs/userValidationAccess';
import { showToast } from './showToast';
import { getDataRhByAuth } from '../libs/getDataRhByAuth';
import { sendWhatsappRh } from '../libs/sendWhatsappRh';
import { sendWhatsappEmpleado } from '../libs/sendWhatsappEmpleado';

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
    updateStatusIncidencia: (status: number) => void;
    nombreEmpleado: string;
    numCelEmpleado: string;
    statusActualIncidencia: number;
    idJefe: number;
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
    updateStatusIncidencia,
    nombreEmpleado,
    nameJefe,
    numCelEmpleado,
    statusActualIncidencia, 
    idJefe
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
        if (statusJefe === 0 && role === "0") {
            let statusIncidencia = 3;
            if(status === 1){
                statusIncidencia = 2;
            }
            setUsername(usernameJefe)
            const isCorrect: boolean = comparePasswords(password, userValidation);
            onPasswordValidation(isCorrect);
            if (isCorrect) {
                response = await jefeUpdateStatus(idIncidencia, idJefe, statusIncidencia);
                if (response.ok) {
                    showToast('Se ha guardado la respuesta a la solicitud', 'success', 3000)
                    updateJefeStatus(response.idStatus)
                    updateStatusIncidencia(statusIncidencia)
                    setTimeout(async () => {
                        if (statusIncidencia === 3) {
                            showToast('Rechazaste la solicitud de incidencia', 'info', 4000)
                            //Mandar msg a empleado de que se rechazó la solicitud
                            const res = await sendWhatsappEmpleado(numCelEmpleado, response.idStatus, nombreEmpleado, nameJefe);
                            if (!res) {
                                showToast('No se pudo enviar el mensaje al empleado', 'error', 5000)
                            } else {
                                showToast('Se envió mensaje al empleado sobre su status', 'info', 5000)
                            }
                        } else {
                            showToast('Aceptaste la solicitud de incidencia', 'info', 4000)
                            //Mandar url a RH
                            const arrNumbers = await getDataRhByAuth();
                            sendWhatsappRh(['3322379413'], idIncidencia, nombreEmpleado)
                        }
                    }, 4000)
                } else {
                    showToast('Algo salio mal, no se pudo guardar la respuesta', 'error', 5000)
                }
            } else {
                showToast('Contraseña incorrecta', 'error', 5000)
            }

        } else {
            let statusIncidencia = 3;
            if(status === 1){
                statusIncidencia = 4;
            }
            const userAccess = await userValidationAccess(username, password);
            //console.log(userAccess, "RHHHHH")
            if (userAccess?.exists) {
                onPasswordValidation(userAccess.exists);
                response = await rhUpdateStatus(idIncidencia, userAccess.idEmpleado, statusIncidencia);
                if (response.ok) {
                    showToast('Se ha guardado la respuesta a la solicitud', 'success', 3000)
                    updateRhStatus(response.idStatus)
                    updateStatusIncidencia(statusIncidencia)
                    setTimeout(async () => {
                        if (!response.idStatus) {
                            const res = await sendWhatsappEmpleado(numCelEmpleado, response.idStatus, nombreEmpleado, "RH");
                            if (!res) {
                                showToast('No se pudo enviar el mensaje al empleado', 'error', 5000)
                            } else {
                                showToast('Se envió mensaje al empleado sobre su status', 'info', 5000)
                            }
                        } else {
                            //const resIncidencia = await incidenciaUpdateStatus(idIncidencia);
                            //if (resIncidencia.idStatus) {
                                //Enviar msg a empleado de que fue aceptada su incidencia
                                const res = await sendWhatsappEmpleado(numCelEmpleado, response.idStatus, nombreEmpleado, "RH");
                                if (!res) {
                                    showToast('No se pudo enviar el mensaje al empleado', 'error', 5000)
                                } else {
                                    showToast('Se envió mensaje al empleado sobre su status', 'info', 5000)
                                }
                            //}
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
