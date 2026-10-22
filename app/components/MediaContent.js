import Image from 'next/image';

/**
 * Affiche un média, qu'il s'agisse d'une photo ou d'une vidéo.
 * - variant "thumbnail" : vignette de la galerie (la vidéo montre sa première image, sans contrôles)
 * - variant "full" : média en grand dans la lightbox (la vidéo a ses contrôles de lecture)
 */
export default function MediaContent({ media, variant, className, isAboveTheFold = false }) {
  if (media.video) {
    const isThumbnail = variant === 'thumbnail';
    return (
      <video
        className={className}
        // "#t=0.1" demande au navigateur d'afficher l'image à 0,1 s comme aperçu
        src={`/${media.video}${isThumbnail ? '#t=0.1' : ''}`}
        preload="metadata"
        controls={!isThumbnail}
        muted={isThumbnail}
        playsInline
        aria-label={isThumbnail ? undefined : media.title}
        aria-hidden={isThumbnail ? true : undefined}
      />
    );
  }

  return (
    <Image
      className={className}
      src={`/${media.image}`}
      alt={media.title}
      fill
      loading={isAboveTheFold ? 'eager' : 'lazy'}
      // Indique au navigateur la largeur affichée, pour charger une image à la bonne taille
      sizes={variant === 'thumbnail' ? '350px' : '1050px'}
    />
  );
}
