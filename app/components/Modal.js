'use client';

import { useEffect, useRef } from 'react';

// Éléments qui peuvent recevoir le focus avec la touche Tab
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), video[controls]';

/**
 * Modale générique, utilisée par le formulaire de contact et par la lightbox.
 *
 * Elle s'appuie sur l'élément natif <dialog> ouvert avec showModal(), qui gère pour nous :
 *  - le reste de la page rendu inerte (on ne peut plus y cliquer ni y tabuler) ;
 *  - la fermeture avec la touche Échap ;
 *  - le retour du focus sur le bouton qui a ouvert la modale à la fermeture ;
 *  - le rôle "dialog" annoncé aux lecteurs d'écran.
 * On y ajoute la boucle du focus (handleKeyDown), que <dialog> ne fait pas.
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

  // Fait boucler le focus dans la modale. Sans ça, après le dernier élément,
  // <dialog> laisse le focus partir vers la barre d'adresse du navigateur.
  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    const focusables = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      // Maj + Tab sur le premier élément : on va au dernier
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      // Tab sur le dernier élément : on revient au premier
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={className}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      {isOpen && children}
    </dialog>
  );
}
