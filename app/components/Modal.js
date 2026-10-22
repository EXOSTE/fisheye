'use client';

import { useEffect, useRef } from 'react';

/**
 * Modale générique, utilisée par le formulaire de contact et par la lightbox.
 *
 * Elle s'appuie sur l'élément natif <dialog> ouvert avec showModal(), qui gère pour nous :
 *  - le piège du focus (Tab reste dans la modale, le reste de la page devient inerte) ;
 *  - la fermeture avec la touche Échap ;
 *  - le retour du focus sur le bouton qui a ouvert la modale à la fermeture ;
 *  - le rôle "dialog" annoncé aux lecteurs d'écran.
 *
 * @param {boolean} isOpen état contrôlé par le composant parent
 * @param {() => void} onClose appelé à chaque fermeture (Échap, bouton, …)
 * @param {string} labelledBy id de l'élément qui sert de titre à la modale
 */
export default function Modal({ isOpen, onClose, labelledBy, className, children }) {
  const dialogRef = useRef(null);

  // Synchronise l'élément <dialog> du DOM avec l'état React isOpen
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={className} aria-labelledby={labelledBy} onClose={onClose}>
      {isOpen && children}
    </dialog>
  );
}
