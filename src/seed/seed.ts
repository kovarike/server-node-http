import { prisma } from "../prisma/client/prismaClient";
import { v4 as uuid } from 'uuid'

export async function Seed() {
    await prisma.user.deleteMany({});
    //await prisma.$executeRaw`DELETE FROM "User"`;
    await prisma.user.createMany({
        data: [
            {
                id: uuid(),
                name: 'João Silva',
                email: 'joao.silva@example.com',
                
            },
            {
                id: uuid(),
                name: 'Maria Oliveira',
                email: 'maria.oliveira768@example.com',
                
            },
            {
                id: uuid(),
                name: 'Pedro Santos',
                email: 'pedro.santos7@example.com',
                
            },
            {
                id: uuid(),
                name: 'Pedro Santos',
                email: 'pedro.santos5@example.com',
                
            },
            {
                id: uuid(),
                name: 'Pedro Santos',
                email: 'pedro.santos3@example.com',
                
            },
            {
                id: uuid(),
                name: 'Pedro Santos',
                email: 'pedro.santos2@example.com',
                
            },
            {
                id: uuid(),
                name: 'Pedro Santos',
                email: 'pedro.santos1@example.com',
                
            }
        ],
    })
}

Seed().catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});