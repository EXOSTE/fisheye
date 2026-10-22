import Image from 'next/image';
import Link from 'next/link';
import styles from './PhotographerCard.module.css';

/**
 * Vignette d'un photographe sur la page d'accueil.
 * Seuls le portrait et le nom forment le lien (un seul arrêt de tabulation, cf. maquette) ;
 * la localisation, le slogan et le prix sont du texte simple en dessous.
 */
export default function PhotographerCard({ photographer, isAboveTheFold = false }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article className={styles.card}>
      <Link href={`/photographer/${id}`} className={styles.link}>
        <Image
          src={`/${portrait}`}
          alt={name}
          width={200}
          height={200}
          className={styles.portrait}
          // Les portraits visibles dès l'arrivée sur la page ne doivent pas être chargés en différé
          loading={isAboveTheFold ? 'eager' : 'lazy'}
        />
        <h2 className={styles.name}>{name}</h2>
      </Link>
      <p className={styles.location}>
        {city}, {country}
      </p>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.price}>{price}€/jour</p>
    </article>
  );
}
