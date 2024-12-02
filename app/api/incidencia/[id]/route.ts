import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';
import { hashPassword } from "@/app/libs/validationPassword";

interface Params {
    params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const incidencia = await prisma.empleado_incidencias.findUnique({
            where: {
                Id: Number(params.id)
            },
            select: {
                Id: true,
                fecha: true,
                FechaInicio: true,
                FechaFin: true,
                observaciones: true,
                Estatus_incidencia: true,
                jefe_estatus_autoriza: true,
                fecha_jefe_autoriza: true,
                rh_estatus_autoriza: true,
                fecha_rh_autoriza: true,
                fecha_regresa: true,
                dias_disfrutados: true,
                tipoIncidencia: {
                    select: {
                        descripcion: true,
                    },
                },
                nombreEmpleado: {
                    select: {
                        nombre: true,
                        departamento: true,
                        celular: true,
                        sucursal: {
                            select: {
                                nombre: true,
                            }
                        },
                        jefe: {
                            select: {
                                id: true,
                                nombre: true,
                                login_principal: {
                                    select: {
                                        id: true,
                                        usuario: true,
                                        contrasena: true,
                                    }
                                }
                            }
                        },
                        login_principal: {
                            select: {
                                usuario: true,
                                contrasena: true,
                            }
                        }
                    }
                }
            }
        });

        if (!incidencia)
            return NextResponse.json({ message: "incidencia not found" }, { status: 404 });

        const response = {
            empleado: {
                nombre: incidencia.nombreEmpleado.nombre,
                sucursal: incidencia.nombreEmpleado.sucursal.nombre,
                departamento: incidencia.nombreEmpleado.departamento,
                celular: incidencia.nombreEmpleado.celular,
                username: incidencia.nombreEmpleado.login_principal.usuario,
                password: hashPassword(incidencia.nombreEmpleado.login_principal.contrasena),
                jefe: {
                    id: incidencia.nombreEmpleado.jefe?.id,
                    nombre: incidencia.nombreEmpleado.jefe?.nombre,
                    username: incidencia.nombreEmpleado.jefe?.login_principal.usuario,
                    password: incidencia.nombreEmpleado.jefe?.login_principal.contrasena ? hashPassword(incidencia.nombreEmpleado.jefe?.login_principal.contrasena) : '',
                    loginJefeId: incidencia.nombreEmpleado.jefe?.login_principal.id
                }
            },
            incidencia: {
                id: Number(incidencia.Id),
                fecha: incidencia.fecha,
                fechaInicio: incidencia.FechaInicio,
                fechaFin: incidencia.FechaFin,
                observaciones: incidencia.observaciones,
                tipoIncidencia: incidencia.tipoIncidencia.descripcion,
                estatusIncidencia: incidencia.Estatus_incidencia,
                jefeEstatusAut: incidencia.jefe_estatus_autoriza,
                fechaJefeAut: incidencia.fecha_jefe_autoriza,
                rhEstatusAut: incidencia.rh_estatus_autoriza,
                fechaRhAut: incidencia.fecha_rh_autoriza,
                fechaRegresa: incidencia.fecha_regresa,
                diasDisfrutados: incidencia.dias_disfrutados,
            }
        }

        return NextResponse.json(response)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(params.id) },
            data: {
                Estatus_incidencia: 1,
            }
        })

        if (!updateStatus)
            return NextResponse.json({ message: "Hubo un problema al actualizar el status" }, { status: 404 });
        if(updateStatus.Estatus_incidencia === 1) {
            return NextResponse.json({ 
                idStatus: true, 
                message: "Se aprobó la incidencia",
                ok: true
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                idStatus: false, 
                message: "Se rechazó la incidencia",
                ok: true
             }, {status: 200})
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    }
}