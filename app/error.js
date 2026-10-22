'use client'; // Les error boundaries doivent être des Client Components

import { useEffect } from 'react';
import buttonStyles from './components/Button.module.css';
import styles from './status.module.css';

// Affiché par Next si une erreur survient pendant le rendu d'une page
// (ex. la base de données ne répond pas).
export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.status}>
      <h1>Une erreur est survenue</h1>
      <p role="alert">Les données n&apos;ont pas pu être chargées.</p>
      {/* retry relance le chargement des données de la page */}
      <button type="button" className={buttonStyles.primary} onClick={() => retry()}>
        Réessayer
      </button>
    </main>
  );
}
