/**
 * @module main
 * @remarks Point d'entrée HTTP du prototype MCP, limité à la boucle locale.
 */
import { createServer } from "node:http";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createBouletteBoxServer } from "./server.js";

const port = Number(process.env.PORT ?? "8787");
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}

const mcpHandler = toNodeHandler(createMcpHandler(() => createBouletteBoxServer()));

const httpServer = createServer((req, res) => {
  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;

  if (pathname === "/health" && req.method === "GET") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ status: "ok", app: "boulette-box", mode: "demo" }));
    return;
  }

  if (pathname === "/mcp") {
    void mcpHandler(req, res);
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

httpServer.listen(port, "127.0.0.1", () => {
  console.log("Boulette Box MCP running on http://127.0.0.1:" + port + "/mcp");
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => httpServer.close());
}
