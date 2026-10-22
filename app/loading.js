import styles from './status.module.css';

// Affiché automatiquement par Next pendant que le Server Component de la page
// récupère ses données (ex. en arrivant sur la page d'un photographe).
export default function Loading() {
  return (
    <div className={styles.status} role="status">
      <div className={styles.spinner} aria-hidden="true" />
      <p>Chargement…</p>
    </div>
  );
}
