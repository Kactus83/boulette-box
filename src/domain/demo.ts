/**
 * @module domain/demo
 * @remarks Données strictement fictives du prototype. Aucun stockage utilisateur.
 */

export interface DemoTopic {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly status: "PENDING" | "IN_DISCUSSION" | "RESOLVED";
}

export interface DemoDashboard {
  readonly mode: "demo";
  readonly topics: readonly DemoTopic[];
}

/**
 * Fournit une photographie reproductible de la démonstration.
 *
 * @returns Trois sujets fictifs sans aucune donnée personnelle.
 * @example
 * const dashboard = getDemoDashboard();
 * // dashboard.mode === "demo"
 * @public
 */
export function getDemoDashboard(): DemoDashboard {
  return {
    mode: "demo",
    topics: [
      { id: "demo-1", title: "Mieux organiser nos week-ends", category: "Organisation", status: "PENDING" },
      { id: "demo-2", title: "Prévoir du temps ensemble", category: "Vie commune", status: "IN_DISCUSSION" },
      { id: "demo-3", title: "Répartir les responsabilités", category: "Quotidien", status: "RESOLVED" },
    ],
  };
}
