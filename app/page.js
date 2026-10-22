import Logo from './components/Logo';
import PhotographerCard from './components/PhotographerCard';
import { getAllPhotographers } from './lib/prisma-db';
import styles from './page.module.css';

// Server Component : la requête Prisma s'exécute côté serveur ;
// le navigateur reçoit directement le HTML de la liste.
export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.title}>Nos photographes</h1>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}>
          {photographers.map((photographer, index) => (
            <li key={photographer.id}>
              {/* Les 3 premières cartes forment la première ligne, visible sans défiler */}
              <PhotographerCard photographer={photographer} isAboveTheFold={index < 3} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
