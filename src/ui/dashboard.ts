/**
 * @module ui/dashboard
 * @remarks Interface de démonstration MCP Apps ; aucune écriture ni persistance.
 */
import {
  App,
  applyDocumentTheme,
  applyHostStyleVariables,
} from "@modelcontextprotocol/ext-apps";

interface Topic {
  id: string;
  title: string;
  category: string;
  status: "PENDING" | "IN_DISCUSSION" | "RESOLVED";
}

const workflows: Record<string, string> = {
  create: "Avec Boulette Box, aide-moi à formuler un sujet personnel à mon rythme. Pose des questions bienveillantes, distingue faits, ressentis et besoins. Ceci est un prototype : ne publie ni n'enregistre aucune donnée.",
  perspective: "Avec Boulette Box, guide-moi pour apporter mon propre point de vue à un sujet existant. Commence par me demander de quel sujet il s'agit. Ne publie aucune donnée pendant ce test.",
  review: "Avec Boulette Box, explique comment nous pourrons préparer une discussion à deux, comprendre nos besoins respectifs et rechercher des accords, sans arbitrer qui a raison.",
  help: "Présente l'application Boulette Box : tableau de bord, création de sujet, contribution, discussion commune et validation explicite avant toute publication. Précise qu'il s'agit d'un prototype.",
};

const app = new App({ name: "Boulette Box", version: "0.1.0" });

function setStatus(message: string): void {
  const node = document.getElementById("status");
  if (node) node.textContent = message;
}

function renderTopics(topics: readonly Topic[]): void {
  const list = document.getElementById("topics");
  if (!list) return;
  list.replaceChildren();

  for (const topic of topics) {
    const row = document.createElement("div");
    row.className = "topic";
    const title = document.createElement("strong");
    title.textContent = topic.title;
    const detail = document.createElement("small");
    detail.textContent = topic.category + " · " +
      (topic.status === "PENDING" ? "À discuter" :
        topic.status === "IN_DISCUSSION" ? "En discussion" : "Résolu");
    row.append(title, detail);
    list.append(row);
  }

  document.getElementById("total")!.textContent = String(topics.length);
  document.getElementById("pending")!.textContent = String(topics.filter((topic) => topic.status === "PENDING").length);
  document.getElementById("active")!.textContent = String(topics.filter((topic) => topic.status === "IN_DISCUSSION").length);
}

app.ontoolresult = (result) => {
  const data = result.structuredContent;
  if (data && typeof data === "object" && "topics" in data && Array.isArray(data.topics)) {
    renderTopics(data.topics as Topic[]);
    setStatus("Démonstration — aucune donnée personnelle ni persistance.");
  }
};

app.addEventListener("hostcontextchanged", (context) => {
  if (context?.theme) applyDocumentTheme(context.theme);
  if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
});

document.querySelectorAll<HTMLButtonElement>("[data-workflow]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.dataset.workflow;
    const prompt = key ? workflows[key] : undefined;
    if (!prompt) return;

    try {
      await app.sendMessage({ role: "user", content: [{ type: "text", text: prompt }] });
      setStatus("Demande envoyée à ChatGPT. Aucune donnée sauvegardée.");
    } catch {
      setStatus("Impossible de démarrer la conversation dans ce client ChatGPT.");
    }
  });
});

app.connect()
  .then(() => {
    const context = app.getHostContext();
    if (context?.theme) applyDocumentTheme(context.theme);
    if (context?.styles?.variables) applyHostStyleVariables(context.styles.variables);
  })
  .catch(() => setStatus("Connexion au conteneur MCP Apps indisponible."));
