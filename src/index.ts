import { Server } from "./server/server";
import dotenv from "dotenv";

// initialize dotEnv configuration
dotenv.config();

const server = new Server();
server.routes();
server.init();
