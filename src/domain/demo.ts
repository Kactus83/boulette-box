/**
 * @module domain/demo
 * @remarks Jeu de démonstration totalement fictif, sans synchronisation Google Drive.
 */
export interface DemoTopic {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: "PENDING" | "IN_DISCUSSION" | "RESOLVED";
}

export interface DemoBox {
  readonly boxId: string;
  readonly displayName: string;
  readonly participantCount: number;
  readonly storage: "demo-only";
}

export interface DemoDashboard {
  readonly mode: "demo";
  readonly box: DemoBox;
  readonly topics: readonly DemoTopic[];
}

/**
 * Retourne un espace multi-personnes fictif, sans identifiants Google réels.
 *
 * @returns Dashboard intégralement fictif.
 * @public
 */
export function getDemoDashboard(): DemoDashboard {
  return {
    mode: "demo",
    box: {
      boxId: "demo-box",
      displayName: "Notre Box de démonstration",
      participantCount: 3,
      storage: "demo-only",
    },
    topics: [
      { id: "demo-1", title: "Mieux organiser nos week-ends", category: "Organisation", status: "PENDING" },
      { id: "demo-2", title: "Prévoir du temps ensemble", category: "Vie commune", status: "IN_DISCUSSION" },
      { id: "demo-3", title: "Répartir les responsabilités", category: "Quotidien", status: "RESOLVED" },
    ],
  };
}
