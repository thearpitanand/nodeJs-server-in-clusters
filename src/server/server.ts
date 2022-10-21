import { Request, Response } from "express";

export class Server {
  private app = require("express")();
  private PORT = process.env.PORT || 3000;
  private logServer = () =>
    console.log(
      `»»——⍟ Server listening on port ${this.PORT} on pid ${process.pid} ⍟——««`
    );

  // Setup Server
  public init = () => {
    this.app.listen(this.PORT, this.logServer);
  };

  public routes = () => {
    this.app.get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        success: true,
      });
    });
  };
}
