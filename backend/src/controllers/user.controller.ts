import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";


export async function criarUsuario(request: FastifyRequest, reply: FastifyReply) {
  const { nome, email, senha, cargo, salario, isAdmin } = request.body as {
    nome: string;
    email: string;
    senha: string;
    cargo: string;
    salario: number;
    isAdmin: boolean;
  };

  const usuarioExistente = await prisma.user.findUnique({ where: { email } });
  if (usuarioExistente) {
    return reply.status(400).send({ error: "Usuário já existe com este e-mail." });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.user.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      cargo,
      salario,
      isAdmin,
    },
  });

  return reply.code(201).send({ message: "Usuário criado com sucesso", usuario: novoUsuario });
}
