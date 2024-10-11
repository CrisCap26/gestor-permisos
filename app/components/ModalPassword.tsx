'use client'

import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { comparePasswords } from '../libs/validationPassword';
import CustomButton from './CustomButton';
import { jefeUpdateStatus, rhUpdateStatus } from '../libs/fetchDataIncidencia';

interface modalProps {
    userValidation: string;
    onPasswordValidation: (isCorrect: boolean) => void;
    title: string;
    idIncidencia: number;
    statusJefe: number;
    statusRH: number;
}

export default function ModalPassword({ 
    userValidation, 
    onPasswordValidation, 
    title, 
    idIncidencia,
    statusJefe,
    statusRH,
}: modalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [password, setPassword] = useState('');
    let status = 0;
    if (title === 'Aceptar') {
        status = 1;
    }

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        const isCorrect = comparePasswords(password, userValidation);
        onPasswordValidation(isCorrect);
        console.log(status, "FFFF")
        if (isCorrect) {
            // const response = await fetch('/api/incidencia/jefe_update_status', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         idIncidencia: idIncidencia,
            //         status: status,
            //     }),
            // })
            let response: { ok: any; idStatus: any; };
            //response = await jefeUpdateStatus(idIncidencia, status);

            if(statusJefe === -1) {
                response = await jefeUpdateStatus(idIncidencia, status);
            } else {
                response = await rhUpdateStatus(idIncidencia, status);
            }
            
            
            //const res = await response.json();
            console.log("ModalPassword: ", response)
            if (response.ok) {
                toast.success('Se ha guardado la respuesta a la solicitud', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                setTimeout(() => {
                    if(!response.idStatus) {
                        toast.info('Rechazaste la solicitud de incidencia', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    } else {
                        toast.info('Aceptaste la solicitud de incidencia', {
                            position: "top-center",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                }, 4000)
                
            } else {
                toast.error('Algo salio mal, no se pudo guardar la respuesta', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast.error('Contraseña incorrecta', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
