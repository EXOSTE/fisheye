# FishEye — Option B

Prototype du nouveau site FishEye : plateforme de photographes freelances
(Next.js, React, Prisma + SQLite).

## Installation

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

`prisma migrate dev` crée la base SQLite `prisma/dev.db` et la remplit avec les données
de `data/` (seed). Le site est ensuite disponible sur http://localhost:3000.

## Scripts

- `npm run dev` : serveur de développement
- `npm run build` puis `npm start` : version de production
- `npm run lint` : vérification ESLint
