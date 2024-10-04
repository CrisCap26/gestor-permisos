import { PrismaClient } from "@prisma/client";

//crear variable
//extender el objeto global
declare global {
    var prisma: PrismaClient | undefined;
}
export const prisma = global.prisma || new PrismaClient(); 

if(process.env.NODE !== "production") global.prisma = prisma;