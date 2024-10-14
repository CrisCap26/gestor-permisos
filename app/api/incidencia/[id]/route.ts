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
                tipoIncidencia: {
                    select: {
                        descripcion: true,
                    },
                },
                nombreEmpleado: {
                    select: {
                        nombre: true,
                        departamento: true,
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
                jefe: incidencia.nombreEmpleado.jefe?.nombre,
                username: incidencia.nombreEmpleado.login_principal.usuario,
                password: hashPassword(incidencia.nombreEmpleado.login_principal.contrasena),
                jefeUsername: incidencia.nombreEmpleado.jefe?.login_principal.usuario,
                jefePassword: incidencia.nombreEmpleado.jefe?.login_principal.contrasena ? hashPassword(incidencia.nombreEmpleado.jefe?.login_principal.contrasena) : '',
                idJefe: incidencia.nombreEmpleado.jefe?.id,
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

export async function POST(request: Request,  { params }: Params) {
    try {
        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(params.id) },
            data: {
                jefe_estatus_autoriza: 1
            }
        })
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