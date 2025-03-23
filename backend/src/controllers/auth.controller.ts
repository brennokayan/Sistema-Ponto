import { FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, senha } = request.body as { email: string; senha: string };
  try {
    const { user } = await authenticate(email, senha);
    const token = generateToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return reply.send({ token, user });
  } catch (error: any) {
    return reply.status(401).send({ error: error.message });
  }
}
