'use client';

import { useState } from 'react';
import { incrementMediaLikes } from '../lib/actions';
import { HeartIcon } from './icons';
import Lightbox from './Lightbox';
import MediaCard from './MediaCard';
import SortSelect, { SORT_OPTIONS } from './SortSelect';
import styles from './MediaGallery.module.css';

// Une fonction de comparaison par critère de tri, utilisée par Array.prototype.sort
const COMPARE_FUNCTIONS = {
  popularity: (a, b) => b.likes - a.likes, // les plus likés d'abord
  date: (a, b) => b.date.localeCompare(a.date), // les plus récents d'abord (dates "AAAA-MM-JJ")
  title: (a, b) => a.title.localeCompare(b.title, 'fr'), // ordre alphabétique
};

/**
 * Partie interactive de la page photographe : tri, galerie, likes, lightbox
 * et encart du bas (total des likes + tarif).
 * Les médias arrivent du Server Component parent, puis vivent dans un state local.
 */
export default function MediaGallery({ initialMedias, photographerName, price }) {
  const [medias, setMedias] = useState(initialMedias);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
  // Index (dans la liste triée) du média affiché dans la lightbox, null si elle est fermée
  const [lightboxIndex, setLightboxIndex] = useState(null);
  // Message affiché si l'enregistrement d'un like échoue
  const [likeError, setLikeError] = useState(null);

  // sort() modifie le tableau d'origine : on trie donc une copie
  const sortedMedias = [...medias].sort(COMPARE_FUNCTIONS[sortBy]);

  // Valeur dérivée : recalculée à chaque rendu plutôt que stockée dans un state
  const totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);

  // Ajoute « delta » au nombre de likes d'un média dans le state
  function changeLikes(mediaId, delta) {
    setMedias((currentMedias) =>
      currentMedias.map((media) =>
        media.id === mediaId ? { ...media, likes: media.likes + delta } : media,
      ),
    );
  }

  async function handleLike(mediaId) {
    // Mise à jour « optimiste » : l'affichage change tout de suite, sans attendre le serveur
    changeLikes(mediaId, 1);
    setLikeError(null);
    try {
      await incrementMediaLikes(mediaId);
    } catch (error) {
      // En cas d'échec de l'enregistrement en BDD, on annule le like affiché
      console.error(error);
      changeLikes(mediaId, -1);
      setLikeError("Votre like n'a pas pu être enregistré. Veuillez réessayer.");
    }
  }

  return (
    <>
      <aside className={styles.summary} aria-label="Total des likes et tarif">
        <p>
          {totalLikes.toLocaleString('fr-FR')}
          <span className="visually-hidden"> likes au total</span>
          <HeartIcon />
        </p>
        <p>{price}€ / jour</p>
      </aside>

      <section aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="visually-hidden">
          Réalisations de {photographerName}
        </h2>
        <SortSelect value={sortBy} onChange={setSortBy} />
        {/* role="alert" : le message est lu immédiatement par les lecteurs d'écran */}
        {likeError && (
          <p role="alert" className={styles.error}>
            {likeError}
          </p>
        )}
        <ul className={styles.grid}>
          {sortedMedias.map((media, index) => (
            <li key={media.id}>
              <MediaCard
                media={media}
                // La première ligne (3 médias) est visible sans défiler : chargement immédiat
                isAboveTheFold={index < 3}
                onOpen={() => setLightboxIndex(index)}
                onLike={() => handleLike(media.id)}
              />
            </li>
          ))}
        </ul>
      </section>

      <Lightbox
        medias={sortedMedias}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
