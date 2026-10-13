/**
 * @module tests/box-config
 * @remarks Teste les contraintes du manifeste sans aucune requête Google Drive.
 */
import { describe, expect, it } from "vitest";
import { requireMatchingBoxConfig } from "../src/domain/box-config.js";

const candidate = {
  kind: "boulette-box",
  schemaVersion: 1,
  boxId: "82a66762-e210-49f0-9751-ce428301702d",
  driveFolderId: "demo-folder-id-only",
  displayName: "Box fictive",
};

describe("requireMatchingBoxConfig", () => {
  it("accepts an exact matching dossier identifier", () => {
    expect(requireMatchingBoxConfig(candidate, "demo-folder-id-only").boxId).toBe(candidate.boxId);
  });

  it("rejects a similar name on a different dossier", () => {
    expect(() => requireMatchingBoxConfig(candidate, "another-demo-folder"))
      .toThrow(/dossier Drive différent/);
  });

  it("rejects an unknown schema version", () => {
    expect(() => requireMatchingBoxConfig({ ...candidate, schemaVersion: 2 }, candidate.driveFolderId))
      .toThrow();
  });

  it("rejects an invalid folder URL in place of an ID", () => {
    expect(() => requireMatchingBoxConfig({
      ...candidate,
      driveFolderId: "https://drive.google.com/drive/folders/demo",
    }, candidate.driveFolderId)).toThrow();
  });

  it("rejects injected properties", () => {
    expect(() => requireMatchingBoxConfig({ ...candidate, accessToken: "demo-secret" }, candidate.driveFolderId))
      .toThrow();
  });
});
