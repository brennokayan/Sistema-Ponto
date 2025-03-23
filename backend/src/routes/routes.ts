import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { escalaRoutes } from "./escala.routes";
import { pontoRoutes } from "./ponto.routes";
import { userRoutes } from "./user.routes";

export async function Routes (app: FastifyInstance){
    app.register(authRoutes);
    app.register(pontoRoutes);
    app.register(escalaRoutes);
    app.register(userRoutes);
}