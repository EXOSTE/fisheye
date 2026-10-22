import { HeartIcon } from './icons';
import MediaContent from './MediaContent';
import styles from './MediaCard.module.css';

/**
 * Carte d'un média dans la galerie.
 * La vignette est un <button> (et non une image cliquable) : il est ainsi
 * atteignable avec Tab et activable avec Entrée/Espace sans code supplémentaire.
 */
export default function MediaCard({ media, isAboveTheFold, onOpen, onLike }) {
  const { title, likes, video } = media;

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.thumbnail}
        aria-haspopup="dialog"
        aria-label={`${title}${video ? ' (vidéo)' : ''}, ouvrir la vue agrandie`}
        onClick={onOpen}
      >
        <MediaContent
          media={media}
          variant="thumbnail"
          className={styles.media}
          isAboveTheFold={isAboveTheFold}
        />
      </button>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.likes}>
          {likes}
          <span className="visually-hidden"> likes</span>
          <button
            type="button"
            className={styles.likeButton}
            aria-label={`J'aime ${title}`}
            onClick={onLike}
          >
            <HeartIcon />
          </button>
        </p>
      </div>
    </article>
  );
}
