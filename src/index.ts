import dotenv from "dotenv";
import { ServerCluster } from "./server/cluster";

// initialize dotEnv configuration
dotenv.config();

const server = new ServerCluster();
server.init();
