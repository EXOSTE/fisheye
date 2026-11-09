/** @type {import('next').NextConfig} */
const nextConfig = {
  // Place le <title> directement dans le <head> du HTML envoyé par le serveur.
  // Par défaut, pour une page avec generateMetadata (la page photographe), Next l'envoie
  // en différé dans le <body> : le titre manque alors au document initial (WCAG 2.4.2).
  htmlLimitedBots: /.*/,
};

export default nextConfig;
