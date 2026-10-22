import path from 'node:path';
import { PrismaClient } from '../generated/prisma/client';

// Le chemin relatif "file:dev.db" du schéma casse une fois le code bundlé par Next :
// on donne donc le chemin absolu de la BDD, calculé depuis la racine du projet.
const prisma = new PrismaClient({
  datasourceUrl: `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`,
});

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });

export const getMedia = (mediaId) =>
  prisma.media.findUnique({
    where: { id: mediaId },
  });
