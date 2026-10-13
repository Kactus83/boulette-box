/**
 * @module tests/demo
 * @remarks Vérifie les invariants des données fictives.
 */
import { describe, expect, it } from "vitest";
import { getDemoDashboard } from "../src/domain/demo.js";

describe("getDemoDashboard", () => {
  it("returns exactly three safe demo topics", () => {
    const snapshot = getDemoDashboard();
    expect(snapshot.mode).toBe("demo");
    expect(snapshot.box.storage).toBe("demo-only");
    expect(snapshot.box.participantCount).toBeGreaterThan(2);
    expect(snapshot.topics).toHaveLength(3);
    expect(new Set(snapshot.topics.map((topic) => topic.id)).size).toBe(3);
    expect(snapshot.topics.every((topic) => topic.id.startsWith("demo-"))).toBe(true);
  });
});
