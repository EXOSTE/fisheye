'use client';

import { useState } from 'react';
import buttonStyles from './Button.module.css';
import ContactModal from './ContactModal';

// Composant parent : il gère uniquement l'état ouvert/fermé de la modale de contact.
// L'interface du formulaire est déléguée au composant enfant ContactModal.
export default function ContactSection({ photographerName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={buttonStyles.primary}
        aria-haspopup="dialog"
        onClick={() => setIsModalOpen(true)}
      >
        Contactez-moi
      </button>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photographerName={photographerName}
      />
    </>
  );
}
