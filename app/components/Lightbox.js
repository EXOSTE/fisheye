'use client';

import { useEffect } from 'react';
import { ChevronIcon, CloseIcon } from './icons';
import MediaContent from './MediaContent';
import Modal from './Modal';
import styles from './Lightbox.module.css';

/**
 * Lightbox : affiche un média en grand et permet de passer au précédent / suivant
 * avec les boutons ou les flèches du clavier. Échap la ferme (géré par <dialog>).
 * La navigation boucle : après le dernier média, on revient au premier.
 */
export default function Lightbox({ medias, currentIndex, onNavigate, onClose }) {
  const isOpen = currentIndex !== null;

  // Le modulo ramène l'index dans les bornes du tableau (ex. -1 → dernier média)
  const showPrevious = () => onNavigate((currentIndex - 1 + medias.length) % medias.length);
  const showNext = () => onNavigate((currentIndex + 1) % medias.length);

  // Écoute les flèches du clavier uniquement tant que la lightbox est ouverte
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      // Sur une vidéo, les flèches servent à avancer / reculer dans la vidéo
      if (event.target instanceof HTMLVideoElement) return;

      if (event.key === 'ArrowLeft') {
        onNavigate((index) => (index - 1 + medias.length) % medias.length);
      } else if (event.key === 'ArrowRight') {
        onNavigate((index) => (index + 1) % medias.length);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Nettoyage : on retire l'écouteur à la fermeture pour ne pas l'empiler
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, medias.length, onNavigate]);

  const media = isOpen ? medias[currentIndex] : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="lightbox-title" className={styles.lightbox}>
      {media && (
        <div className={styles.layout}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Média précédent"
            onClick={showPrevious}
          >
            <ChevronIcon direction="left" />
          </button>
          <figure className={styles.figure}>
            <div className={styles.mediaFrame}>
              {/* key force React à recréer la vidéo quand on change de média */}
              <MediaContent
                key={media.id}
                media={media}
                variant="full"
                className={styles.media}
                isAboveTheFold
              />
            </div>
            <figcaption id="lightbox-title" className={styles.title}>
              {media.title}
            </figcaption>
          </figure>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Média suivant"
            onClick={showNext}
          >
            <ChevronIcon direction="right" />
          </button>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fermer la vue agrandie"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </Modal>
  );
}
