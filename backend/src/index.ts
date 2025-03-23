import fastify from "fastify";
import cors from "@fastify/cors";
import { Routes } from "./routes/routes";
import formbody from "@fastify/formbody";
import jwt from "@fastify/jwt";
const app = fastify();


app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
})

app.register(Routes);

app.register(formbody); // se estiver usando x-www-form-urlencoded
app.register(jwt,{
  secret: process.env.JWT_SECRET!,
});

app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333,
    host: "0.0.0.0"
}).then(() => {
    console.log("Server is running on port 3333");
})