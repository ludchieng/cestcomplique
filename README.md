# C’estCompliqué

Test de couple en solo : 37 questions sur ce qui s’est vraiment passé, un bilan sans note, et « Les coulisses du bilan » pour voir quelle réponse fait apparaître chaque message.

Le site est une page Svelte (Vite), volontairement monolithique : le balisage est dans `src/App.svelte`, les styles dans `src/app.css` et toute la logique dans `src/app.js`. Les réponses restent dans le navigateur de la personne (localStorage) : rien n’est envoyé.

## Développer en local

```sh
pnpm install
pnpm dev
```

Le navigateur se recharge à chaque modification. `pnpm build` produit le site dans `dist/`, `pnpm preview` le sert localement.

## Mise en ligne sur GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.

À faire une seule fois : dans le dépôt, **Settings → Pages → Build and deployment → Source : GitHub Actions**. Le site est ensuite disponible à l’adresse `https://<votre-compte>.github.io/<nom-du-depot>/`.

## Dépendances externes

Seules les polices Alegreya et Nunito sont chargées depuis Google Fonts. Sans connexion, le site s’affiche avec les polices du système.
