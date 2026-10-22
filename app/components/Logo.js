import Link from 'next/link';
import { CameraIcon } from './icons';
import styles from './Logo.module.css';

// Logo FishEye : le « E » est remplacé par un appareil photo, comme sur la maquette.
// Le lien ramène à l'accueil ; son nom accessible est fourni par aria-label
// car le texte visible ("Fish" + icône + "ye") serait mal lu par un lecteur d'écran.
export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="FishEye, retour à l'accueil">
      <span aria-hidden="true">Fish</span>
      <CameraIcon className={styles.camera} />
      <span aria-hidden="true">ye</span>
    </Link>
  );
}
