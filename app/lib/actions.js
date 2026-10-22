'use server';

import { getMedia, updateNumberOfLikes } from './prisma-db';

/**
 * Server Action appelée par le bouton « J'aime » d'un média : ajoute un like en BDD.
 * Elle s'exécute sur le serveur, mais le navigateur peut l'appeler comme une fonction.
 *
 * Le nouveau total est calculé à partir de la valeur en BDD (et non envoyé par le client),
 * pour qu'un appel trafiqué ne puisse pas écrire un nombre arbitraire.
 *
 * @param {number} mediaId
 * @returns {Promise<number>} le nombre de likes enregistré
 */
export async function incrementMediaLikes(mediaId) {
  if (!Number.isInteger(mediaId)) {
    throw new Error('Identifiant de média invalide');
  }

  const media = await getMedia(mediaId);
  if (!media) {
    throw new Error('Média introuvable');
  }

  const updatedMedia = await updateNumberOfLikes(mediaId, media.likes + 1);
  return updatedMedia.likes;
}
