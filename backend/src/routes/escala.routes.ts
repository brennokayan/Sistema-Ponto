import { FastifyInstance } from "fastify";
import { verifyToken } from "../middlewares/verifyToken";
import { prisma } from "../prisma";

export async function escalaRoutes(app: FastifyInstance) {
  app.get("/escalas/:userId", { preHandler: [verifyToken] }, async (req, reply) => {
    const { userId } = req.params as { userId: string };
    const escalas = await prisma.escala.findMany({ where: { userId } });
    return reply.send(escalas);
  });

  app.post("/escalas", { preHandler: [verifyToken] }, async (req, reply) => {
    const { userId, diaSemana, horaInicio, horaFim } = req.body as any;
    const escala = await prisma.escala.create({ data: { userId, diaSemana, horaInicio, horaFim } });
    return reply.send({escala});
  });


  app.post("/teste", {preHandler: [verifyToken]} ,async(req, reply) => {
    const { diaSemana} = req.body as any;
    return reply.send({diaSemana});
  })

  app.put("/escalas/:id", { preHandler: [verifyToken] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    const { horaInicio, horaFim } = req.body as any;
    const escala = await prisma.escala.update({ where: { id }, data: { horaInicio, horaFim } });
    return reply.send(escala);
  });

  app.delete("/escalas/:id", { preHandler: [verifyToken] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.escala.delete({ where: { id } });
    return reply.send({ message: "Escala removida com sucesso" });
  });
}
