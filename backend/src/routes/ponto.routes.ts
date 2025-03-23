import { FastifyInstance } from "fastify";
import { createOuAtualizarPonto } from "../controllers/ponto.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { prisma } from "../prisma";

export async function pontoRoutes(app: FastifyInstance) {
  app.post("/ponto", { preHandler: [verifyToken] }, createOuAtualizarPonto);

  app.get("/ponto/:userId", { preHandler: [verifyToken] }, async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const pontos = await prisma.ponto.findMany({
      where: { userId },
      orderBy: { data: "desc" },
    });
    return reply.send(pontos);
  });
  
}
