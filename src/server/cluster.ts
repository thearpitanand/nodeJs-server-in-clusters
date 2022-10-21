import { Server } from "./server";

const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
  let totalNumberOfCPUs = os.cpus();
  console.log("Running Master Process");

  for (let index = 0; index < totalNumberOfCPUs.length; index++) {
    cluster.fork();
  }
  cluster.on("exit", (code: any, signal: any) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log("worker success!");
    }
    // Create New Cluster
    cluster.fork();
  });
} else {
  const server = new Server();
  server.routes();
  server.init();
}