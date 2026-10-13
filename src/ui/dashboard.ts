/**
 * @module ui/dashboard
 * @remarks Interface de démonstration MCP Apps ; aucune écriture ni persistance.
 */
import {
  App,
  applyDocumentTheme,
  applyHostStyleVariables,
} from "@modelcontextprotocol/ext-apps";

interface DemoBox {
  boxId: string;
  displayName: string;
  participantCount: number;
  storage: "demo-only";
}

interface Topic {
  id: string;
  title: string;
  category: string;
  status: "PENDING" | "IN_DISCUSSION" | "RESOLVED";
}

const workflows: Record<string, string> = {
  setup: "Nous testons l'accueil Boulette Box. Explique-moi comment nous pourrions créer un dossier Google Drive partagé et un Sheet de démonstration pour une Box multi-personnes. Ne crée aucun fichier à ce stade : commence par présenter les étapes et demander mon accord.",
  join: "Nous testons l'accueil Boulette Box. Explique comment rejoindre un dossier Google Drive déjà partagé en utilisant son identifiant et la vérification d'un manifeste Boulette Box. Ne consulte ni ne modifie de vrai Drive dans ce test.",
  create: "Avec Boulette Box, aide-moi à formuler un sujet personnel à mon rythme. Pose des questions bienveillantes, distingue faits, ressentis et besoins. Ceci est un prototype : ne publie ni n'enregistre aucune donnée.",
  perspective: "Avec Boulette Box, guide-moi pour apporter mon propre point de vue à un sujet existant. Commence par me demander de quel sujet il s'agit. Ne publie aucune donnée pendant ce test.",
  review: "Avec Boulette Box, explique comment plusieurs personnes pourront préparer une discussion collective, comprendre leurs besoins respectifs et rechercher des accords, sans arbitrer qui a raison. Aucun fichier réel ne doit être modifié.",
  help: "Présente Boulette Box : une Box correspond à un dossier Google Drive partagé, utilisable entre plusieurs personnes, avec des conversations personnelles puis des publications volontaires. Précise que la connexion Drive et le dashboard réels ne sont pas encore implémentés.",
};

const app = new App({ name: "Boulette Box", version: "0.1.0" });

function setStatus(message: string): void {
  const node = document.getElementById("status");
  if (node) node.textContent = message;
}

function renderDemoBox(box: DemoBox): void {
  const name = document.getElementById("box-label");
  const participants = document.getElementById("participants-label");
  if (name) name.textContent = box.displayName;
  if (participants) participants.textContent =
    String(box.participantCount) + " participants fictifs · Aucun Drive connecté";
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
    if ("box" in data && data.box && typeof data.box === "object") {
      renderDemoBox(data.box as DemoBox);
    }
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
