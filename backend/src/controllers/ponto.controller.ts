import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createOuAtualizarPonto(request: FastifyRequest, reply: FastifyReply) {
  console.log("request.user", request.user);
  const userId = (request.user as any).id;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // reseta a hora para comparar apenas a data

  let ponto = await prisma.ponto.findFirst({
    where: {
      userId,
      data: {
        gte: hoje,
      },
    },
  });

  if (!ponto) {
    // Criar ponto com entrada
    ponto = await prisma.ponto.create({
      data: {
        userId,
        data: new Date(),
        entrada: new Date(),
      },
    });
    return reply.send({ message: "Entrada registrada", ponto });
  }

  if (!ponto.almocoInicio) {
    ponto = await prisma.ponto.update({
      where: { id: ponto.id },
      data: { almocoInicio: new Date() },
    });
    return reply.send({ message: "Início do almoço registrado", ponto });
  }

  if (!ponto.almocoFim) {
    ponto = await prisma.ponto.update({
      where: { id: ponto.id },
      data: { almocoFim: new Date() },
    });
    return reply.send({ message: "Fim do almoço registrado", ponto });
  }

  if (!ponto.saida) {
    ponto = await prisma.ponto.update({
      where: { id: ponto.id },
      data: { saida: new Date() },
    });
    return reply.send({ message: "Saída registrada", ponto });
  }

  return reply.code(400).send({ message: "Ponto já completo para hoje" });
}
