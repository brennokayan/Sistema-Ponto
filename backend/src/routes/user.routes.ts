import { FastifyInstance } from "fastify";
import { criarUsuario } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/usuarios", criarUsuario);
}
