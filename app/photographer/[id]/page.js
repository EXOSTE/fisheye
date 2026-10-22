import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactSection from '../../components/ContactSection';
import Logo from '../../components/Logo';
import MediaGallery from '../../components/MediaGallery';
import { getAllMediasForPhotographer, getPhotographer } from '../../lib/prisma-db';
import styles from './page.module.css';

// L'id arrive de l'URL sous forme de texte ("/photographer/243" → "243") :
// on le convertit en nombre, et on renvoie null s'il n'est pas valide.
function parsePhotographerId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) ? id : null;
}

// Titre de l'onglet personnalisé pour chaque photographe
export async function generateMetadata({ params }) {
  const id = parsePhotographerId((await params).id);
  const photographer = id === null ? null : await getPhotographer(id);
  return { title: photographer ? `${photographer.name} - FishEye` : 'FishEye' };
}

export default async function PhotographerPage({ params }) {
  // Depuis Next 15, params est une Promise
  const id = parsePhotographerId((await params).id);
  if (id === null) notFound();

  // Les deux requêtes sont indépendantes : on les lance en parallèle
  const [photographer, medias] = await Promise.all([
    getPhotographer(id),
    getAllMediasForPhotographer(id),
  ]);
  if (!photographer) notFound();

  const { name, city, country, tagline, portrait, price } = photographer;

  return (
    <>
      <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>
        <section className={styles.banner} aria-labelledby="photographer-name">
          <div>
            <h1 id="photographer-name" className={styles.name}>
              {name}
            </h1>
            <p className={styles.location}>
              {city}, {country}
            </p>
            <p className={styles.tagline}>{tagline}</p>
          </div>
          <ContactSection photographerName={name} />
          <Image
            src={`/${portrait}`}
            alt={name}
            width={200}
            height={200}
            className={styles.portrait}
            preload
          />
        </section>
        <MediaGallery initialMedias={medias} photographerName={name} price={price} />
      </main>
    </>
  );
}
