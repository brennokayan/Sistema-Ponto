import { FastifyInstance } from "fastify";
import { criarUsuario } from "../controllers/user.controller";
import { prisma } from "../prisma";

export async function userRoutes(app: FastifyInstance) {
  app.post("/usuarios", criarUsuario);
  app.get("/usuarios", async (request, reply) => {
    const usuarios = await prisma.user.findMany({
      include:{
        escalas: true,
        pontos: true,
      }
    })
    return reply.status(200).send({message: "Usuários encontrados com sucesso", usuarios});
  });
  app.get("/usuarios/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const usuario = await prisma.user.findUnique({
      where: { id },
      include:{
        escalas: true,
        pontos: true,
      }
    });
    if (!usuario) {
      return reply.status(404).send({ message: "Usuário não encontrado" });
    }
    reply.status(200).send({ message: "Usuário encontrado com sucesso", usuario });
  })
}
