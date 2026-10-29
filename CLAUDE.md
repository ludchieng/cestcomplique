# C’estCompliqué

Test de couple en solo, en français : ~37 questions factuelles (« la dernière fois que… »), puis un bilan **sans note** qui relève des pistes de réflexion, et « Les coulisses du bilan » où l’on rejoue d’autres réponses pour voir quel message apparaît. Tout reste dans le navigateur (localStorage), rien n’est envoyé.

Le nom s’écrit **C’estCompliqué** : attaché, majuscules au début des deux mots, apostrophe typographique. L’ancien nom « Couple en vrai » est abandonné, ne pas le réutiliser.

## Commandes

```sh
pnpm install
pnpm dev       # Vite, rechargement auto
pnpm build     # sortie dans dist/
pnpm preview
```

Déploiement : un push sur `main` lance `.github/workflows/deploy.yml`, qui construit et publie sur GitHub Pages. Dans le dépôt, Pages doit avoir pour source **GitHub Actions**. `vite.config.js` utilise `base: "./"`.

Pas de tests automatisés. Pour vérifier : `pnpm build`, puis Chrome headless (protocole DevTools) avec une émulation mobile à 390 px et des captures d’écran. Toujours vérifier aussi la largeur mobile.

## Structure (monolithique, c’est voulu)

- `index.html` : `<head>` (meta, polices Google Fonts Alegreya et Nunito) et le script.
- `src/App.svelte` : le balisage statique (décor `.sky`, en-tête, `<main id="view">`, toast). Svelte ne sert qu’au rechargement en dev.
- `src/app.css` : tous les styles.
- `src/app.js` : toute la logique, en JS vanilla dans `export function start()`. Le rendu passe par des chaînes HTML injectées avec `innerHTML`, et les clics par un seul écouteur `document` qui lit `data-act`. Les écouteurs globaux reçoivent `on` (signal d’un `AbortController`) pour être retirés au rechargement à chaud.
- `app.js` est formaté par Prettier (réglages par défaut). Garder ce style.

Les blocs `@@CEV-DATA`, `@@CEV-ENGINE` et `@@CEV-END` marquent les données et le moteur, partagés avec l’artifact « Atelier » sur claude.ai. Rien n’est synchronisé automatiquement : le dépôt fait foi.

## Modèle de données (`app.js`)

**Axes (`AX`)** : `ctrl` Confiance et liberté · `conf` Les disputes · `transp` Ce qui se dit, ce qui se tait · `auto` La vie à côté du couple · `secu` Se sentir en sécurité · `passe` Les histoires passées.

**Questions (`Q`)** : `{id, type, block, q, hint?, opts | rows | items}`.

| type | réponse stockée |
|---|---|
| absent (choix unique) ou `tf` | index de l’option |
| `multi` | tableau d’index |
| `grid` | tableau, un index par ligne |
| `grid` + `multi: true` | un tableau d’index par ligne (`cellSel` lit aussi l’ancien format à index unique) |
| `grid` + `layout: "steps"` (a1, les ex) | une étape par ligne : tableau de mots, ou `null` pour « pas d’autre ex » |
| `rank` | ordre des index |

- Une question passée vaut `"skip"`.
- Une ligne de grille peut avoir ses propres `opts`.
- Drapeaux d’option : `ex` (exclusive dans un choix multiple), `lie` (réponse « miroir » invraisemblable), `pos` et `harsh` (mots de a1).
- Drapeaux de question : `needs: "ex"` (sautée sans ex), `off`.

**Attention aux réponses enregistrées** : elles sont stockées par **index**.
- Pour ajouter une option, la mettre **à la fin**.
- Si le sens ou la forme d’une question change, lui donner un **nouvel id** (exemple : b3 est devenue b7).
- Les messages référencent les options par leur **clé `k`**, qui doit rester stable.

**Messages (`TX`)**, chacun avec `kind`, `fam`, `ax`, `t` et `ask?` (question à se poser) :

- `sig` et `pos` : déclenchés par des clés (`q`, `when`, `row?`).
- `rule` : `a1-neg`, `a1-pos`, `a1-nuance`, `c1-same`, `combo` (combinaison de lignes de grille), `lies`, `honest`.
- `coh` : contradiction entre deux réponses, définie dans `COH`.
- `head` et `theme` : textes fixes.

Familles (`fam`) :
- `u` « Peut blesser » : préoccupant quel que soit le couple.
- `c` « À regarder » : dépend de la façon d’être en couple.
- `p` « Point positif ».
- `m` « Un mot sur vos réponses » (miroirs et contradictions).

Variables dans les textes :
- Partenaire : `{il} {Il} {lui} {Lui} {le} {e}`, remplacées selon le choix il, elle ou iel. En neutre : iel, ellui, le·la, ·e.
- Autres : `{sujet}`, `{n}`.
- `fr()` gère les espaces insécables avant `? ! ; :` et dans les guillemets « ».

## Rédaction

- Français, typographie soignée : apostrophe ’ et guillemets « ».
- Ton non jugeant : des pistes, pas un diagnostic. Un message suit la forme constat, puis nuance (« ça peut être X, ou Y »), puis une question ouverte. Les questions portent sur des faits récents et concrets, et précisent le contexte pour éviter les interprétations très différentes.
- **Écriture inclusive** :
  - Point médian quand c’est court : ami·es, chacun·e, l’un·e, dernier·e ex, un·e proche, Tou·tes.
  - Sinon reformuler de façon épicène : « la personne qui… », « votre entourage », « à deux ».
  - Ne jamais genrer les ex, les ami·es ou l’entourage.
  - Pour le ou la partenaire, toujours passer par les variables.

## Choix de design (déjà tranchés)

- Thème sombre uniquement, palette prune et ocre (variables sur `:root`).
- Lueurs, ombres, flou et grain présents mais **modérés**. La version très lumineuse était « trop », la version toute plate aussi.
- Décor de fond : **fils dessinés à la main avec des boucles** (SVG `.hand`), qui se balancent lentement. Ils s’effacent derrière la colonne de texte (masque `.threads-box`) et sont cadrés à gauche sur mobile.
  - Rejetés : les cœurs (trop), les vagues sinusoïdales (« trop scientifique »), le gui (rend mal).
- Bouton « Suivant » toujours transparent (`btn ghost soft-next`), jamais orange.
  - Choix unique : passage automatique. Le bouton se remplit en 450 ms, la question s’efface en 200 ms, puis on avance.
  - Un clic sur « Suivant » saute l’attente.
  - Revenir sur une question déjà répondue ne relance rien.
- Pas de bouton « Ça ne me concerne pas » dans le bilan (retiré).
- Pas d’en-tête sur l’accueil (le titre y est déjà).
- Coulisses sur mobile : le sélecteur « Vos réponses / Le bilan » vit dans l’en-tête, et chaque onglet garde sa position de défilement.
- Historique : chaque étape (question, étape des ex, bilan, coulisses) est une vraie entrée (`syncHistory` dans `render`, `{cc: 2, idx, sub, prev}`). Le geste ou bouton retour du téléphone recule donc d’une étape, et sur iPhone le glissement montre la bonne page. Le bouton « Retour » de l’app passe par `history.back()` quand l’étape précédente est celle de l’historique (`goBackTo`). Depuis l’accueil, le retour quitte le site.
- Retour haptique sur les choix et sur « Suivant » (plus marqué en arrivant au bilan). Android : `navigator.vibrate`. iPhone (iOS 18 et plus) : clic sur un `<input type="checkbox" switch>` caché. Coupé si l’appareil demande moins d’animations.
- Ne jamais laisser un élément déborder en largeur. Un `::before` de 100vw faisait disparaître l’en-tête sur mobile : le viewport s’élargissait.

## Divers

- La clé localStorage reste `couple-en-vrai-v3`. Ne pas la renommer, sinon les tests en cours sont perdus.
- Commits : conventional commits (`feat:`, `fix:`, `docs:`…). Ne pas pousser sans accord, car un push sur `main` déploie.
