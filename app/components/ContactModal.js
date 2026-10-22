'use client';

import buttonStyles from './Button.module.css';
import { CloseIcon } from './icons';
import Modal from './Modal';
import styles from './ContactModal.module.css';

// Les champs du formulaire : leur "name" sert de clé dans le log de la console
const FIELDS = [
  { name: 'firstName', label: 'Prénom', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Nom', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
];

export default function ContactModal({ isOpen, onClose, photographerName }) {
  function handleSubmit(event) {
    // Empêche le rechargement de la page provoqué par l'envoi natif du formulaire
    event.preventDefault();

    // Pour le prototype, on affiche seulement le contenu des champs dans la console
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="contact-title" className={styles.modal}>
      <h2 id="contact-title" className={styles.title}>
        Contactez-moi
        <br />
        {photographerName}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {FIELDS.map((field) => (
          <div key={field.name} className={styles.field}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
            />
          </div>
        ))}
        <div className={styles.field}>
          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" rows={5} required />
        </div>
        <button type="submit" className={buttonStyles.primary}>
          Envoyer
        </button>
      </form>
      {/* Placé en dernier dans le DOM : c'est le dernier arrêt de tabulation sur la maquette */}
      <button
        type="button"
        className={styles.close}
        aria-label="Fermer le formulaire de contact"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </Modal>
  );
}
