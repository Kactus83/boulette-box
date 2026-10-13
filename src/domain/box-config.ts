/**
 * @module domain/box-config
 * @remarks Contrat candidat pour valider une Box adossée à un dossier Drive.
 * Aucun accès réseau ni aucune assertion de permission n'est effectué ici.
 */
import { z } from "zod";

/**
 * Modèle de la configuration logique d'un espace Boulette Box.
 * Le dossier Google Drive est identifié par un ID opaque, jamais son nom.
 */
export const BoxConfigSchema = z.object({
  kind: z.literal("boulette-box"),
  schemaVersion: z.literal(1),
  boxId: z.uuid(),
  driveFolderId: z.string().trim().min(5).max(512).regex(/^[A-Za-z0-9_-]+$/),
  displayName: z.string().trim().min(1).max(120),
}).strict();

export type BoxConfig = z.infer<typeof BoxConfigSchema>;

/**
 * Valide le format du manifeste puis compare son identifiant de dossier avec
 * le dossier explicitement choisi. La vérification des droits appartient à Google.
 *
 * @param value - Valeur structurée provenant de la future configuration.
 * @param selectedFolderId - ID du dossier sélectionné dans Drive.
 * @returns Configuration validée, sans aucune promesse d'autorisation.
 * @throws Si la version, le format ou l'ID de dossier ne correspond pas.
 */
export function requireMatchingBoxConfig(
  value: unknown,
  selectedFolderId: string,
): BoxConfig {
  const config = BoxConfigSchema.parse(value);

  if (config.driveFolderId !== selectedFolderId) {
    throw new Error("Boulette Box: dossier Drive différent de celui déclaré par la Box.");
  }
  return config;
}
