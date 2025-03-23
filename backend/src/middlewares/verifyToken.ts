import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Armazena o usuário decodificado numa propriedade customizada
    (request as any).user = decoded;

  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
