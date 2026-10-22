import Link from 'next/link';
import styles from './status.module.css';

// Affiché quand notFound() est appelé (ex. id de photographe inexistant) ou pour une URL inconnue
export default function NotFound() {
  return (
    <main className={styles.status}>
      <h1>Page introuvable</h1>
      <p>Ce photographe ou cette page n&apos;existe pas.</p>
      <Link href="/" className={styles.link}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
