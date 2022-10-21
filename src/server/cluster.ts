import { Server } from "./server";

export class ServerCluster {
  private server = new Server();
  private os = require("os");
  private cluster = require("cluster");
  private totalNumberOfCPUs = this.os.cpus();
  private createNewCluster = () => this.cluster.fork();
  private onClusterExit(code: any, signal: any) {
    if (signal) {
      console.log(`Worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`Worker exited with error code: ${code}`);
    } else {
      console.log("Worker success!");
    }
    this.createNewCluster();
  }

  public init() {
    if (this.cluster.isMaster) {
      console.log("Running Master Process");
      for (let index = 0; index < this.totalNumberOfCPUs.length; index++) {
        this.createNewCluster();
      }
      this.cluster.on("exit", this.onClusterExit);
    } else {
      this.server.initRoutes();
      this.server.init();
    }
  }
}
