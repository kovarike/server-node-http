
Execute o comando a seguir para criar o banco de dados SQLite e aplicar as migrações:
 - npx prisma migrate dev --name init

O Prisma Client é uma biblioteca auto-gerada que você usará para interagir com o banco de dados. Gere o cliente com:
 - npx prisma generate

exemplos de como você pode interagir com o servidor que configuramos, utilizando diferentes métodos HTTP (GET, POST, PUT, DELETE) com ferramentas como curl
 - curl -X GET http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your-token" \

 - curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your-token" \
     -d '{"name": "danilo", "email": "danilo@danilo.com"}'

- curl -X PUT http://localhost:3000/api/users?id=748bb4ae-f83b-4e99-8b07-97ade076985d \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your-token" \
     -d '{"name": "Jane Doe", "email": "jane.doe@example.com"}'

- curl -X DELETE http://localhost:3000/api/users?id=c36cec2e-7669-4a5d-a604-2fafdf7daac0 \
     -H "Authorization: Bearer your-token"


