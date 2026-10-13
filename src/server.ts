/**
 * @module server
 * @remarks Déclaration des ressources et des outils MCP de Boulette Box.
 *           Aucun outil d'écriture ni donnée privée dans cette version.
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { getDemoDashboard } from "./domain/demo.js";

const RESOURCE_URI = "ui://boulette-box/dashboard";

/**
 * Construit une instance MCP sans état, isolée pour chaque requête.
 *
 * @returns Serveur MCP contenant une ressource UI et un outil de lecture.
 * @remarks Le point d'entrée global dépend du support des extensions OpenAI.
 * @public
 */
export function createBouletteBoxServer(): McpServer {
  const server = new McpServer({
    name: "boulette-box",
    version: "0.1.0",
  });

  registerAppResource(
    server,
    "Boulette Box dashboard",
    RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async () => ({
      contents: [{
        uri: RESOURCE_URI,
        mimeType: RESOURCE_MIME_TYPE,
        text: await readFile(resolve("dist/dashboard.html"), "utf8"),
      }],
    }),
  );

  registerAppTool(
    server,
    "open_dashboard",
    {
      title: "Ouvrir Boulette Box",
      description: "Affiche le tableau de bord de démonstration Boulette Box avec trois sujets fictifs.",
      inputSchema: z.object({}),
      outputSchema: z.object({
        mode: z.literal("demo"),
        topics: z.array(z.object({
          id: z.string(),
          title: z.string(),
          category: z.string(),
          status: z.enum(["PENDING", "IN_DISCUSSION", "RESOLVED"]),
        })),
      }),
      _meta: {
        ui: { resourceUri: RESOURCE_URI },
        "openai/ui": { entrypoints: [{ type: "global" }, { type: "thread" }] },
      },
    },
    async () => ({
      content: [{ type: "text", text: "Boulette Box : tableau de bord expérimental, sujets fictifs uniquement." }],
      structuredContent: { ...getDemoDashboard() },
    }),
  );
  return server;
}
