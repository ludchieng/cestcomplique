export function start() {
  const ac = new AbortController(),
    on = { signal: ac.signal };

  /* @@CEV-DATA : questions du test (partagées avec l’atelier) */
  const AX = {
    ctrl: { name: "Confiance et liberté", short: "Confiance" },
    conf: { name: "Les disputes", short: "Disputes" },
    transp: { name: "Ce qui se dit, ce qui se tait", short: "Non-dits" },
    auto: { name: "La vie à côté du couple", short: "Entourage" },
    secu: { name: "Se sentir en sécurité", short: "Sécurité" },
    passe: { name: "Les histoires passées", short: "Passé" },
  };
  const AXK = ["ctrl", "conf", "transp", "auto", "secu", "passe"];

  const Q = [
    {
      id: "a1",
      type: "grid",
      layout: "steps",
      block: "Votre histoire",
      q: "Quelques mots sur chacun·e de vos dernier·es ex.",
      hint: "Cochez autant de mots que vous voulez, ou aucun. Ils peuvent décrire la personne ou ce que vous ressentez.",
      rows: [
        {
          label: "Votre dernier·e ex",
          q: "Votre dernier·e ex, en quelques mots ?",
          skip: "Je n’ai pas d’ex",
        },
        {
          label: "L’ex d’avant",
          q: "Et l’ex d’avant ?",
          skip: "Je n’ai pas eu d’autre ex",
        },
        {
          label: "Encore avant",
          q: "Et encore avant ?",
          skip: "Je n’en ai pas eu d’autre avant",
        },
      ],
      opts: [
        { k: "0", t: "Je l’admire", pos: true },
        { k: "1", t: "Quelqu’un de bien", pos: true },
        { k: "2", t: "Créatif·ve", pos: true },
        { k: "3", t: "Drôle", pos: true },
        { k: "4", t: "Généreux·se", pos: true },
        { k: "5", t: "Pas compatible" },
        { k: "6", t: "On s’est perdus" },
        { k: "7", t: "Du dégoût" },
        { k: "8", t: "Frivole" },
        { k: "9", t: "Immature" },
        { k: "10", t: "Jaloux·se", harsh: true },
        { k: "11", t: "Instable", harsh: true },
        { k: "12", t: "Toxique", harsh: true },
        { k: "13", t: "Manipulateur·rice", harsh: true },
      ],
    },
    {
      id: "a2",
      block: "Votre histoire",
      q: "Si votre dernier·e ex parlait de vous, quel reproche viendrait en premier ?",
      hint: "Pas celui qui serait juste : celui que cette personne dirait vraiment.",
      opts: [
        { k: "0", t: "Trop jaloux·se" },
        { k: "1", t: "Trop distant·e, pas assez présent·e" },
        { k: "2", t: "Colérique, soupe au lait" },
        { k: "3", t: "Étouffant·e, trop demandeur·se" },
        { k: "4", t: "Fermé·e, ne disait jamais rien" },
        { k: "5", t: "Pas assez impliqué·e" },
        { k: "nsp", t: "Je ne saurais pas dire" },
        { k: "autre", t: "Autre" },
      ],
      needs: "ex",
    },
    {
      id: "a3",
      block: "Votre histoire",
      q: "Avec votre partenaire, combien de fois avez-vous rompu puis repris ?",
      opts: [
        { k: "0", t: "Jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Deux fois" },
        { k: "3", t: "Trois fois ou plus" },
      ],
    },
    {
      id: "a5",
      type: "multi",
      block: "Votre histoire",
      q: "Une de vos ruptures passées a-t-elle impliqué l’une de ces choses ?",
      hint: "De votre côté ou de celui de l’autre. Cochez tout ce qui s’applique.",
      opts: [
        { k: "0", t: "Un blocage sur tous les réseaux" },
        { k: "1", t: "Des affaires gardées ou rendues sous condition" },
        { k: "2", t: "Des ami·es commun·es obligé·es de choisir" },
        { k: "3", t: "Des dizaines de messages ou d’appels d’affilée" },
        { k: "4", t: "Quelqu’un qui débarque chez l’autre sans prévenir" },
        { k: "5", t: "Des choses intimes racontées à d’autres" },
        { k: "rien", t: "Rien de tout ça", ex: true },
      ],
      needs: "ex",
    },
    {
      id: "b1",
      block: "Confiance",
      q: "Sur les 30 derniers jours, combien de fois avez-vous regardé le téléphone de votre partenaire sans qu’{il} le sache ?",
      hint: "Une notification lue par-dessus son épaule compte.",
      opts: [
        { k: "jamais", t: "Jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Deux à cinq fois" },
        { k: "3", t: "Six fois ou plus" },
        { k: "4", t: "Je ne compte pas" },
      ],
    },
    {
      id: "b2",
      block: "Confiance",
      q: "Connaissez-vous le code de déverrouillage de son téléphone ?",
      opts: [
        { k: "donne", t: "Oui, {il} me l’a donné" },
        { k: "vu", t: "Oui, je l’ai vu taper" },
        { k: "cherche", t: "Oui, je l’ai deviné ou cherché" },
        { k: "non", t: "Non" },
        {
          k: "bio",
          t: "Non, {il} le déverrouille avec son empreinte ou son visage",
        },
        { k: "sans", t: "{Il} n’a pas de code" },
      ],
    },
    {
      id: "b7",
      block: "Confiance",
      q: "Partagez-vous vos localisations ? Si oui, comment ça s’est décidé ?",
      hint: "Avec Localiser, Google Maps, Snap Map, Life360… toute appli où l’un·e peut voir où se trouve l’autre.",
      opts: [
        { k: "non", t: "Non, on ne partage pas nos localisations" },
        { k: "ensemble", t: "Oui, on l’a décidé à deux" },
        { k: "moi", t: "Oui, c’est moi qui l’ai demandé" },
        { k: "lui-ok", t: "Oui, {il} l’a demandé et j’étais d’accord" },
        {
          k: "lui-pression",
          t: "Oui, {il} l’a demandé et j’ai accepté sans vraiment en avoir envie",
        },
      ],
    },
    {
      id: "b4",
      type: "grid",
      block: "Confiance",
      q: "Lors de la dernière soirée que chacun·e a passée sans l’autre, combien de messages ont été envoyés ?",
      hint: "Une ligne pour chaque sens. Estimez si besoin.",
      rows: [
        { label: "Vos messages pendant sa soirée", tag: "a", who: "vous" },
        {
          label: "Ses messages pendant la vôtre",
          tag: "b",
          who: "votre partenaire",
        },
      ],
      opts: [
        { k: "0", t: "0 à 2" },
        { k: "1", t: "3 à 5" },
        { k: "2", t: "6 à 10" },
        { k: "3", t: "11 à 20" },
        { k: "4", t: "Plus de 20" },
      ],
    },
    {
      id: "b9",
      block: "Confiance",
      q: "La dernière fois que vous êtes rentré·e plus tard que prévu, que s’est-il passé ?",
      opts: [
        { k: "0", t: "Rien de particulier" },
        { k: "1", t: "{Il} m’a demandé si tout allait bien" },
        { k: "2", t: "Plusieurs appels ou messages" },
        { k: "3", t: "Une dispute en rentrant" },
        {
          k: "4",
          t: "{Il} a exigé de savoir où et avec qui, preuves à l’appui",
        },
        { k: "5", t: "Je préviens toujours, pour éviter les problèmes" },
      ],
    },
    {
      id: "s3",
      type: "tf",
      block: "Confiance",
      q: "Avez-vous déjà menti à un·e partenaire, même pour une broutille ?",
      opts: [
        { k: "oui", t: "Oui, déjà" },
        { k: "non", t: "Non, jamais", lie: true },
      ],
    },
    {
      id: "b6",
      type: "grid",
      block: "Confiance",
      q: "Depuis que vous êtes ensemble, combien de personnes ont été supprimées, bloquées ou perdues de vue pour rassurer l’autre ?",
      hint: "Ex, ami·es, collègues : comptez tout le monde.",
      rows: [
        { label: "Pour {le} rassurer", tag: "a", who: "par vous" },
        { label: "Pour vous rassurer", tag: "b", who: "par votre partenaire" },
      ],
      opts: [
        { k: "0", t: "Personne" },
        { k: "1", t: "Une" },
        { k: "2", t: "Deux ou trois" },
        { k: "3", t: "Quatre ou plus" },
      ],
    },
    {
      id: "c1",
      type: "grid",
      multi: true,
      block: "Disputes",
      q: "De quoi parlaient vos deux dernières disputes ?",
      hint: "Le sujet de départ, même s’il a dérivé ensuite. Plusieurs réponses possibles pour chaque dispute.",
      rows: [{ label: "La dernière" }, { label: "Celle d’avant" }],
      opts: [
        { k: "jalousie", t: "Jalousie" },
        { k: "1", t: "Tâches du quotidien" },
        { k: "2", t: "Argent" },
        { k: "3", t: "Famille ou belle-famille" },
        { k: "4", t: "Temps passé ensemble" },
        { k: "5", t: "Sexe et intimité" },
        { k: "amis", t: "Ami·es et sorties" },
        { k: "7", t: "Projets d’avenir" },
        { k: "oubli", t: "Je ne m’en souviens plus", ex: true },
      ],
    },
    {
      id: "c3",
      block: "Disputes",
      q: "Après votre dernière dispute, combien de temps avant que l’un·e revienne vers l’autre ?",
      opts: [
        { k: "0", t: "Moins d’une heure" },
        { k: "1", t: "Dans la journée" },
        { k: "2", t: "Un ou deux jours" },
        { k: "3", t: "Trois jours ou plus" },
        { k: "4", t: "On n’en a jamais reparlé" },
      ],
    },
    {
      id: "c4",
      block: "Disputes",
      q: "Sur vos trois dernières disputes, qui a fait le premier pas ?",
      opts: [
        { k: "0", t: "Ça a alterné" },
        { k: "1", t: "Moi, les trois fois" },
        { k: "2", t: "{Lui}, les trois fois" },
        { k: "3", t: "Personne, on a laissé passer" },
      ],
    },
    {
      id: "c5",
      type: "multi",
      block: "Disputes",
      q: "Cette année, pendant une dispute, est-il arrivé que…",
      hint: "De votre côté ou du sien. Cochez tout ce qui s’est produit au moins une fois.",
      opts: [
        { k: "0", t: "Le ton monte assez pour que les voisins entendent" },
        { k: "1", t: "Une porte claque" },
        { k: "2", t: "L’un·e parte du logement en pleine dispute" },
        { k: "insulte", t: "Une insulte soit lancée" },
        { k: "4", t: "L’un·e menace de rompre" },
        { k: "5", t: "L’un·e bloque l’autre sur son téléphone ou les réseaux" },
        { k: "6", t: "Une vieille histoire soit ressortie" },
        { k: "objet", t: "Un objet soit cassé ou lancé" },
        { k: "retenir", t: "L’un·e empêche l’autre de quitter la pièce" },
        { k: "rien", t: "Rien de tout ça", ex: true },
      ],
    },
    {
      id: "c6",
      type: "grid",
      block: "Disputes",
      q: "La dernière fois que chacun·e a reçu un reproche, quelle a été sa réaction principale ?",
      hint: "Celle qui a pris le dessus, même si d’autres sont venues ensuite.",
      rows: [
        { label: "Votre réaction", tag: "a", who: "vous" },
        { label: "Sa réaction", tag: "b", who: "votre partenaire" },
      ],
      opts: [
        { k: "0", t: "« D’accord, explique-moi »" },
        { k: "1", t: "« C’est pas ce que je voulais dire »" },
        { k: "2", t: "« Et toi, quand tu… »" },
        { k: "3", t: "« Tu exagères »" },
        { k: "4", t: "Le silence" },
        { k: "pardon", t: "« Pardon, tu as raison », tout de suite" },
        { k: "pause", t: "« On peut en reparler plus tard ? »" },
        { k: "ton", t: "Le ton qui monte" },
        { k: "ironie", t: "L’ironie ou les yeux au ciel" },
        { k: "larmes", t: "Les larmes" },
        { k: "devalo", t: "« De toute façon, je fais tout mal »" },
        { k: "part", t: "Quitter la pièce" },
      ],
    },
    {
      id: "c8",
      block: "Disputes",
      q: "Combien de fois avez-vous menacé de rompre, l’un·e ou l’autre, sans le penser vraiment ?",
      opts: [
        { k: "0", t: "Jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Deux à cinq fois" },
        { k: "3", t: "On ne compte plus" },
      ],
    },
    {
      id: "c9",
      block: "Disputes",
      q: "Est-il déjà arrivé que l’un·e de vous cesse de parler à l’autre plus de 24 heures pour lui faire comprendre quelque chose ?",
      opts: [
        { k: "0", t: "Non, jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Plusieurs fois" },
        { k: "3", t: "C’est notre façon de faire" },
      ],
    },
    {
      id: "d1",
      block: "Non-dits",
      q: "Combien de sujets évitez-vous parce que « ça va partir en dispute » ?",
      opts: [
        { k: "aucun", t: "Aucun" },
        { k: "1", t: "Un" },
        { k: "2", t: "Deux ou trois" },
        { k: "3", t: "Quatre ou plus" },
      ],
    },
    {
      id: "d2",
      block: "Non-dits",
      q: "Vous devez lui prêter votre téléphone déverrouillé pendant une heure. Supprimez-vous quelque chose avant ?",
      opts: [
        { k: "0", t: "Non, rien" },
        { k: "1", t: "Oui, un truc gênant mais sans gravité" },
        { k: "2", t: "Oui, quelque chose qu’{il} ne doit pas voir" },
        { k: "3", t: "Je ne prêterais pas mon téléphone" },
      ],
    },
    {
      id: "d3",
      block: "Non-dits",
      q: "Si votre partenaire lisait ce que vous écrivez à vos ami·es à son sujet, {il} serait…",
      opts: [
        { k: "0", t: "Touché{e}, plutôt flatté{e}" },
        { k: "1", t: "Indifférent{e}" },
        { k: "2", t: "Surpris{e}" },
        { k: "3", t: "Blessé{e}" },
        { k: "4", t: "Je n’en parle jamais à mes ami·es" },
      ],
    },
    {
      id: "s2",
      type: "tf",
      block: "Non-dits",
      q: "Avez-vous déjà dit quelque chose de blessant à quelqu’un que vous aimez ?",
      opts: [
        { k: "oui", t: "Oui, déjà" },
        { k: "non", t: "Non, jamais", lie: true },
      ],
    },
    {
      id: "d4",
      block: "Non-dits",
      q: "Ce mois-ci, combien de fois avez-vous gardé pour vous un détail banal pour éviter sa réaction ?",
      hint: "Un déjeuner avec un collègue, un message reçu, une dépense…",
      opts: [
        { k: "0", t: "Jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Deux à quatre fois" },
        { k: "3", t: "Cinq fois ou plus" },
      ],
    },
    {
      id: "e1",
      type: "grid",
      block: "Entourage",
      q: "Ce mois-ci, combien de soirées avez-vous passées chacun·e sans l’autre ?",
      hint: "Amis, famille, sport, travail tard : tout ce qui se fait sans l’autre.",
      rows: [
        { label: "Vos soirées sans {lui}", tag: "a" },
        { label: "Ses soirées sans vous", tag: "b" },
      ],
      opts: [
        { k: "aucune", t: "Aucune" },
        { k: "1", t: "Une" },
        { k: "2", t: "Deux à quatre" },
        { k: "3", t: "Cinq ou plus" },
      ],
    },
    {
      id: "e3",
      block: "Entourage",
      q: "Cette année, combien de fois avez-vous annulé un plan parce que votre partenaire n’était pas à l’aise ?",
      opts: [
        { k: "0", t: "Jamais" },
        { k: "1", t: "Une fois" },
        { k: "2", t: "Deux à quatre fois" },
        { k: "3", t: "Cinq fois ou plus" },
      ],
    },
    {
      id: "e4",
      block: "Entourage",
      q: "Combien de vos ami·es proches apprécient votre partenaire ?",
      opts: [
        { k: "tous", t: "Tou·tes" },
        { k: "plupart", t: "La plupart" },
        { k: "2", t: "Certain·es" },
        { k: "3", t: "Aucun·e" },
        { k: "4", t: "Mes ami·es ne {le} connaissent pas vraiment" },
      ],
    },
    {
      id: "s1",
      type: "tf",
      block: "Entourage",
      q: "Avez-vous déjà ressenti de la jalousie dans une relation ?",
      opts: [
        { k: "oui", t: "Oui, déjà" },
        { k: "non", t: "Non, jamais", lie: true },
      ],
    },
    {
      id: "e5",
      block: "Entourage",
      q: "Quelqu’un de votre entourage vous a-t-il déjà dit s’inquiéter pour vous dans cette relation ?",
      opts: [
        { k: "0", t: "Non" },
        { k: "1", t: "Une personne, une fois" },
        { k: "2", t: "Plusieurs fois, ou plusieurs personnes" },
      ],
    },
    {
      id: "e6",
      block: "Entourage",
      q: "Votre meilleur·e ami·e doit décrire votre couple en une phrase. Selon vous, ce serait laquelle ?",
      opts: [
        { k: "0", t: "« Ces deux-là sont vraiment bien ensemble. »" },
        { k: "1", t: "« Ça a l’air de bien marcher. »" },
        { k: "2", t: "« Ça monte et ça descend. »" },
        { k: "mal", t: "« Ces deux-là s’aiment, mais se font du mal. »" },
        {
          k: "plus-vu",
          t: "« Depuis ce couple, on ne se voit presque plus. »",
        },
        { k: "5", t: "« Je préfère ne rien dire. »" },
      ],
    },
    {
      id: "f2",
      block: "Argent",
      q: "Est-ce que l’un·e de vous doit justifier ses dépenses auprès de l’autre ?",
      opts: [
        { k: "0", t: "Non, chacun·e gère" },
        { k: "1", t: "Seulement les grosses dépenses communes" },
        { k: "2", t: "Oui, moi" },
        { k: "3", t: "Oui, {lui}" },
        { k: "4", t: "Oui, les deux, et ça crée des tensions" },
      ],
    },
    {
      id: "f3",
      block: "Argent",
      q: "Votre dernier achat de plus de 100 € pour vous-même : vous lui en avez parlé…",
      opts: [
        { k: "0", t: "Avant, pour l’informer" },
        { k: "1", t: "Avant, pour avoir son accord" },
        { k: "2", t: "Après, naturellement" },
        { k: "3", t: "Pas du tout, pour éviter une remarque" },
        { k: "4", t: "Pas du tout, ce n’était pas nécessaire" },
      ],
    },
    {
      id: "g1",
      block: "Besoins",
      q: "Un jour ordinaire, vous lui envoyez un message. Trois heures plus tard, toujours pas de réponse. Que faites-vous ?",
      hint: "Un message du quotidien, rien d’urgent. À votre connaissance, {il} n’avait rien de particulier ce jour-là.",
      opts: [
        { k: "0", t: "Rien de spécial, j’attends" },
        { k: "1", t: "Je renvoie un message" },
        { k: "2", t: "J’envoie plusieurs messages" },
        { k: "3", t: "J’appelle" },
        {
          k: "4",
          t: "Je regarde où {il} se trouve, ou quand {il} s’est connecté{e}",
        },
        { k: "5", t: "Je contacte un·e de ses proches" },
      ],
    },
    {
      id: "s4",
      type: "tf",
      block: "Besoins",
      q: "Vous êtes-vous déjà énervé·e pour une chose sans importance ?",
      opts: [
        { k: "oui", t: "Oui, déjà" },
        { k: "non", t: "Non, jamais", lie: true },
      ],
    },
    {
      id: "g2",
      block: "Besoins",
      q: "Après votre dernier week-end très proche à deux, vous aviez surtout envie…",
      opts: [
        { k: "0", t: "De prolonger, et j’ai eu du mal à {le} laisser partir" },
        { k: "1", t: "De retrouver mon espace, et je l’ai pris" },
        { k: "2", t: "De retrouver mon espace, sans oser le dire" },
        { k: "3", t: "Pas d’envie particulière" },
      ],
    },
    {
      id: "g3",
      type: "grid",
      block: "Besoins",
      q: "La dernière fois que votre partenaire vous a montré qu’{il} tient à vous, c’était quand ?",
      hint: "Les mots ne sont qu’une façon de le montrer. Les actes comptent aussi : une attention, du soutien, un moment où vous avez pu compter sur {lui}.",
      rows: [
        {
          label: "Par des mots : « je t’aime » ou l’équivalent",
          opts: [
            { k: "0", t: "Aujourd’hui ou hier" },
            { k: "1", t: "Cette semaine" },
            { k: "2", t: "Ce mois-ci" },
            { k: "3", t: "Je ne m’en souviens pas" },
            { k: "4", t: "On ne se dit pas ces choses-là" },
          ],
        },
        { label: "Par des actes" },
      ],
      opts: [
        { k: "0", t: "Aujourd’hui ou hier" },
        { k: "1", t: "Cette semaine" },
        { k: "2", t: "Ce mois-ci" },
        { k: "3", t: "Je ne m’en souviens pas" },
      ],
    },
    {
      id: "g4",
      block: "Besoins",
      q: "La dernière fois que vous avez exprimé un besoin (plus de temps, de tendresse, d’espace), que s’est-il passé ?",
      opts: [
        { k: "0", t: "{Il} a changé quelque chose" },
        { k: "1", t: "On en a parlé, sans grand changement" },
        { k: "2", t: "{Il} l’a pris comme un reproche" },
        { k: "3", t: "{Il} s’en est moqué{e} ou l’a minimisé" },
        { k: "4", t: "Je ne l’ai jamais vraiment exprimé" },
      ],
    },
    {
      id: "g5",
      type: "rank",
      block: "Besoins",
      q: "Classez ces besoins, du plus vital au moins vital.",
      hint: "Touchez-les dans l’ordre. Touchez à nouveau pour en retirer un.",
      items: [
        {
          k: "securite",
          n: "Sécurité",
          sub: "Savoir que l’autre reste",
          d: "Les silences et l’imprévisibilité vous coûtent plus qu’à d’autres. Vous avez besoin de régularité pour vous sentir bien.",
        },
        {
          k: "liberte",
          n: "Liberté",
          sub: "Garder une vie à soi",
          d: "Un couple qui demande des comptes vous éteint, même avec de bonnes intentions. Vous avez besoin d’air.",
        },
        {
          k: "admiration",
          n: "Admiration",
          sub: "Être fier·e l’un·e de l’autre",
          d: "Le mépris, même léger, vous atteint vite. Vous avez besoin de sentir que l’autre vous estime.",
        },
        {
          k: "tendresse",
          n: "Tendresse",
          sub: "Gestes, contact, attention",
          d: "Les mots seuls vous rassurent peu. Vous avez besoin de gestes et d’attention concrète.",
        },
        {
          k: "complicite",
          n: "Complicité",
          sub: "Rire et faire équipe",
          d: "Un couple réduit à la logistique vous pèse. Vous avez besoin de jeu, d’humour et de projets partagés.",
        },
        {
          k: "stabilite",
          n: "Stabilité",
          sub: "Un cadre, des projets, de l’argent qui tient",
          d: "Le flou sur l’avenir vous inquiète plus que les disputes. Vous avez besoin de savoir où vous allez.",
        },
      ],
    },
  ];

  /* @@CEV-ENGINE : règles (fonctions pures, partagées avec l’atelier) */
  const PR = {
    il: { il: "il", Il: "Il", lui: "lui", Lui: "Lui", le: "le", e: "" },
    elle: {
      il: "elle",
      Il: "Elle",
      lui: "elle",
      Lui: "Elle",
      le: "la",
      e: "e",
    },
    n: {
      il: "iel",
      Il: "Iel",
      lui: "ellui",
      Lui: "Ellui",
      le: "le·la",
      e: "·e",
    },
  };
  function fr(s) {
    return String(s)
      .replace(/« /g, "« ")
      .replace(/ »/g, " »")
      .replace(/ ([?!;:])/g, " $1")
      .replace(/ €/g, " €");
  }
  function fmt(s, pron) {
    const m = PR[pron] || PR.n;
    return fr(
      String(s).replace(/\{(il|Il|lui|Lui|le|e)\}/g, function (_, k) {
        return m[k];
      }),
    );
  }
  /* Donne une clé stable à chaque option qui n’en a pas (sa position d’origine). */
  function keyify(list) {
    list.forEach(function (q) {
      (q.opts || []).forEach(function (op, i) {
        if (op.k == null) op.k = String(i);
      });
      (q.rows || []).forEach(function (r) {
        (r.opts || []).forEach(function (op, i) {
          if (op.k == null) op.k = String(i);
        });
      });
      (q.items || []).forEach(function (it, i) {
        if (it.k == null) it.k = String(i);
      });
    });
    return list;
  }
  keyify(Q);

  /* Une question qui dépend de la présence d’un ex est sautée quand a1 se termine sur « Je n’ai pas d’ex ». */
  function applies(q, A) {
    if (q.needs === "ex") {
      const a = A.a1;
      return !(Array.isArray(a) && a[0] === null);
    }
    return true;
  }
  /* Une question passée vaut « "skip" » : elle compte comme faite pour avancer, mais n’entre pas dans le bilan. */
  function isSkipped(q, A) {
    return A[q.id] === "skip";
  }
  function isDone(q, A) {
    return !!q.off || !applies(q, A) || isAnswered(q, A) || isSkipped(q, A);
  }
  /* Réponses d’une ligne de grille, sous forme de liste (un ancien choix unique reste lisible). */
  function cellSel(v) {
    return Array.isArray(v) ? v : Number.isInteger(v) ? [v] : [];
  }
  /* Coche ou décoche une option dans une ligne à choix multiple ; une option « ex » est exclusive. */
  function cellToggle(opts, v, i) {
    let cur = cellSel(v).slice();
    if (opts[i].ex) return cur.indexOf(i) >= 0 ? [] : [i];
    cur = cur.filter(function (x) {
      return !opts[x].ex;
    });
    return cur.indexOf(i) >= 0
      ? cur.filter(function (x) {
          return x !== i;
        })
      : cur.concat(i);
  }
  function isAnswered(q, A) {
    const a = A[q.id];
    if (a == null) return false;
    if (q.type === "multi")
      return (
        Array.isArray(a) &&
        a.length > 0 &&
        a.every(function (i) {
          return !!q.opts[i];
        })
      );
    if (q.type === "grid" && q.layout === "steps")
      return (
        Array.isArray(a) &&
        a.length === q.rows.length &&
        a.every(function (x, i) {
          if (x === null)
            return a.slice(i).every(function (y) {
              return y === null;
            });
          return (
            Array.isArray(x) &&
            x.every(function (j) {
              return !!q.opts[j];
            })
          );
        })
      );
    if (q.type === "grid" && q.multi)
      return (
        Array.isArray(a) &&
        q.rows.every(function (r, i) {
          const v = cellSel(a[i]);
          return (
            v.length > 0 &&
            v.every(function (j) {
              return !!(r.opts || q.opts)[j];
            })
          );
        })
      );
    if (q.type === "grid")
      return (
        Array.isArray(a) &&
        q.rows.every(function (r, i) {
          return Number.isInteger(a[i]) && !!(r.opts || q.opts)[a[i]];
        })
      );
    if (q.type === "rank")
      return Array.isArray(a) && a.length === q.items.length;
    return Number.isInteger(a) && a >= 0 && a < q.opts.length;
  }

  /* Accès aux réponses par clé d’option, quel que soit l’ordre des options. */
  function ctx(Q, A) {
    const by = {};
    Q.forEach(function (q) {
      by[q.id] = q;
    });
    function ok(id) {
      return (
        !!by[id] && !by[id].off && applies(by[id], A) && isAnswered(by[id], A)
      );
    }
    function one(id) {
      return ok(id) && by[id].opts ? by[id].opts[A[id]] : null;
    }
    return {
      q: function (id) {
        return by[id];
      },
      raw: function (id) {
        return A[id];
      },
      ok: ok,
      one: one,
      is: function (id) {
        const x = one(id),
          ks = [].slice.call(arguments, 1);
        return !!x && ks.indexOf(x.k) >= 0;
      },
      has: function (id, k) {
        return (
          ok(id) &&
          A[id].some(function (i) {
            return by[id].opts[i] && by[id].opts[i].k === k;
          })
        );
      },
      lie: function (id) {
        const x = one(id);
        return !!(x && x.lie);
      },
    };
  }

  /* Ex décrits (étapes avec au moins un mot) et ton de chaque ex : D dur, N nuancé (dur et bienveillant), B bienveillant, 0 neutre. */
  function exRows(q, a) {
    return (Array.isArray(a) ? a : [])
      .filter(function (x) {
        return Array.isArray(x) && x.length;
      })
      .map(function (x) {
        return x
          .map(function (i) {
            return q.opts[i];
          })
          .filter(Boolean);
      });
  }
  function exTone(ops) {
    const h = ops.some(function (o) {
        return o.harsh;
      }),
      p = ops.some(function (o) {
        return o.pos;
      });
    return h && p ? "N" : h ? "D" : p ? "B" : "0";
  }
  function exHarsh(ops) {
    return ops.some(function (o) {
      return o.harsh;
    });
  }
  function a1AllNeg(C) {
    if (!C.ok("a1")) return false;
    return exRows(C.q("a1"), C.raw("a1")).filter(exHarsh).length >= 2;
  }

  /* Contradictions entre deux réponses, signalées dans « Un mot sur vos réponses ». */
  const COH = [
    {
      id: "tel-code",
      refs: ["b1", "b2"],
      desc: "b1 « Jamais » et b2 « vu taper » ou « deviné ou cherché ».",
      test: function (C) {
        return C.is("b1", "jamais") && C.is("b2", "vu", "cherche");
      },
    },
    {
      id: "jalousie",
      refs: ["s1", "b1", "g1"],
      desc: "s1 « Non, jamais » et, en b1 ou g1, une réponse qui montre une vérification.",
      test: function (C) {
        return (
          C.lie("s1") &&
          (C.is("b1", "1", "2", "3", "4") || C.is("g1", "4", "5"))
        );
      },
    },
    {
      id: "blessant",
      refs: ["s2", "c5"],
      desc: "s2 « Non, jamais » et « Une insulte » cochée en c5.",
      test: function (C) {
        return C.lie("s2") && C.has("c5", "insulte");
      },
    },
    {
      id: "amis",
      refs: ["e4", "e6"],
      desc: "e4 « Tou·tes » ou « La plupart » et e6 « se font du mal » ou « on ne se voit presque plus ».",
      test: function (C) {
        return C.is("e4", "tous", "plupart") && C.is("e6", "mal", "plus-vu");
      },
    },
    {
      id: "sujets",
      refs: ["d1", "d4"],
      desc: "d1 « Aucun » et, en d4, « Deux à quatre fois » ou plus.",
      test: function (C) {
        return C.is("d1", "aucun") && C.is("d4", "2", "3");
      },
    },
    {
      id: "ex",
      refs: ["a2", "a1"],
      desc: "a2 « Je ne saurais pas dire » et au moins deux ex décrit·es avec un mot dur.",
      test: function (C) {
        return C.is("a2", "nsp") && a1AllNeg(C);
      },
    },
  ];

  /* @@READING : nouveau bilan sans note (s’appuie sur le moteur : isAnswered, ctx, fmt, fr, COH, a1AllNeg, AXK). */
  function txGet(TX, OV, id) {
    const e = TX.find(function (x) {
      return x.id === id;
    });
    if (!e) return null;
    const o = (OV && OV[id]) || {};
    const r = {};
    for (const k in e) r[k] = e[k];
    ["t", "ask", "fam", "name", "ax"].forEach(function (k) {
      if (o[k] != null) r[k] = o[k];
    });
    return r;
  }
  function txFires(e, data, A, C, extra) {
    const by = {};
    data.forEach(function (q) {
      by[q.id] = q;
    });
    const q = e.q ? by[e.q] : null;
    if (e.q && (!q || q.off || !applies(q, A) || !isAnswered(q, A)))
      return null;
    if (e.kind === "sig" || e.kind === "pos") {
      const a = A[e.q];
      if (q.type === "multi")
        return a.some(function (i) {
          return q.opts[i] && e.when.indexOf(q.opts[i].k) >= 0;
        })
          ? {}
          : null;
      if (q.type === "grid") {
        const rows =
          e.row != null
            ? [e.row]
            : q.rows.map(function (_, i) {
                return i;
              });
        return rows.some(function (ri) {
          const v = a[ri];
          if (Array.isArray(v))
            return v.some(function (i) {
              return q.opts[i] && e.when.indexOf(q.opts[i].k) >= 0;
            });
          const op = (q.rows[ri].opts || q.opts)[v];
          return op && e.when.indexOf(op.k) >= 0;
        })
          ? {}
          : null;
      }
      const op = q.opts[a];
      return op && e.when.indexOf(op.k) >= 0 ? {} : null;
    }
    if (e.kind === "rule") {
      if (e.rule === "a1-neg") return a1AllNeg(C) ? {} : null;
      if (e.rule === "a1-pos" || e.rule === "a1-nuance") {
        const want = e.rule === "a1-pos" ? "B" : "N";
        return exRows(q, A[e.q]).some(function (ops) {
          return exTone(ops) === want;
        })
          ? {}
          : null;
      }
      if (e.rule === "c1-same") {
        const a = A.c1,
          y = cellSel(a[1]);
        const same = cellSel(a[0]).filter(function (i) {
          return y.indexOf(i) >= 0 && q.opts[i] && q.opts[i].k !== "oubli";
        });
        if (!same.length) return null;
        const t = same.map(function (i) {
          return q.opts[i].t.toLowerCase();
        });
        return {
          sujet:
            (t.length > 1 ? "les mêmes sujets : " : "le même sujet : ") +
            t.slice(0, -1).join(", ") +
            (t.length > 1 ? " et " : "") +
            t[t.length - 1],
        };
      }
      if (e.rule === "combo") {
        const a = A[e.q];
        return e.combo.every(function (c) {
          const op = (q.rows[c[0]].opts || q.opts)[a[c[0]]];
          return op && c[1].indexOf(op.k) >= 0;
        })
          ? {}
          : null;
      }
      if (e.rule === "lies") return extra.lies >= 2 ? { n: extra.lies } : null;
      if (e.rule === "honest")
        return extra.lies <= 1 && extra.tfa >= 3 ? {} : null;
    }
    if (e.kind === "coh") {
      const r = COH.find(function (x) {
        return x.id === e.coh;
      });
      return r && r.test(C) ? {} : null;
    }
    return null;
  }
  function reading(data, A, pron, TX, OV) {
    const C = ctx(data, A);
    const tf = data.filter(function (q) {
      return q.type === "tf" && !q.off && isAnswered(q, A);
    });
    const extra = {
      tfa: tf.length,
      lies: tf.filter(function (q) {
        return q.opts[A[q.id]].lie;
      }).length,
    };
    const pos = {};
    data.forEach(function (q, i) {
      pos[q.id] = i;
    });
    const out = { u: [], c: [], p: [], m: [], coh: [], themes: {}, fired: [] };
    AXK.forEach(function (k) {
      out.themes[k] = { n: 0, u: 0, c: 0, p: 0 };
    });
    const items = [];
    TX.forEach(function (e0, order) {
      if (["sig", "pos", "rule", "coh"].indexOf(e0.kind) < 0) return;
      const e = txGet(TX, OV, e0.id);
      const hit = txFires(e, data, A, C, extra);
      if (!hit) return;
      let t = fmt(e.t, pron),
        ask = e.ask ? fmt(e.ask, pron) : "";
      if (hit.sujet) {
        t = t.replace("{sujet}", hit.sujet);
      }
      if (hit.n != null) {
        t = t.replace("{n}", String(hit.n));
      }
      items.push({
        id: e.id,
        fam: e.fam,
        ax: e.ax,
        q: e.q,
        t: t,
        ask: ask,
        kind: e.kind,
        o: (e.q && pos[e.q] != null ? pos[e.q] : 999) * 1000 + order,
      });
    });
    items.sort(function (a, b) {
      return a.o - b.o;
    });
    items.forEach(function (it) {
      out.fired.push(it.id);
      if (it.kind === "coh") {
        out.coh.push(it);
        return;
      }
      if (it.fam === "u" || it.fam === "c" || it.fam === "p") {
        out[it.fam].push(it);
        if (it.ax && out.themes[it.ax]) {
          out.themes[it.ax][it.fam]++;
          if (it.fam !== "p") out.themes[it.ax].n++;
        }
      } else out.m.push(it);
    });
    return out;
  }
  /* @@READING-END */

  /* @@CEV-END */
  /* @@TX : textes du bilan (relus dans l’atelier) */
  const TX = [
    { id: "head:title", kind: "head", t: "Ce que vos réponses racontent" },
    {
      id: "head:intro",
      kind: "head",
      t: "Ce questionnaire ne connaît ni votre histoire ni votre façon d’aimer. Il relève des réponses qui, dans beaucoup de couples, méritent qu’on s’y arrête. Certaines ne vous concerneront pas. Ce n’est pas un diagnostic, seulement des pistes pour prendre un peu de recul.",
    },
    { id: "head:calm", kind: "head", t: "Rien de relevé" },
    { id: "head:look", kind: "head", t: "À regarder" },
    { id: "head:good", kind: "head", t: "Points positifs" },
    {
      id: "head:u",
      kind: "head",
      name: "Peut blesser",
      t: "Ces points méritent votre attention, quelle que soit la façon dont vous vivez votre couple.",
    },
    {
      id: "head:c",
      kind: "head",
      t: "La plupart des points ci-dessous dépendent beaucoup de votre façon d’être en couple. Pour vous, ils ne veulent peut-être rien dire.",
    },
    { id: "head:p", kind: "head", name: "Ce qui semble vous convenir", t: "" },
    { id: "head:m", kind: "head", name: "Un mot sur vos réponses", t: "" },
    {
      id: "head:coh",
      kind: "head",
      t: "Deux de vos réponses ne racontent pas tout à fait la même histoire. Ce n’est pas forcément une erreur : on se voit rarement de façon parfaitement cohérente.",
      ask: "Laquelle des deux est la plus proche de la réalité ?",
    },
    {
      id: "head:none",
      kind: "head",
      t: "Aucun point à regarder ne ressort de vos réponses. Ça ne veut pas dire que tout est parfait, seulement que ce questionnaire n’a rien relevé de ce côté.",
    },
    {
      id: "head:end",
      kind: "head",
      t: "Ce questionnaire n’a vu qu’une petite partie de votre histoire. Si un point vous a fait réagir, c’est peut-être celui-là qui mérite une conversation, avec {lui}, avec un·e proche, ou avec vous-même.",
    },
    {
      id: "theme:ctrl",
      kind: "theme",
      ax: "ctrl",
      name: "Confiance et liberté",
      t: "Ce que chacun·e peut faire, voir ou garder pour soi sans rendre de comptes.",
    },
    {
      id: "theme:conf",
      kind: "theme",
      ax: "conf",
      name: "Les disputes",
      t: "Ce qui se passe pendant un désaccord, et après.",
    },
    {
      id: "theme:transp",
      kind: "theme",
      ax: "transp",
      name: "Ce qui se dit, ce qui se tait",
      t: "Les sujets évités, ce qu’on garde pour soi, ce qu’on filtre.",
    },
    {
      id: "theme:auto",
      kind: "theme",
      ax: "auto",
      name: "La vie à côté du couple",
      t: "Les ami·es, les sorties, les projets de chacun·e.",
    },
    {
      id: "theme:secu",
      kind: "theme",
      ax: "secu",
      name: "Se sentir en sécurité",
      t: "Ce que la relation apaise, ou ce qu’elle entretient comme inquiétude.",
    },
    {
      id: "theme:passe",
      kind: "theme",
      ax: "passe",
      name: "Les histoires passées",
      t: "Vos ex, vos ruptures, et ce qu’elles ont laissé.",
    },
    {
      kind: "rule",
      rule: "a1-neg",
      q: "a1",
      fam: "c",
      ax: "passe",
      t: "Vous décrivez plusieurs de vos ex avec des mots durs. C’est peut-être exactement ce que ces personnes étaient. Il arrive aussi qu’on retrouve d’une histoire à l’autre les mêmes difficultés, sans les voir venir.",
      ask: "Ces histoires ont-elles quelque chose en commun, en dehors de ces personnes ?",
      id: "a1.1",
    },
    {
      kind: "rule",
      rule: "a1-pos",
      q: "a1",
      fam: "p",
      ax: "passe",
      t: "Vous gardez un regard bienveillant sur au moins une histoire passée.",
      id: "a1.2",
    },
    {
      kind: "rule",
      rule: "a1-nuance",
      q: "a1",
      fam: "p",
      ax: "passe",
      t: "Vous reconnaissez des qualités même à un·e ex que vous décrivez durement.",
      id: "a1.3",
    },
    {
      kind: "sig",
      q: "a2",
      when: ["nsp"],
      fam: "c",
      ax: "passe",
      t: "Vous ne voyez pas ce que votre dernier·e ex pourrait vous reprocher. La rupture s’est peut-être faite sans reproches. Peut-être aussi que la question ne s’est jamais posée.",
      ask: "À votre avis, que répondrait votre dernier·e ex si on lui posait la question ?",
      id: "a2.1",
    },
    {
      kind: "sig",
      q: "a3",
      when: ["2", "3"],
      fam: "c",
      ax: "secu",
      t: "Vous avez rompu puis repris plusieurs fois. Pour certains couples, c’est un rythme qui convient : vies chargées, distance, relation libre. Pour d’autres, c’est un cycle qui use un peu plus à chaque fois.",
      ask: "Ces pauses, vous les décidez à deux, ou elles arrivent après une crise ?",
      id: "a3.1",
    },
    {
      kind: "sig",
      q: "a5",
      when: ["1", "3", "4", "5"],
      fam: "c",
      ax: "passe",
      t: "Une de vos ruptures passées a été rude. Ce genre de fin peut laisser des réflexes de méfiance ou d’alerte, qu’on retrouve parfois dans la relation suivante.",
      ask: "Reconnaissez-vous aujourd’hui certains réflexes de cette époque, chez vous ou chez votre partenaire ?",
      id: "a5.1",
    },
    {
      kind: "sig",
      q: "b1",
      when: ["2"],
      fam: "c",
      ax: "ctrl",
      t: "Ce mois-ci, vous avez regardé plusieurs fois son téléphone sans qu’{il} le sache. Ce geste répond souvent à une inquiétude difficile à formuler.",
      ask: "Qu’est-ce que vous cherchiez, et auriez-vous pu le lui demander ?",
      id: "b1.1",
    },
    {
      kind: "sig",
      q: "b1",
      when: ["3", "4"],
      fam: "u",
      ax: "ctrl",
      t: "Regarder son téléphone en cachette est devenu une habitude. Quel que soit l’accord entre vous, découvrir qu’on est surveillé·e en secret blesse presque toujours.",
      ask: "Que se passerait-il si vous lui disiez ce qui vous pousse à vérifier ?",
      id: "b1.2",
    },
    {
      kind: "sig",
      q: "b2",
      when: ["cherche"],
      fam: "c",
      ax: "ctrl",
      t: "Vous avez deviné ou cherché le code de son téléphone. Ça peut partir d’un jeu, d’une curiosité, ou d’un besoin de vérifier.",
      ask: "Est-ce qu’{il} sait que vous le connaissez ?",
      id: "b2.1",
    },
    {
      kind: "sig",
      q: "b7",
      when: ["lui-pression"],
      fam: "c",
      ax: "ctrl",
      t: "Vous partagez votre localisation parce que votre partenaire l’a demandé, sans vraiment en avoir envie. Certaines personnes s’y font, et ça devient pratique. D’autres acceptent surtout parce que refuser donnerait l’impression d’avoir quelque chose à cacher.",
      ask: "Si vous arrêtiez de partager votre localisation, comment {il} réagirait ?",
      id: "b7.1",
    },
    {
      kind: "sig",
      q: "b4",
      when: ["3", "4"],
      fam: "c",
      ax: "ctrl",
      t: "Pendant sa dernière soirée sans vous, vous lui avez envoyé plus de dix messages. Certains couples aiment rester en contact en permanence. Parfois, c’est surtout une façon de se rassurer.",
      ask: "Ces messages, vous les envoyez par envie, ou parce que le silence vous inquiète ?",
      row: 0,
      id: "b4.1",
    },
    {
      kind: "sig",
      q: "b4",
      when: ["3", "4"],
      fam: "c",
      ax: "ctrl",
      t: "Pendant votre dernière soirée sans {lui}, {il} vous a envoyé plus de dix messages. Ça peut être de la complicité, ou une façon de garder un œil sur vous.",
      ask: "Ces messages, vous les vivez plutôt comme une attention ou comme une surveillance ?",
      row: 1,
      id: "b4.2",
    },
    {
      kind: "sig",
      q: "b9",
      when: ["3"],
      fam: "c",
      ax: "ctrl",
      t: "La dernière fois que vous êtes rentré·e plus tard que prévu, ça s’est terminé en dispute. Un retard peut inquiéter ou agacer, surtout quand il n’était pas annoncé.",
      ask: "Qu’est-ce qui a vraiment déclenché la dispute : l’inquiétude, l’agacement, ou autre chose ?",
      id: "b9.1",
    },
    {
      kind: "sig",
      q: "b9",
      when: ["4"],
      fam: "u",
      ax: "ctrl",
      t: "Rentrer plus tard vous a obligé·e à dire où vous étiez et avec qui, preuves à l’appui. Avoir à prouver ses déplacements pèse sur la liberté de chacun·e, quel que soit le couple.",
      ask: "Vous arrive-t-il de changer vos sorties pour éviter ce moment ?",
      id: "b9.2",
    },
    {
      kind: "sig",
      q: "b9",
      when: ["5"],
      fam: "c",
      ax: "ctrl",
      t: "Vous prévenez toujours quand vous rentrez tard, pour éviter les problèmes. Prévenir peut être une simple attention. Le faire pour éviter une réaction, ce n’est pas tout à fait pareil.",
      ask: "Que se passerait-il si, une fois, vous ne préveniez pas ?",
      id: "b9.3",
    },
    {
      kind: "sig",
      q: "b6",
      when: ["2", "3"],
      fam: "c",
      ax: "auto",
      t: "Depuis le début de votre relation, vous avez pris vos distances avec plusieurs personnes pour {le} rassurer. S’éloigner d’un·e ex peut être un choix serein. Quand la liste s’allonge, on peut finir par se sentir seul·e.",
      ask: "Ces personnes, vous seriez-vous éloigné·e d’elles de toute façon ?",
      row: 0,
      id: "b6.1",
    },
    {
      kind: "sig",
      q: "b6",
      when: ["2", "3"],
      fam: "c",
      ax: "ctrl",
      t: "Votre partenaire a pris ses distances avec plusieurs personnes pour vous rassurer. C’est peut-être un choix de sa part. C’est peut-être aussi une demande de la vôtre, même implicite.",
      ask: "Est-ce que vous le lui avez demandé, même sans le dire ?",
      row: 1,
      id: "b6.2",
    },
    {
      kind: "rule",
      rule: "c1-same",
      q: "c1",
      fam: "c",
      ax: "conf",
      t: "Vos deux dernières disputes portaient sur {sujet}. Un sujet qui revient, c’est parfois simplement la vie à deux. C’est parfois aussi le signe qu’il n’a jamais vraiment été réglé.",
      ask: "Que faudrait-il pour que ce sujet soit réglé, pour vous et pour {lui} ?",
      id: "c1.1",
    },
    {
      kind: "sig",
      q: "c3",
      when: ["3"],
      fam: "c",
      ax: "conf",
      t: "Après votre dernière dispute, il a fallu trois jours ou plus pour que l’un·e revienne vers l’autre. Certaines personnes ont besoin de temps pour redescendre. Un long silence peut aussi être lourd à porter pour l’autre.",
      ask: "Pendant ces jours-là, saviez-vous chacun·e que l’autre reviendrait ?",
      id: "c3.1",
    },
    {
      kind: "sig",
      q: "c3",
      when: ["4"],
      fam: "c",
      ax: "transp",
      t: "Vous n’avez jamais reparlé de votre dernière dispute. Certains couples tournent la page sans revenir dessus, et ça leur convient. Parfois, ce qui n’a pas été dit ressort ailleurs.",
      ask: "Reste-t-il quelque chose de cette dispute que vous auriez aimé dire ?",
      id: "c3.2",
    },
    {
      kind: "pos",
      q: "c3",
      when: ["0", "1"],
      fam: "p",
      ax: "conf",
      t: "Après une dispute, vous revenez l’un·e vers l’autre dans la journée.",
      id: "c3.3",
    },
    {
      kind: "sig",
      q: "c4",
      when: ["1"],
      fam: "c",
      ax: "secu",
      t: "Sur vos trois dernières disputes, c’est vous qui avez fait le premier pas à chaque fois. C’est peut-être votre tempérament. À la longue, ça peut aussi devenir lourd.",
      ask: "Si vous ne faisiez pas le premier pas, que se passerait-il ?",
      id: "c4.1",
    },
    {
      kind: "sig",
      q: "c5",
      when: ["insulte"],
      fam: "u",
      ax: "conf",
      t: "Des insultes ont été lancées pendant une dispute cette année. Dans le feu d’une dispute, les mots dépassent parfois la pensée, mais ils restent.",
      ask: "Après coup, avez-vous pu en reparler à deux ?",
      id: "c5.1",
    },
    {
      kind: "sig",
      q: "c5",
      when: ["5"],
      fam: "c",
      ax: "conf",
      t: "L’un·e de vous a bloqué l’autre pendant une dispute. Couper le contact peut servir à souffler un moment, ou à punir.",
      ask: "Ce blocage, il servait à prendre l’air ou à faire réagir l’autre ?",
      id: "c5.2",
    },
    {
      kind: "sig",
      q: "c5",
      when: ["objet"],
      fam: "u",
      ax: "conf",
      t: "Un objet a été cassé ou lancé pendant une dispute cette année. Même quand il ne vise personne, ce geste peut faire peur et changer la façon dont on se dispute ensuite.",
      ask: "Depuis, vous sentez-vous en sécurité quand le ton monte ?",
      id: "c5.3",
    },
    {
      kind: "sig",
      q: "c5",
      when: ["retenir"],
      fam: "u",
      ax: "conf",
      t: "L’un·e de vous a déjà empêché l’autre de quitter la pièce pendant une dispute. Pouvoir partir quand on en a besoin fait partie de ce qui permet de se sentir en sécurité, quel que soit le couple.",
      ask: "Si vous aviez besoin de partir pendant une dispute, vous sentiriez-vous libre de le faire ?",
      id: "c5.4",
    },
    {
      kind: "pos",
      q: "c5",
      when: ["rien"],
      fam: "p",
      ax: "conf",
      t: "Cette année, vos disputes sont restées sans éclats : ni cris, ni portes qui claquent, ni insultes.",
      id: "c5.5",
    },
    {
      kind: "sig",
      q: "c6",
      when: ["2"],
      fam: "c",
      ax: "conf",
      t: "La dernière fois qu’on vous a fait un reproche, vous avez répondu par un autre reproche. C’est un réflexe très courant, qui transforme vite une remarque en dispute.",
      ask: "Que se passerait-il si vous commenciez par « explique-moi » ?",
      row: 0,
      id: "c6.1",
    },
    {
      kind: "sig",
      q: "c6",
      when: ["3"],
      fam: "c",
      ax: "conf",
      t: "La dernière fois qu’on vous a fait un reproche, votre première réponse a été « tu exagères ». C’est parfois vrai. Quand c’est fréquent, l’autre peut finir par ne plus rien dire.",
      ask: "La dernière fois, est-ce qu’{il} exagérait vraiment ?",
      row: 0,
      id: "c6.2",
    },
    {
      kind: "sig",
      q: "c6",
      when: ["2"],
      fam: "c",
      ax: "conf",
      t: "La dernière fois que vous lui avez fait un reproche, {il} a répondu par un autre reproche. Ça arrive à tout le monde. Quand ça devient la règle, il devient difficile de dire ce qui ne va pas.",
      ask: "Arrivez-vous encore à lui dire ce qui vous gêne ?",
      row: 1,
      id: "c6.3",
    },
    {
      kind: "sig",
      q: "c6",
      when: ["3"],
      fam: "c",
      ax: "secu",
      t: "La dernière fois que vous lui avez fait un reproche, {il} a répondu « tu exagères ». C’est parfois vrai. Si c’est fréquent, on peut finir par douter de ce qu’on ressent.",
      ask: "Vous arrive-t-il de vous demander si vous avez le droit d’être blessé·e ?",
      row: 1,
      id: "c6.4",
    },
    {
      kind: "pos",
      q: "c6",
      when: ["0"],
      fam: "p",
      ax: "conf",
      t: "Face à un reproche, votre premier réflexe est de chercher à comprendre.",
      row: 0,
      id: "c6.5",
    },
    {
      kind: "pos",
      q: "c6",
      when: ["0"],
      fam: "p",
      ax: "conf",
      t: "Face à un reproche, votre partenaire commence par vous écouter.",
      row: 1,
      id: "c6.6",
    },
    {
      kind: "sig",
      q: "c8",
      when: ["2"],
      fam: "c",
      ax: "secu",
      t: "L’un·e de vous a menacé plusieurs fois de rompre sans le penser. Dans une dispute, c’est parfois une façon de dire « là, c’est trop ». Répétée, la menace peut fragiliser le lien.",
      ask: "Quand cette menace tombe, que cherche vraiment à dire la personne qui la prononce ?",
      id: "c8.1",
    },
    {
      kind: "sig",
      q: "c8",
      when: ["3"],
      fam: "u",
      ax: "secu",
      t: "Les menaces de rupture font partie de vos disputes, au point que vous ne les comptez plus. Vivre sous une menace répétée use la confiance, même quand personne n’y croit vraiment.",
      ask: "Qu’est-ce qui changerait si ces menaces disparaissaient de vos disputes ?",
      id: "c8.2",
    },
    {
      kind: "pos",
      q: "c8",
      when: ["0"],
      fam: "p",
      ax: "secu",
      t: "Aucun·e de vous ne menace de rompre pendant les disputes.",
      id: "c8.3",
    },
    {
      kind: "sig",
      q: "c9",
      when: ["2", "3"],
      fam: "c",
      ax: "conf",
      t: "Il est arrivé que l’un·e de vous cesse de parler à l’autre plus d’une journée, pour lui faire comprendre quelque chose. Prendre du recul n’a rien d’anormal. Se servir du silence pour faire passer un message peut être vécu comme une punition.",
      ask: "La personne qui se tait, qu’aimerait-elle que l’autre comprenne ?",
      id: "c9.1",
    },
    {
      kind: "sig",
      q: "d1",
      when: ["2", "3"],
      fam: "c",
      ax: "transp",
      t: "Vous évitez plusieurs sujets parce qu’ils finissent en dispute. Tout couple a ses sujets sensibles. Quand ils se multiplient, on peut avoir l’impression de marcher sur des œufs.",
      ask: "Lequel de ces sujets aimeriez-vous pouvoir aborder sans crainte ?",
      id: "d1.1",
    },
    {
      kind: "pos",
      q: "d1",
      when: ["aucun"],
      fam: "p",
      ax: "transp",
      t: "Vous n’évitez aucun sujet de peur qu’il finisse en dispute.",
      id: "d1.2",
    },
    {
      kind: "sig",
      q: "d2",
      when: ["2"],
      fam: "c",
      ax: "transp",
      t: "Votre téléphone contient quelque chose que votre partenaire ne doit pas voir. Chacun a droit à son jardin secret. Tout dépend de ce que ce secret change pour {lui}.",
      ask: "Si votre partenaire le découvrait, qu’est-ce que ça changerait entre vous ?",
      id: "d2.1",
    },
    {
      kind: "sig",
      q: "d3",
      when: ["3"],
      fam: "c",
      ax: "transp",
      t: "Si votre partenaire lisait ce que vous écrivez à vos ami·es à son sujet, {il} serait blessé{e}. Se confier fait du bien, et on y dit des choses qu’on ne dirait pas en face. C’est parfois aussi là que va ce qu’on n’ose pas lui dire.",
      ask: "Dans ces messages, qu’est-ce que vous pourriez lui dire directement ?",
      id: "d3.1",
    },
    {
      kind: "sig",
      q: "d4",
      when: ["2"],
      fam: "c",
      ax: "transp",
      t: "Ce mois-ci, vous avez gardé pour vous des détails banals à plusieurs reprises, pour éviter sa réaction. Tout le monde trie un peu ce qu’il raconte. Le faire par crainte de la réaction de l’autre mérite qu’on s’y arrête.",
      ask: "Concrètement, qu’est-ce que vous redoutez quand vous taisez ces détails ?",
      id: "d4.1",
    },
    {
      kind: "sig",
      q: "d4",
      when: ["3"],
      fam: "u",
      ax: "transp",
      t: "Vous filtrez souvent votre quotidien pour éviter ses réactions. Quand on surveille chaque mot pour ne pas déclencher l’autre, on finit souvent par s’effacer, quel que soit le couple.",
      ask: "Depuis quand faites-vous attention à ce point à ce que vous racontez ?",
      id: "d4.2",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "e1",
      fam: "c",
      ax: "auto",
      combo: [
        [0, ["aucune"]],
        [1, ["aucune"]],
      ],
      t: "Ce mois-ci, aucun·e de vous n’a passé de soirée sans l’autre. Certains couples aiment tout faire ensemble, d’autres vivent à distance ou traversent une période chargée.",
      ask: "Est-ce un choix qui vous convient à vous deux, ou une habitude qui s’est installée ?",
      id: "e1.1",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "e1",
      fam: "c",
      ax: "auto",
      combo: [
        [0, ["aucune"]],
        [1, ["2", "3"]],
      ],
      t: "Ce mois-ci, {il} a passé plusieurs soirées sans vous, et vous aucune sans {lui}. Ça peut tenir à vos envies, ou à vos emplois du temps.",
      ask: "En avez-vous envie, et est-ce que vous vous l’autorisez ?",
      id: "e1.2",
    },
    {
      kind: "pos",
      q: "e1",
      when: ["2", "3"],
      fam: "p",
      ax: "auto",
      t: "Vous gardez des soirées à vous.",
      row: 0,
      id: "e1.3",
    },
    {
      kind: "pos",
      q: "e1",
      when: ["2", "3"],
      fam: "p",
      ax: "auto",
      t: "{Il} garde des soirées à {lui}.",
      row: 1,
      id: "e1.4",
    },
    {
      kind: "sig",
      q: "e3",
      when: ["2"],
      fam: "c",
      ax: "auto",
      t: "Cette année, vous avez annulé plusieurs plans parce que votre partenaire n’était pas à l’aise. Tenir compte de l’autre fait partie de la vie à deux. Quand ça se répète, on peut finir par ne plus rien proposer.",
      ask: "Ces plans, vous les avez annulés par choix, ou pour éviter une tension ?",
      id: "e3.1",
    },
    {
      kind: "sig",
      q: "e3",
      when: ["3"],
      fam: "u",
      ax: "auto",
      t: "Vous avez annulé de nombreux plans cette année parce que votre partenaire n’était pas à l’aise. Quand ses envies passent souvent après l’accord de l’autre, la vie hors du couple rétrécit sans qu’on s’en rende compte.",
      ask: "Quel est le dernier projet que vous avez maintenu malgré son désaccord ?",
      id: "e3.2",
    },
    {
      kind: "pos",
      q: "e3",
      when: ["0"],
      fam: "p",
      ax: "auto",
      t: "Cette année, vous n’avez annulé aucun plan pour ménager votre partenaire.",
      id: "e3.3",
    },
    {
      kind: "sig",
      q: "e4",
      when: ["3"],
      fam: "c",
      ax: "auto",
      t: "Aucun·e de vos ami·es proches n’apprécie votre partenaire. Vos ami·es ne voient pas tout de votre relation, et les affinités ne se commandent pas. Quand tout un entourage partage la même réserve, elle mérite quand même d’être écoutée.",
      ask: "D’après vous, qu’est-ce que votre entourage voit et que vous ne voyez pas ?",
      id: "e4.1",
    },
    {
      kind: "pos",
      q: "e4",
      when: ["tous", "plupart"],
      fam: "p",
      ax: "auto",
      t: "Vos ami·es apprécient votre partenaire.",
      id: "e4.2",
    },
    {
      kind: "sig",
      q: "e5",
      when: ["2"],
      fam: "c",
      ax: "auto",
      t: "Plusieurs proches vous ont dit s’inquiéter pour vous dans cette relation. Parfois, l’entourage s’inquiète simplement parce que votre couple ne ressemble pas au sien. Parfois, il voit ce qu’on ne voit pas de l’intérieur.",
      ask: "Qu’est-ce qui les inquiète exactement, et est-ce que ça vous parle ?",
      id: "e5.1",
    },
    {
      kind: "sig",
      q: "e6",
      when: ["mal"],
      fam: "c",
      ax: "conf",
      t: "Votre meilleur·e ami·e dirait que vous vous aimez, mais que vous vous faites du mal. Un regard extérieur n’a pas toutes les clés, mais il remarque souvent ce qui se répète.",
      ask: "Sur quoi votre ami·e s’appuierait pour dire ça ?",
      id: "e6.1",
    },
    {
      kind: "sig",
      q: "e6",
      when: ["plus-vu"],
      fam: "c",
      ax: "auto",
      t: "Votre meilleur·e ami·e dirait que vous ne vous voyez presque plus depuis le début de cette relation. Une relation prend souvent beaucoup de place, surtout au début. Avec le temps, s’éloigner de ses ami·es peut laisser seul·e le jour où on en a besoin.",
      ask: "Qu’est-ce qui vous empêche de vous voir plus souvent ?",
      id: "e6.2",
    },
    {
      kind: "sig",
      q: "e6",
      when: ["5"],
      fam: "c",
      ax: "auto",
      t: "Votre meilleur·e ami·e préférerait ne rien dire de votre couple. C’est peut-être de la discrétion. C’est peut-être aussi une réserve que votre ami·e n’ose pas exprimer.",
      ask: "Et si vous lui posiez vraiment la question ?",
      id: "e6.3",
    },
    {
      kind: "sig",
      q: "f2",
      when: ["2"],
      fam: "u",
      ax: "ctrl",
      t: "Vous devez justifier vos dépenses auprès de votre partenaire. Certains couples tiennent un budget serré ensemble, d’un commun accord. Quand l’obligation ne va que dans un sens, l’argent peut devenir un moyen de contrôle.",
      ask: "Cette règle, l’avez-vous choisie ensemble, et pourriez-vous la remettre en question ?",
      id: "f2.1",
    },
    {
      kind: "sig",
      q: "f2",
      when: ["3"],
      fam: "u",
      ax: "ctrl",
      t: "Votre partenaire doit justifier ses dépenses auprès de vous. C’est peut-être un accord entre vous. Quand l’obligation ne va que dans un sens, l’argent peut devenir un moyen de contrôle, même sans le vouloir.",
      ask: "Comment pensez-vous qu’{il} vit cette règle ?",
      id: "f2.2",
    },
    {
      kind: "sig",
      q: "f2",
      when: ["4"],
      fam: "c",
      ax: "conf",
      t: "Vous devez chacun·e justifier vos dépenses, et ça crée des tensions. L’argent est l’un des sujets de dispute les plus courants, quel que soit le couple.",
      ask: "Qu’est-ce qui rendrait ce sujet moins pesant pour vous deux ?",
      id: "f2.3",
    },
    {
      kind: "pos",
      q: "f2",
      when: ["1"],
      fam: "p",
      ax: "ctrl",
      t: "Vous vous consultez pour les grosses dépenses communes, et chacun·e garde la main sur le reste.",
      id: "f2.4",
    },
    {
      kind: "sig",
      q: "f3",
      when: ["1"],
      fam: "c",
      ax: "auto",
      t: "Pour votre dernier achat personnel, vous avez demandé son accord avant. C’est peut-être une habitude de couple qui décide de tout ensemble.",
      ask: "Et si la réponse avait été non ?",
      id: "f3.1",
    },
    {
      kind: "sig",
      q: "f3",
      when: ["3"],
      fam: "c",
      ax: "transp",
      t: "Vous n’avez pas parlé de votre dernier achat, pour éviter une remarque.",
      ask: "Qu’auriez-vous craint qu’{il} dise ?",
      id: "f3.2",
    },
    {
      kind: "sig",
      q: "g1",
      when: ["4"],
      fam: "c",
      ax: "secu",
      t: "Quand un message banal reste trois heures sans réponse, votre réflexe est de regarder où {il} est ou quand {il} s’est connecté{e}. C’est souvent une façon de calmer une inquiétude.",
      ask: "Qu’est-ce qui vous inquiète, quand {il} ne répond pas ?",
      id: "g1.1",
    },
    {
      kind: "sig",
      q: "g1",
      when: ["5"],
      fam: "c",
      ax: "secu",
      t: "Quand un message banal reste trois heures sans réponse, vous contactez un·e de ses proches. Selon les circonstances, ça peut être raisonnable. Si c’est un réflexe, c’est peut-être que le silence vous inquiète beaucoup.",
      ask: "Cette inquiétude vient-elle de cette relation, ou vous suit-elle d’une histoire à l’autre ?",
      id: "g1.2",
    },
    {
      kind: "sig",
      q: "g2",
      when: ["2"],
      fam: "c",
      ax: "secu",
      t: "Après votre dernier week-end à deux, vous aviez envie de retrouver votre espace, sans oser le dire. Avoir besoin d’air n’enlève rien à l’attachement.",
      ask: "Qu’est-ce qui vous retient de le dire ?",
      id: "g2.1",
    },
    {
      kind: "pos",
      q: "g2",
      when: ["1"],
      fam: "p",
      ax: "secu",
      t: "Quand vous avez besoin d’espace, vous le prenez.",
      id: "g2.2",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "g3",
      fam: "p",
      ax: "secu",
      combo: [
        [0, ["0", "1"]],
        [1, ["0", "1"]],
      ],
      t: "Par des mots comme par des actes, {il} vous montre régulièrement qu’{il} tient à vous.",
      id: "g3.1",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "g3",
      fam: "p",
      ax: "secu",
      combo: [
        [0, ["2", "3", "4"]],
        [1, ["0", "1"]],
      ],
      t: "Les mots tendres sont plus rares entre vous, mais les actes sont là : {il} vous montre souvent qu’{il} tient à vous.",
      id: "g3.2",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "g3",
      fam: "c",
      ax: "secu",
      combo: [
        [0, ["0", "1"]],
        [1, ["3"]],
      ],
      t: "{Il} vous dit des mots tendres, mais aucun acte récent ne vous revient pour vous montrer qu’{il} tient à vous. Les mots rassurent, les actes aussi, et l’un ne remplace pas toujours l’autre.",
      ask: "Qu’est-ce qui vous aiderait à sentir que vous pouvez compter sur {lui} ?",
      id: "g3.3",
    },
    {
      kind: "rule",
      rule: "combo",
      q: "g3",
      fam: "c",
      ax: "secu",
      combo: [
        [0, ["3", "4"]],
        [1, ["3"]],
      ],
      t: "Vous ne vous souvenez ni d’un mot tendre ni d’un acte récent qui vous ait montré qu’{il} tient à vous. Il y a des périodes plus sèches que d’autres. Quand elles durent, on peut finir par se sentir seul·e à deux.",
      ask: "De quoi auriez-vous besoin pour vous sentir aimé·e ?",
      id: "g3.4",
    },
    {
      kind: "sig",
      q: "g4",
      when: ["2"],
      fam: "c",
      ax: "secu",
      t: "La dernière fois que vous avez exprimé un besoin, {il} l’a pris comme un reproche. Une demande peut être mal reçue un soir de fatigue.",
      ask: "Avez-vous pu y revenir plus tard, à un meilleur moment ?",
      id: "g4.1",
    },
    {
      kind: "sig",
      q: "g4",
      when: ["3"],
      fam: "u",
      ax: "secu",
      t: "La dernière fois que vous avez exprimé un besoin, {il} s’en est moqué{e} ou l’a minimisé. Se sentir ridicule quand on demande quelque chose donne envie de ne plus rien demander, quel que soit le couple.",
      ask: "Exprimez-vous encore vos besoins ?",
      id: "g4.2",
    },
    {
      kind: "sig",
      q: "g4",
      when: ["4"],
      fam: "c",
      ax: "transp",
      t: "Vous n’avez jamais vraiment exprimé ce besoin. Ce qui n’est pas dit a peu de chances d’être entendu, même par quelqu’un qui vous aime.",
      ask: "Qu’est-ce qui rend ce besoin difficile à dire ?",
      id: "g4.3",
    },
    {
      kind: "pos",
      q: "g4",
      when: ["0"],
      fam: "p",
      ax: "secu",
      t: "La dernière fois que vous avez exprimé un besoin, {il} en a tenu compte.",
      id: "g4.4",
    },
    {
      id: "mirror:lies",
      kind: "rule",
      rule: "lies",
      fam: "m",
      t: "Vous avez répondu « jamais » à {n} questions sur des choses que presque tout le monde a déjà vécues : jalousie, mots blessants, petits mensonges, énervement pour rien. C’est peut-être vrai. C’est peut-être aussi qu’il est difficile de se regarder sans filtre, ce qui est humain.",
      ask: "En relisant vos réponses, y en a-t-il une que vous nuanceriez ?",
    },
    {
      id: "mirror:ok",
      kind: "rule",
      rule: "honest",
      fam: "m",
      t: "Vous reconnaissez sans détour des choses que presque tout le monde vit : jalousie, mots blessants, petits mensonges.",
    },
    {
      id: "coh:tel-code",
      kind: "coh",
      coh: "tel-code",
      q: "b1",
      fam: "m",
      t: "Vous dites ne jamais regarder son téléphone en cachette, et vous connaissez son code sans qu’{il} vous l’ait donné.",
    },
    {
      id: "coh:jalousie",
      kind: "coh",
      coh: "jalousie",
      q: "s1",
      fam: "m",
      t: "Vous dites n’avoir jamais ressenti de jalousie, et il vous arrive de vérifier son téléphone, l’endroit où {il} se trouve ou sa dernière connexion.",
    },
    {
      id: "coh:blessant",
      kind: "coh",
      coh: "blessant",
      q: "s2",
      fam: "m",
      t: "Vous dites n’avoir jamais blessé quelqu’un que vous aimez, et des insultes ont été lancées dans vos disputes cette année.",
    },
    {
      id: "coh:amis",
      kind: "coh",
      coh: "amis",
      q: "e4",
      fam: "m",
      t: "Vous dites que vos ami·es apprécient votre partenaire, et la phrase de votre meilleur·e ami·e raconte autre chose.",
    },
    {
      id: "coh:sujets",
      kind: "coh",
      coh: "sujets",
      q: "d1",
      fam: "m",
      t: "Vous dites n’éviter aucun sujet, et vous taisez régulièrement des détails pour éviter ses réactions.",
    },
    {
      id: "coh:ex",
      kind: "coh",
      coh: "ex",
      q: "a2",
      fam: "m",
      t: "Vous décrivez plusieurs de vos ex avec des mots durs, et vous ne voyez pas ce que ces personnes pourraient vous reprocher.",
    },
  ];
  /* @@TX-END */

  /* ---------- État ---------- */
  const KEY = "couple-en-vrai-v3";
  const state = {
    pron: "n",
    idx: -1,
    sub: 0,
    answers: {},
    play: null,
    pane: "q",
  };
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return s && typeof s === "object" ? s : null;
    } catch (e) {
      return null;
    }
  }
  function P(s) {
    return fmt(s, state.pron);
  }
  function answered(q) {
    return isAnswered(q, state.answers);
  }
  function done(q) {
    return isDone(q, state.answers);
  }
  function nextIdx(i, dir) {
    let j = i + dir;
    while (j >= 0 && j < Q.length && !applies(Q[j], state.answers)) j += dir;
    return j;
  }
  function txT(id) {
    const e = TX.find(function (x) {
      return x.id === id;
    });
    return e || {};
  }
  function themeName(ax) {
    return txT("theme:" + ax).name || AX[ax].name;
  }
  function clone(o) {
    return o === undefined ? undefined : JSON.parse(JSON.stringify(o));
  }
  function same(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function pl(n, one, many) {
    return n + " " + (n > 1 ? many : one);
  }
  const byId = {};
  Q.forEach(function (q) {
    byId[q.id] = q;
  });
  function qNum(q) {
    return Q.indexOf(q) + 1;
  }
  let justI = null;
  /* Passage automatique après un choix unique : le bouton Suivant se remplit, la question s’efface, puis on avance. */
  const AUTO_WAIT = 450,
    AUTO_LEAVE = 200;
  let autoT = null;
  function cancelAuto() {
    clearTimeout(autoT);
    autoT = null;
  }

  /* ---------- Icônes ---------- */
  const HEART =
    "M12 21C12 21 3 14.5 3 8.5 3 5.5 5.5 3 8.5 3c1.7 0 2.9.9 3.5 2 .6-1.1 1.8-2 3.5-2C18.5 3 21 5.5 21 8.5 21 14.5 12 21 12 21Z";
  const IC = {
    left: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    skip: '<path d="m5 4 10 8-10 8z"/><path d="M19 5v14"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    redo: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    sliders:
      '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  };
  function ic(n, c) {
    return (
      '<svg class="ic' +
      (c ? " " + c : "") +
      '" viewBox="0 0 24 24" aria-hidden="true">' +
      IC[n] +
      "</svg>"
    );
  }
  function heart() {
    return (
      '<svg class="ic-h" viewBox="0 0 24 24" aria-hidden="true"><path d="' +
      HEART +
      '"/></svg>'
    );
  }

  /* ---------- Rendu ---------- */
  const view = document.getElementById("view");

  function render(anim) {
    cancelAuto();
    if (anim === undefined) anim = true;
    if (state.idx === -1) renderIntro(anim);
    else if (state.idx === "results") renderResults(anim);
    else if (state.idx === "lab") renderLab(anim);
    else renderQuestion(anim);
    renderTop();
    syncHistory();
  }
  function asked() {
    return Q.filter(function (q) {
      return !q.off && applies(q, state.answers);
    });
  }
  function renderTop() {
    const i = state.idx,
      inQ = typeof i === "number" && i >= 0;
    document.getElementById("wrap").classList.toggle("wide", i === "lab");
    document.getElementById("wrap").classList.toggle("home", i === -1);
    /* Le sélecteur Vos réponses / Le bilan vit dans l’en-tête pour rester toujours visible sur mobile. */
    const seg = document.getElementById("lseg");
    seg.hidden = i !== "lab";
    if (i !== "lab") seg.innerHTML = "";
    let txt = "",
      w = 0;
    if (inQ) {
      const ap = asked(),
        pos = ap.indexOf(Q[i]) + 1;
      txt = pos + " / " + ap.length;
      w = (pos / ap.length) * 100;
    } else if (i === "results") txt = "Votre bilan";
    else if (i === "lab") txt = "Les coulisses";
    document.getElementById("count").textContent = txt;
    const bar = document.getElementById("bar");
    bar.hidden = !inQ;
    bar.firstElementChild.style.width = w + "%";
  }

  function restartBtn(label) {
    return (
      '<button type="button" class="btn ghost" data-act="restart" data-label="' +
      label +
      '">' +
      ic("redo") +
      "<span>" +
      label +
      "</span></button>"
    );
  }
  function renderIntro(anim) {
    const n = Q.filter(answered).length,
      allDone = Q.every(done);
    const firstOpen = Q.findIndex(function (q) {
      return !done(q);
    });
    let btns;
    if (allDone) {
      btns =
        '<button type="button" class="btn primary big" data-act="results">Voir mon bilan' +
        ic("right") +
        "</button>" +
        '<button type="button" class="btn ghost" data-act="lab">' +
        ic("sliders") +
        "Les coulisses du bilan</button>" +
        restartBtn("Refaire le test");
    } else if (n > 0 || Object.keys(state.answers).length) {
      const pos = asked().indexOf(Q[firstOpen]) + 1;
      btns =
        '<button type="button" class="btn primary big" data-act="resume" data-to="' +
        firstOpen +
        '">Reprendre à la question ' +
        pos +
        ic("right") +
        "</button>" +
        restartBtn("Recommencer à zéro");
    } else {
      btns =
        '<button type="button" class="btn primary big" data-act="start">Commencer le test' +
        ic("right") +
        '</button><span class="meta">' +
        Q.length +
        " questions, environ 8 minutes</span>";
    }
    const pron = [
      ["il", "il", "mon partenaire"],
      ["elle", "elle", "ma partenaire"],
      ["n", "iel", "neutre"],
    ]
      .map(function (p) {
        const on = state.pron === p[0];
        return (
          '<button type="button" role="radio" aria-checked="' +
          on +
          '" data-act="pron" data-p="' +
          p[0] +
          '"><b>' +
          p[1] +
          "</b><small>" +
          p[2] +
          "</small></button>"
        );
      })
      .join("");
    const themes = AXK.map(function (k) {
      return (
        "<div><dt>" +
        heart() +
        themeName(k) +
        "</dt><dd>" +
        fr(txT("theme:" + k).t || "") +
        "</dd></div>"
      );
    }).join("");
    view.innerHTML =
      '<div class="intro' +
      (anim ? " enter" : "") +
      '">' +
      '<section class="hero">' +
      '<span class="pill">Test de couple en solo</span>' +
      '<h1 tabindex="-1">C’est<em>Compliqué</em></h1>' +
      '<p class="lead">' +
      fr(
        Q.length +
          " questions sur ce qui s’est réellement passé dans votre couple. Pas de note à la fin, mais des pistes pour prendre un peu de recul.",
      ) +
      "</p>" +
      "</section>" +
      '<section class="card start" aria-label="Commencer">' +
      '<div class="pron"><span id="pronl">' +
      fr("Pour parler de votre partenaire, le questionnaire utilise :") +
      '</span><div class="pronseg" role="radiogroup" aria-labelledby="pronl">' +
      pron +
      "</div></div>" +
      '<div class="start-row">' +
      btns +
      "</div>" +
      "</section>" +
      '<section><h2 class="sec-s">Avant de commencer</h2><ul class="boxes">' +
      "<li>" +
      fr(
        "Répondez à partir de ce qui s’est vraiment passé, pas de ce que vous auriez voulu faire.",
      ) +
      "</li>" +
      "<li>" +
      fr(
        "Si vous hésitez, choisissez la réponse la plus proche de la réalité, même si elle vous plaît moins.",
      ) +
      "</li>" +
      "<li>" +
      fr("Une question ne vous parle pas ? Vous pouvez la passer.") +
      "</li>" +
      "<li>" +
      fr(
        "À la fin, vous pourrez voir quelle réponse a fait apparaître chaque message, et tester d’autres réponses.",
      ) +
      "</li>" +
      "<li>" +
      fr("Vos réponses restent sur cet appareil : rien n’est envoyé.") +
      "</li>" +
      "</ul></section>" +
      '<section><h2 class="sec-s">Six thèmes abordés</h2><dl class="ax">' +
      themes +
      "</dl></section>" +
      "</div>";
  }

  function isSteps(q) {
    return !!q && q.type === "grid" && q.layout === "steps";
  }
  function renderQuestion(anim) {
    const q = Q[state.idx],
      a = state.answers[q.id],
      skipped = a === "skip",
      jI = justI;
    justI = null;
    let body = "";
    if (q.type === "tf" || q.type == null) {
      body =
        '<div class="opts" role="radiogroup" aria-labelledby="qt">' +
        q.opts
          .map(function (op, i) {
            const on = a === i;
            return (
              '<button type="button" style="--i:' +
              i +
              '" class="opt' +
              (on ? " on" : "") +
              (on && jI === i ? " just" : "") +
              '" role="radio" aria-checked="' +
              on +
              '" data-act="pick" data-i="' +
              i +
              '"><span class="num" aria-hidden="true">' +
              (i + 1) +
              '</span><span class="ot">' +
              P(op.t) +
              "</span></button>"
            );
          })
          .join("") +
        "</div>";
    } else if (q.type === "multi") {
      const sel = Array.isArray(a) ? a : [];
      body =
        '<div class="opts multi" role="group" aria-labelledby="qt">' +
        q.opts
          .map(function (op, i) {
            const on = sel.indexOf(i) >= 0;
            return (
              '<button type="button" style="--i:' +
              i +
              '" class="opt' +
              (on ? " on" : "") +
              (jI === i ? " just" : "") +
              '" role="checkbox" aria-checked="' +
              on +
              '" data-act="toggle" data-i="' +
              i +
              '"><span class="num" aria-hidden="true">' +
              (on ? ic("check") : "") +
              '</span><span class="ot">' +
              P(op.t) +
              "</span></button>"
            );
          })
          .join("") +
        "</div>";
    } else if (isSteps(q)) {
      const ri = state.sub || 0,
        row = q.rows[ri],
        cur = Array.isArray(a) ? a[ri] : undefined,
        sel = Array.isArray(cur) ? cur : [],
        none = cur === null;
      body =
        '<button type="button" class="btn ghost sm skipb' +
        (none ? " on" : "") +
        '" data-act="exnone" aria-pressed="' +
        none +
        '">' +
        P(row.skip) +
        "</button>" +
        '<div class="chips words" role="group" aria-labelledby="qt">' +
        q.opts
          .map(function (op, i) {
            const on = sel.indexOf(i) >= 0;
            return (
              '<button type="button" style="--i:' +
              i +
              '" class="chip' +
              (on ? " on" : "") +
              (jI === i ? " just" : "") +
              '" role="checkbox" aria-checked="' +
              on +
              '" data-act="extog" data-i="' +
              i +
              '">' +
              P(op.t) +
              "</button>"
            );
          })
          .join("") +
        "</div>";
    } else if (q.type === "grid") {
      const sel = Array.isArray(a) ? a : [];
      body =
        '<div class="rows">' +
        q.rows
          .map(function (r, ri) {
            const opts = r.opts || q.opts;
            const tag = r.tag
              ? '<span class="tag ' +
                r.tag +
                '">' +
                (r.tag === "a" ? "Vous" : "Partenaire") +
                "</span>"
              : "";
            return (
              '<div class="row" style="--i:' +
              ri +
              '"><div class="rl" id="rl' +
              ri +
              '">' +
              tag +
              "<span>" +
              P(r.label) +
              '</span></div><div class="chips" role="' +
              (q.multi ? "group" : "radiogroup") +
              '" aria-labelledby="rl' +
              ri +
              '">' +
              opts
                .map(function (op, i) {
                  const on = q.multi
                    ? cellSel(sel[ri]).indexOf(i) >= 0
                    : sel[ri] === i;
                  return (
                    '<button type="button" class="chip' +
                    (on ? " on" : "") +
                    (jI === ri + ":" + i ? " just" : "") +
                    '" role="' +
                    (q.multi ? "checkbox" : "radio") +
                    '" aria-checked="' +
                    on +
                    '" data-act="cell" data-r="' +
                    ri +
                    '" data-i="' +
                    i +
                    '">' +
                    P(op.t) +
                    "</button>"
                  );
                })
                .join("") +
              "</div></div>"
            );
          })
          .join("") +
        "</div>";
    } else if (q.type === "rank") {
      const sel = Array.isArray(a) ? a : [];
      body =
        '<div class="opts rank">' +
        q.items
          .map(function (it, i) {
            const pos = sel.indexOf(i);
            return (
              '<button type="button" style="--i:' +
              i +
              '" class="opt' +
              (pos >= 0 ? " on" : "") +
              (jI === i ? " just" : "") +
              '" aria-pressed="' +
              (pos >= 0) +
              '" data-act="rank" data-i="' +
              i +
              '"><span class="badge num" aria-hidden="true">' +
              (pos >= 0 ? pos + 1 : "") +
              '</span><span class="ot"><strong>' +
              it.n +
              '</strong><span class="rk-sub">' +
              fr(it.sub) +
              "</span></span>" +
              (pos >= 0
                ? '<span class="sr">, rang ' + (pos + 1) + "</span>"
                : "") +
              "</button>"
            );
          })
          .join("") +
        '</div><div class="rank-tools">' +
        (sel.length
          ? '<button type="button" class="btn link" data-act="rankclear">' +
            ic("undo") +
            "Effacer le classement</button>"
          : "") +
        "</div>";
    }
    const steps = isSteps(q),
      sub = state.sub || 0;
    const eyebrow =
      '<span class="pill">' +
      q.block +
      (steps
        ? '<span class="sdots" aria-label="Étape ' +
          (sub + 1) +
          " sur " +
          q.rows.length +
          '">' +
          q.rows
            .map(function (_, i) {
              return '<i class="' + (i <= sub ? "on" : "") + '"></i>';
            })
            .join("") +
          "</span>"
        : "") +
      "</span>";
    const title = steps ? P(q.rows[sub].q) : P(q.q);
    const ok = steps || answered(q);
    const last = nextIdx(state.idx, 1) >= Q.length;
    const first0 = Array.isArray(a) ? a[0] : undefined;
    const canSkip =
      !answered(q) &&
      (!steps ||
        (sub === 0 &&
          first0 !== null &&
          !(Array.isArray(first0) && first0.length)));
    let right = "";
    if (canSkip)
      right +=
        '<button type="button" class="btn text skipq" data-act="skip">' +
        ic("skip") +
        "Passer</button>";
    right +=
      '<button type="button" class="btn ghost soft-next" data-act="next"' +
      (ok ? "" : " disabled") +
      ">" +
      (last ? "Voir mon bilan" : "Suivant") +
      ic("right") +
      "</button>";
    view.innerHTML =
      '<article class="q' +
      (anim ? " enter" : "") +
      '">' +
      '<header class="qhead">' +
      eyebrow +
      '<h1 class="qt" id="qt" tabindex="-1">' +
      title +
      "</h1>" +
      (q.hint && (!steps || sub === 0)
        ? '<p class="hint">' + P(q.hint) + "</p>"
        : "") +
      (skipped
        ? '<p class="skipped">' +
          ic("skip") +
          "Vous aviez passé cette question.</p>"
        : "") +
      "</header>" +
      body +
      '<nav class="nav" aria-label="Navigation"><button type="button" class="btn text" data-act="back">' +
      ic("left", "l") +
      'Retour</button><div class="nav-r">' +
      right +
      "</div></nav>" +
      "</article>";
    if (anim) {
      const h = document.getElementById("qt");
      if (h) h.focus({ preventScroll: true });
    }
  }

  /* ---------- Pourquoi ce message ---------- */
  function q2(t) {
    return "« " + P(t) + " »";
  }
  function orJoin(a, w) {
    w = w || " ou ";
    return a.length < 2
      ? a.join("")
      : a.slice(0, -1).join(", ") + w + a[a.length - 1];
  }
  function keysT(ops, keys) {
    return ops
      .filter(function (o) {
        return keys.indexOf(o.k) >= 0;
      })
      .map(function (o) {
        return q2(o.t);
      });
  }
  function a1Words(f) {
    const q = byId.a1;
    return q
      ? orJoin(
          q.opts
            .filter(function (o) {
              return o[f];
            })
            .map(function (o) {
              return P(o.t);
            }),
          ", ",
        )
      : "";
  }
  function ruleDesc(r) {
    const D = {
      "a1-neg":
        "Ce message apparaît quand au moins deux ex sont décrit·es avec un mot dur (" +
        a1Words("harsh") +
        "), même si un mot bienveillant l’accompagne.",
      "a1-pos":
        "Ce message apparaît quand au moins un·e ex est décrit·e avec un mot bienveillant (" +
        a1Words("pos") +
        ") et sans mot dur.",
      "a1-nuance":
        "Ce message apparaît quand un·e même ex est décrit·e à la fois avec un mot dur et un mot bienveillant.",
      "c1-same":
        "Ce message apparaît quand un même sujet est coché pour vos deux dernières disputes (sauf « Je ne m’en souviens plus »).",
      combo: "Ce message apparaît pour cette combinaison précise de réponses.",
      lies: "Quatre questions portent sur des choses que presque tout le monde a vécues : la jalousie, un mot blessant, un petit mensonge, un énervement pour rien. Ce message apparaît à partir de deux « Non, jamais ».",
      honest:
        "Ce message apparaît quand vous avez répondu à au moins trois des quatre questions miroirs (jalousie, mot blessant, petit mensonge, énervement pour rien), avec au plus un « Non, jamais ».",
    };
    return fr(D[r] || "");
  }
  function ansText(q, A) {
    const a = A[q.id];
    if (a === "skip") return "Question passée";
    if (!isAnswered(q, A)) return "Pas de réponse";
    if (q.type === "multi")
      return a
        .map(function (i) {
          return q2(q.opts[i].t);
        })
        .join(", ");
    if (isSteps(q)) {
      if (a[0] === null) return q2(q.rows[0].skip);
      const out = [];
      for (let i = 0; i < q.rows.length; i++) {
        if (a[i] === null) break;
        out.push(
          P(q.rows[i].label) +
            " : " +
            (a[i].length
              ? a[i]
                  .map(function (j) {
                    return P(q.opts[j].t);
                  })
                  .join(", ")
              : "aucun mot"),
        );
      }
      return out.join(" ; ");
    }
    if (q.type === "grid")
      return q.rows
        .map(function (r, ri) {
          return (
            P(r.label) +
            " : " +
            cellSel(a[ri])
              .map(function (i) {
                return q2((r.opts || q.opts)[i].t);
              })
              .join(", ")
          );
        })
        .join(" ; ");
    if (q.type === "rank")
      return a
        .slice(0, 3)
        .map(function (i, n) {
          return n + 1 + ". " + q.items[i].n;
        })
        .join(", ");
    return q2(q.opts[a].t);
  }
  function whyData(e, A) {
    const q = e.q ? byId[e.q] : null,
      a = q ? A[q.id] : null,
      L = [];
    let note = "";
    function rowOps(ri) {
      return cellSel(a[ri])
        .map(function (i) {
          return (q.rows[ri].opts || q.opts)[i];
        })
        .filter(Boolean);
    }
    if (e.kind === "sig" || e.kind === "pos") {
      if (q.type === "multi")
        L.push({
          q: q,
          ans: a
            .filter(function (i) {
              return q.opts[i] && e.when.indexOf(q.opts[i].k) >= 0;
            })
            .map(function (i) {
              return q2(q.opts[i].t);
            })
            .join(", "),
        });
      else if (q.type === "grid") {
        (e.row != null
          ? [e.row]
          : q.rows.map(function (_, i) {
              return i;
            })
        ).forEach(function (ri) {
          const ops = rowOps(ri).filter(function (op) {
            return e.when.indexOf(op.k) >= 0;
          });
          if (ops.length)
            L.push({
              q: q,
              sub: P(q.rows[ri].label),
              ans: ops
                .map(function (op) {
                  return q2(op.t);
                })
                .join(", "),
            });
        });
      } else L.push({ q: q, ans: q2(q.opts[a].t) });
    } else if (e.kind === "rule") {
      note = ruleDesc(e.rule);
      if (/^a1-/.test(e.rule)) {
        const want =
          e.rule === "a1-pos" ? "B" : e.rule === "a1-nuance" ? "N" : null;
        a.forEach(function (x, ri) {
          if (!Array.isArray(x) || !x.length) return;
          const ops = x
            .map(function (j) {
              return q.opts[j];
            })
            .filter(Boolean);
          if (want ? exTone(ops) === want : exHarsh(ops))
            L.push({
              q: q,
              sub: P(q.rows[ri].label),
              ans: ops
                .map(function (o) {
                  return P(o.t);
                })
                .join(", "),
            });
        });
      } else if (e.rule === "c1-same" || e.rule === "combo") {
        (e.rule === "combo"
          ? e.combo.map(function (c) {
              return c[0];
            })
          : q.rows.map(function (_, i) {
              return i;
            })
        ).forEach(function (ri) {
          const ops = rowOps(ri);
          if (ops.length)
            L.push({
              q: q,
              sub: P(q.rows[ri].label),
              ans: ops
                .map(function (op) {
                  return q2(op.t);
                })
                .join(", "),
            });
        });
      } else if (e.rule === "lies" || e.rule === "honest") {
        Q.filter(function (x) {
          return (
            x.type === "tf" &&
            isAnswered(x, A) &&
            (e.rule === "honest" || x.opts[A[x.id]].lie)
          );
        }).forEach(function (x) {
          L.push({ q: x, ans: q2(x.opts[A[x.id]].t) });
        });
      }
    } else if (e.kind === "coh") {
      const r = COH.find(function (x) {
        return x.id === e.coh;
      });
      note = fr(
        "Ces réponses sont comparées entre elles. Le message ne dit pas laquelle est juste.",
      );
      (r ? r.refs : []).forEach(function (id) {
        const x = byId[id];
        if (x && isAnswered(x, A)) L.push({ q: x, ans: ansText(x, A) });
      });
    }
    return { L: L, note: note };
  }
  function whyHTML(it, A, lab) {
    const e = txGet(TX, {}, it.id);
    if (!e) return "";
    const d = whyData(e, A);
    const groups = [];
    d.L.forEach(function (x) {
      let g = groups.find(function (y) {
        return y.q === x.q;
      });
      if (!g) {
        g = { q: x.q, L: [] };
        groups.push(g);
      }
      g.L.push(x);
    });
    const lis = groups
      .map(function (g) {
        return (
          '<li><span class="wq">Question ' +
          qNum(g.q) +
          " : " +
          P(g.q.q) +
          "</span>" +
          g.L.map(function (x) {
            return (
              '<span class="wa">' +
              (lab ? "" : g.L.length > 1 ? "" : "Votre réponse : ") +
              (x.sub ? x.sub + " : " : "") +
              x.ans +
              "</span>"
            );
          }).join("") +
          (lab
            ? '<button type="button" class="btn link wm" data-act="l-goto" data-q="' +
              g.q.id +
              '">' +
              ic("pen") +
              "Modifier</button>"
            : "") +
          "</li>"
        );
      })
      .join("");
    const inner =
      '<ul class="wl">' +
      lis +
      "</ul>" +
      (d.note ? '<p class="wn">' + d.note + "</p>" : "");
    if (lab) return '<div class="why">' + inner + "</div>";
    const first = d.L.length ? d.L[0].q.id : "";
    return (
      '<details class="why"><summary>' +
      ic("info") +
      "Pourquoi ce message ?" +
      ic("down", "cv") +
      "</summary>" +
      inner +
      '<p class="wn"><button type="button" class="btn link" data-act="lab" data-q="' +
      first +
      '">' +
      ic("sliders") +
      "Essayer d’autres réponses</button></p></details>"
    );
  }

  /* ---------- Bilan ---------- */
  function pills(t) {
    let h = "";
    if (t.n)
      h +=
        '<span class="st st-c">' +
        fr(txT("head:look").t) +
        "<b>" +
        t.n +
        "</b></span>";
    if (t.p)
      h +=
        '<span class="st st-p">' +
        fr(txT("head:good").t) +
        "<b>" +
        t.p +
        "</b></span>";
    return h || '<span class="st">' + fr(txT("head:calm").t) + "</span>";
  }
  function overview(r, act) {
    return (
      '<section class="card ov" aria-label="Les six thèmes">' +
      AXK.map(function (k, n) {
        const t = r.themes[k],
          has = t.n || t.p,
          inner =
            '<span class="ov-n">' +
            themeName(k) +
            '</span><span class="ov-s">' +
            pills(t) +
            "</span>";
        return has && act
          ? '<button type="button" class="ov-i" style="--i:' +
              n +
              '" data-act="theme" data-ax="' +
              k +
              '">' +
              inner +
              "</button>"
          : '<div class="ov-i" style="--i:' + n + '">' + inner + "</div>";
      }).join("") +
      "</section>"
    );
  }
  function itemHTML(it, o) {
    o = o || {};
    const lab = !!o.lab,
      A = o.A || state.answers;
    const tags =
      (it.fam === "u"
        ? '<span class="tagu">' + fr(txT("head:u").name) + "</span>"
        : "") + (o.isNew ? '<span class="newt">Nouveau</span>' : "");
    return (
      '<div class="pt f-' +
      it.fam +
      (o.isNew ? " new" : "") +
      (o.appear ? " appear" : "") +
      '">' +
      (it.fam === "p" ? heart() : "") +
      (tags ? '<div class="pt-ft">' + tags + "</div>" : "") +
      "<p>" +
      it.t +
      "</p>" +
      (it.ask && !lab ? '<p class="ask">' + it.ask + "</p>" : "") +
      whyHTML(it, A, lab) +
      "</div>"
    );
  }
  function themeSections(r, o) {
    let h = "";
    AXK.forEach(function (k) {
      const pts = r.u
        .filter(function (it) {
          return it.ax === k;
        })
        .concat(
          r.c.filter(function (it) {
            return it.ax === k;
          }),
        );
      const pos = r.p.filter(function (it) {
        return it.ax === k;
      });
      if (!pts.length && !pos.length) return;
      const one = function (it) {
        return itemHTML(it, o.item ? o.item(it) : {});
      };
      h +=
        '<section class="th"' +
        (o.lab ? "" : ' id="th-' + k + '"') +
        '><div class="th-h"><h2 class="sec">' +
        heart() +
        themeName(k) +
        '</h2><span class="ov-s">' +
        pills(r.themes[k]) +
        "</span></div>" +
        (o.lab ? "" : '<p class="muted">' + P(txT("theme:" + k).t) + "</p>") +
        '<div class="pts">' +
        pts.map(one).join("") +
        (pos.length
          ? (pts.length
              ? '<p class="sub">' + fr(txT("head:p").name) + "</p>"
              : "") + pos.map(one).join("")
          : "") +
        "</div></section>";
    });
    if (r.m.length || r.coh.length) {
      const one = function (it) {
        return itemHTML(it, o.item ? o.item(it) : {});
      };
      h +=
        '<section class="th"><h2 class="sec">' +
        heart() +
        fr(txT("head:m").name) +
        '</h2><div class="pts">' +
        r.m.map(one).join("");
      if (r.coh.length)
        h +=
          '<p class="muted">' +
          P(txT("head:coh").t) +
          "</p>" +
          r.coh.map(one).join("") +
          (o.lab ? "" : '<p class="ask">' + P(txT("head:coh").ask) + "</p>");
      h += "</div></section>";
    }
    return h;
  }
  function rankOf(A) {
    const g5 = byId.g5,
      rk = A.g5;
    return g5 && Array.isArray(rk) && rk.length ? rk : null;
  }
  let lastR = null;
  function renderResults(anim) {
    const r = reading(Q, state.answers, state.pron, TX, {});
    lastR = r;
    let h =
      '<div class="res' +
      (anim ? " enter" : "") +
      '">' +
      '<section class="res-head"><span class="pill">Votre bilan</span><h1 id="qt" tabindex="-1">' +
      P(txT("head:title").t) +
      '</h1><p class="lead">' +
      P(txT("head:intro").t) +
      "</p></section>" +
      overview(r, true);
    if (!r.u.length && !r.c.length)
      h += '<p class="none">' + P(txT("head:none").t) + "</p>";
    else
      h +=
        '<div class="leg"><p>' +
        P(txT("head:c").t) +
        "</p>" +
        (r.u.length
          ? '<p><span class="tagu">' +
            fr(txT("head:u").name) +
            "</span> " +
            P(txT("head:u").t) +
            "</p>"
          : "") +
        "</div>";
    h += themeSections(r, {});
    const rk = rankOf(state.answers),
      g5 = byId.g5;
    if (rk) {
      h +=
        '<section class="needs"><h2 class="sec">' +
        heart() +
        'Vos besoins</h2><ol class="top3">' +
        rk
          .slice(0, 3)
          .map(function (i, n) {
            const it = g5.items[i];
            return (
              '<li><span class="nchip"><i>' +
              (n + 1) +
              "</i>" +
              it.n +
              "</span><p>" +
              fr(it.d) +
              "</p></li>"
            );
          })
          .join("") +
        "</ol>" +
        '<p class="least">' +
        fr(
          "Le moins vital pour vous : " +
            g5.items[rk[rk.length - 1]].n.toLowerCase() +
            ".",
        ) +
        "</p></section>";
    }
    h +=
      '<p class="end">' +
      P(txT("head:end").t) +
      "</p>" +
      '<section class="card labcta"><span class="pill soft">' +
      ic("eye") +
      "Transparence</span><h2>Les coulisses du bilan</h2><p>" +
      fr(
        "Changez vos réponses et regardez le bilan se recomposer. Chaque message indique la réponse qui l’a fait apparaître. Votre bilan à vous ne bouge pas.",
      ) +
      "</p>" +
      '<button type="button" class="btn primary" data-act="lab">' +
      ic("sliders") +
      "Ouvrir les coulisses</button></section>" +
      '<div class="actions"><button type="button" class="btn ghost" data-act="copy">' +
      ic("copy") +
      "<span>Copier le résumé</span></button>" +
      restartBtn("Refaire le test") +
      "</div>" +
      '<textarea id="sumtxt" readonly hidden aria-label="Résumé du bilan"></textarea>' +
      '<p class="foot">' +
      fr(
        "C’estCompliqué est un outil de réflexion, pas un diagnostic. Vos réponses restent sur cet appareil.",
      ) +
      "</p>" +
      "</div>";
    view.innerHTML = h;
    if (anim) {
      const e = document.getElementById("qt");
      if (e) e.focus({ preventScroll: true });
    }
  }
  function plain(s) {
    return String(s).replace(/ | /g, " ");
  }
  function summaryText(r) {
    const L = ["C’estCompliqué : " + plain(P(txT("head:title").t)), ""];
    AXK.forEach(function (k) {
      const t = r.themes[k];
      const a = [];
      if (t.n) a.push(plain(fr(txT("head:look").t)) + " (" + t.n + ")");
      if (t.p) a.push(plain(fr(txT("head:good").t)) + " (" + t.p + ")");
      L.push(
        themeName(k) +
          " : " +
          (a.length ? a.join(", ") : plain(fr(txT("head:calm").t))),
      );
    });
    const pts = r.u.concat(r.c);
    if (pts.length) {
      L.push("", "Questions à me poser :");
      pts.forEach(function (it) {
        if (it.ask) L.push("- " + plain(it.ask));
      });
    }
    const rk = rankOf(state.answers);
    if (rk)
      L.push(
        "",
        "Besoins vitaux : " +
          rk
            .slice(0, 3)
            .map(function (i) {
              return byId.g5.items[i].n;
            })
            .join(", "),
      );
    return L.join("\n");
  }

  /* ---------- Coulisses : changer ses réponses et voir le bilan bouger ---------- */
  const FAM = {
    u: "Peut blesser",
    c: "À regarder",
    p: "Point positif",
    m: "Un mot sur vos réponses",
  };
  const labOpen = {};
  let labPrev = null,
    toastT = null;
  function entsFor(q) {
    return TX.filter(function (e) {
      if (["sig", "pos", "rule", "coh"].indexOf(e.kind) < 0) return false;
      if (e.q === q.id && e.kind !== "coh") return true;
      if (e.kind === "coh") {
        const r = COH.find(function (x) {
          return x.id === e.coh;
        });
        return !!r && r.refs.indexOf(q.id) >= 0;
      }
      return (e.rule === "lies" || e.rule === "honest") && q.type === "tf";
    });
  }
  function optFam(q, ri, op) {
    if (q.type === "tf" && op.lie) return "m";
    let f = null;
    TX.forEach(function (e) {
      if (
        (e.kind !== "sig" && e.kind !== "pos") ||
        e.q !== q.id ||
        e.when.indexOf(op.k) < 0
      )
        return;
      if (q.type === "grid" && e.row != null && e.row !== ri) return;
      if (!f || "ucpm".indexOf(e.fam) < "ucpm".indexOf(f)) f = e.fam;
    });
    return f;
  }
  function famDot(f) {
    return f
      ? '<span class="fd ' +
          f +
          '" aria-hidden="true"></span><span class="sr">, fait apparaître un message : ' +
          FAM[f] +
          "</span>"
      : "";
  }
  function condText(e, q) {
    if (e.kind === "sig" || e.kind === "pos") {
      if (q.type === "grid") {
        if (e.row != null)
          return (
            "Si, pour " +
            q2(q.rows[e.row].label) +
            ", vous répondez " +
            orJoin(keysT(q.rows[e.row].opts || q.opts, e.when))
          );
        return "Si l’une des lignes vaut " + orJoin(keysT(q.opts, e.when));
      }
      return (
        (q.type === "multi" ? "Si vous cochez " : "Si vous répondez ") +
        orJoin(keysT(q.opts, e.when))
      );
    }
    if (e.kind === "rule" && e.rule === "combo")
      return (
        "Si " +
        e.combo
          .map(function (c) {
            return (
              q2(q.rows[c[0]].label) +
              " vaut " +
              orJoin(keysT(q.rows[c[0]].opts || q.opts, c[1]))
            );
          })
          .join(", et ")
      );
    if (e.kind === "rule") return ruleDesc(e.rule);
    if (e.kind === "coh") {
      const r = COH.find(function (x) {
        return x.id === e.coh;
      });
      const others = (r ? r.refs : [])
        .filter(function (id) {
          return id !== q.id && byId[id];
        })
        .map(function (id) {
          return "la question " + qNum(byId[id]);
        });
      return (
        "Si cette réponse ne raconte pas la même histoire que " +
        orJoin(others, " et ")
      );
    }
    return "";
  }
  function shortT(e) {
    const t = P(e.t)
      .replace("{sujet}", "le même sujet : …")
      .replace("{n}", "plusieurs");
    const m = t.match(/^.*?[.?!](?=\s|$)/);
    return m && m[0].length < t.length ? m[0] + " …" : t;
  }
  function chipL(on, act, attrs, label, f, dis) {
    return (
      '<button type="button" class="chip' +
      (on ? " on" : "") +
      '" ' +
      (act.role
        ? 'role="' + act.role + '" aria-checked="' + on + '" '
        : 'aria-pressed="' + on + '" ') +
      'data-act="' +
      act.a +
      '"' +
      attrs +
      (dis ? " disabled" : "") +
      ">" +
      label +
      famDot(f) +
      "</button>"
    );
  }
  function editorHTML(q, A) {
    const a = A[q.id],
      dq = ' data-q="' + q.id + '"';
    if (q.type === "tf" || q.type == null)
      return (
        '<div class="chips" role="radiogroup" aria-label="Réponse à la question ' +
        qNum(q) +
        '">' +
        q.opts
          .map(function (op, i) {
            return chipL(
              a === i,
              { a: "l-pick", role: "radio" },
              dq + ' data-i="' + i + '"',
              P(op.t),
              optFam(q, 0, op),
            );
          })
          .join("") +
        "</div>"
      );
    if (q.type === "multi") {
      const sel = Array.isArray(a) ? a : [];
      return (
        '<div class="chips">' +
        q.opts
          .map(function (op, i) {
            return chipL(
              sel.indexOf(i) >= 0,
              { a: "l-tog", role: "checkbox" },
              dq + ' data-i="' + i + '"',
              P(op.t),
              optFam(q, 0, op),
            );
          })
          .join("") +
        "</div>"
      );
    }
    if (isSteps(q)) {
      const v = Array.isArray(a) ? a : [];
      let cut = -1;
      return (
        '<div class="rows">' +
        q.rows
          .map(function (r, ri) {
            const x = v[ri],
              none = x === null,
              off = cut >= 0 && ri > cut;
            if (none && cut < 0) cut = ri;
            const sel = Array.isArray(x) ? x : [];
            return (
              '<div class="row"><div class="rl">' +
              P(r.label) +
              "</div>" +
              (off
                ? '<p class="lq-note">' +
                  fr("Pas d’autre ex indiqué·e.") +
                  "</p>"
                : '<div class="chips">' +
                  chipL(
                    none,
                    { a: "l-exnone" },
                    dq + ' data-r="' + ri + '"',
                    P(r.skip),
                    null,
                  ) +
                  q.opts
                    .map(function (op, i) {
                      return chipL(
                        sel.indexOf(i) >= 0,
                        { a: "l-ex", role: "checkbox" },
                        dq + ' data-r="' + ri + '" data-i="' + i + '"',
                        P(op.t),
                        null,
                      );
                    })
                    .join("") +
                  "</div>") +
              "</div>"
            );
          })
          .join("") +
        "</div>"
      );
    }
    if (q.type === "grid") {
      const sel = Array.isArray(a) ? a : [];
      return (
        '<div class="rows">' +
        q.rows
          .map(function (r, ri) {
            const tag = r.tag
              ? '<span class="tag ' +
                r.tag +
                '">' +
                (r.tag === "a" ? "Vous" : "Partenaire") +
                "</span>"
              : "";
            return (
              '<div class="row"><div class="rl">' +
              tag +
              "<span>" +
              P(r.label) +
              '</span></div><div class="chips" role="' +
              (q.multi ? "group" : "radiogroup") +
              '" aria-label="' +
              P(r.label).replace(/"/g, "") +
              '">' +
              (r.opts || q.opts)
                .map(function (op, i) {
                  return chipL(
                    q.multi ? cellSel(sel[ri]).indexOf(i) >= 0 : sel[ri] === i,
                    { a: "l-cell", role: q.multi ? "checkbox" : "radio" },
                    dq + ' data-r="' + ri + '" data-i="' + i + '"',
                    P(op.t),
                    optFam(q, ri, op),
                  );
                })
                .join("") +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
      );
    }
    if (q.type === "rank") {
      const sel = Array.isArray(a) ? a : [];
      return (
        '<div class="chips">' +
        q.items
          .map(function (it, i) {
            const p = sel.indexOf(i);
            return chipL(
              p >= 0,
              { a: "l-rank" },
              dq + ' data-i="' + i + '"',
              (p >= 0 ? p + 1 + ". " : "") + it.n,
              null,
            );
          })
          .join("") +
        "</div>" +
        (sel.length
          ? '<div><button type="button" class="btn link" data-act="l-rankclear"' +
            dq +
            ">" +
            ic("undo") +
            "Effacer le classement</button></div>"
          : "")
      );
    }
    return "";
  }
  function lqHTML(q, A, cur) {
    const ap = applies(q, A),
      sk = A[q.id] === "skip",
      chg = !same(A[q.id], state.answers[q.id]);
    const ents = entsFor(q);
    const body = ap
      ? editorHTML(q, A)
      : '<p class="lq-note">' +
        fr("Question non posée : vous avez indiqué ne pas avoir d’ex.") +
        "</p>";
    const trig = ents.length
      ? '<details class="trig" data-tr="' +
        q.id +
        '"' +
        (labOpen[q.id] ? " open" : "") +
        "><summary>" +
        ic("info") +
        "Ce que cette question peut faire apparaître (" +
        ents.length +
        ")" +
        ic("down", "cv") +
        '</summary><ul class="tl">' +
        ents
          .map(function (e) {
            const on = cur.fired.indexOf(e.id) >= 0;
            return (
              '<li><div class="tl-h">' +
              (on
                ? '<span class="on-st">Affiché</span>'
                : '<span class="off-st">Pas affiché</span>') +
              '<span class="fam ' +
              e.fam +
              '">' +
              FAM[e.fam] +
              '</span></div><span class="tl-c">' +
              fr(condText(e, q)) +
              '</span><span class="tl-t">' +
              shortT(e) +
              "</span></li>"
            );
          })
          .join("") +
        "</ul></details>"
      : '<p class="lq-note">' +
        fr(
          q.type === "rank"
            ? "Cette question ne fait apparaître aucun message : elle sert à la partie « Vos besoins »."
            : "Cette question ne fait apparaître aucun message pour l’instant.",
        ) +
        "</p>";
    return (
      '<article class="lq' +
      (chg ? " chg" : "") +
      (ap ? "" : " na") +
      '" id="lq-' +
      q.id +
      '">' +
      '<div class="lq-h"><span class="lq-n">Question ' +
      qNum(q) +
      '</span><span class="pill soft">' +
      q.block +
      "</span>" +
      (chg ? '<span class="newt">Modifiée</span>' : "") +
      (sk ? '<span class="off-st">Passée</span>' : "") +
      "</div>" +
      '<p class="lq-t">' +
      P(q.q) +
      "</p>" +
      body +
      (ap && (!sk || chg)
        ? '<div class="lq-ft">' +
          (sk
            ? ""
            : '<button type="button" class="btn link" data-act="l-skip" data-q="' +
              q.id +
              '">' +
              ic("skip") +
              "Ne pas répondre</button>") +
          (chg
            ? '<button type="button" class="btn link" data-act="l-restore" data-q="' +
              q.id +
              '">' +
              ic("undo") +
              "Remettre ma réponse</button>"
            : "") +
          "</div>"
        : "") +
      trig +
      "</article>"
    );
  }
  function labResHTML(cur, base) {
    const add = function (id) {
      return base.fired.indexOf(id) < 0;
    };
    const opts = {
      lab: true,
      A: state.play,
      item: function (it) {
        return {
          lab: true,
          A: state.play,
          isNew: add(it.id),
          appear: !!labPrev && labPrev.indexOf(it.id) < 0,
        };
      },
    };
    let h =
      '<h2 class="sec">' +
      heart() +
      "Le bilan avec ces réponses</h2>" +
      overview(cur, false);
    if (!cur.fired.length)
      h += '<p class="none">' + P(txT("head:none").t) + "</p>";
    h += themeSections(cur, opts);
    const gone = base.u
      .concat(base.c, base.p, base.m, base.coh)
      .filter(function (it) {
        return cur.fired.indexOf(it.id) < 0;
      });
    if (gone.length)
      h +=
        '<section class="th gone"><h2 class="sec">' +
        fr("Disparus par rapport à votre bilan") +
        '</h2><p class="muted">' +
        fr("Ces messages apparaissaient avec vos vraies réponses.") +
        '</p><div class="pts">' +
        gone
          .map(function (it) {
            return itemHTML(it, { lab: true, A: state.answers });
          })
          .join("") +
        "</div></section>";
    const rk = rankOf(state.play);
    if (rk)
      h +=
        '<section class="needs"><h2 class="sec">' +
        heart() +
        'Vos besoins</h2><div class="chips">' +
        rk
          .slice(0, 3)
          .map(function (i, n) {
            return (
              '<span class="nchip"><i>' +
              (n + 1) +
              "</i>" +
              byId.g5.items[i].n +
              "</span>"
            );
          })
          .join("") +
        "</div></section>";
    return h;
  }
  function labUpdate(changed) {
    const base = reading(Q, state.answers, state.pron, TX, {}),
      cur = reading(Q, state.play, state.pron, TX, {});
    const add = cur.fired.filter(function (id) {
        return base.fired.indexOf(id) < 0;
      }),
      rem = base.fired.filter(function (id) {
        return cur.fired.indexOf(id) < 0;
      });
    const nchg = Q.filter(function (q) {
      return !same(state.play[q.id], state.answers[q.id]);
    }).length;
    const diff = document.getElementById("ldiff");
    diff.innerHTML = !nchg
      ? '<span class="meta">' +
        fr(
          "Vos vraies réponses sont chargées. Touchez une autre réponse pour voir ce qui change.",
        ) +
        "</span>"
      : '<span class="meta">' +
        pl(nchg, "réponse modifiée", "réponses modifiées") +
        "</span>" +
        (add.length
          ? '<span class="dchip add">' +
            pl(add.length, "nouveau message", "nouveaux messages") +
            "</span>"
          : "") +
        (rem.length
          ? '<span class="dchip rem">' +
            pl(rem.length, "message disparu", "messages disparus") +
            "</span>"
          : "") +
        (!add.length && !rem.length
          ? '<span class="dchip rem">Bilan identique</span>'
          : "") +
        '<button type="button" class="btn ghost sm" data-act="l-reset">' +
        ic("undo") +
        "Revenir à mes réponses</button>";
    document.getElementById("lseg").innerHTML =
      '<button type="button" data-act="l-pane" data-p="q" aria-pressed="' +
      (state.pane === "q") +
      '">' +
      ic("list") +
      "Vos réponses</button>" +
      '<button type="button" data-act="l-pane" data-p="r" aria-pressed="' +
      (state.pane === "r") +
      '">' +
      ic("eye") +
      "Le bilan" +
      (add.length || rem.length
        ? '<span class="dot" aria-hidden="true"></span><span class="sr"> (modifié)</span>'
        : "") +
      "</button>";
    document.getElementById("lqs").innerHTML =
      '<h2 class="sr">Vos réponses</h2>' +
      Q.filter(function (q) {
        return !q.off;
      })
        .map(function (q) {
          return lqHTML(q, state.play, cur);
        })
        .join("");
    const res = document.getElementById("lres"),
      st = res.scrollTop;
    res.innerHTML = labResHTML(cur, base);
    res.scrollTop = st;
    if (
      changed &&
      labPrev &&
      state.pane === "q" &&
      !matchMedia("(min-width:980px)").matches
    ) {
      const na = cur.fired.filter(function (id) {
          return labPrev.indexOf(id) < 0;
        }).length,
        nr = labPrev.filter(function (id) {
          return cur.fired.indexOf(id) < 0;
        }).length;
      if (na || nr)
        toast(
          fr(
            "Le bilan a changé : " +
              [
                na ? pl(na, "message en plus", "messages en plus") : "",
                nr ? pl(nr, "en moins", "en moins") : "",
              ]
                .filter(Boolean)
                .join(", "),
          ),
        );
    }
    labPrev = cur.fired.slice();
  }
  function toast(msg) {
    const t = document.getElementById("toast");
    t.innerHTML =
      "<span>" +
      msg +
      '</span><button type="button" class="btn primary sm" data-act="l-pane" data-p="r">Voir' +
      ic("right") +
      "</button>";
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () {
      t.classList.remove("show");
    }, 4000);
  }
  function renderLab(anim) {
    if (!state.play) state.play = clone(state.answers) || {};
    labPrev = null;
    delete paneY.q;
    delete paneY.r;
    view.innerHTML =
      '<div class="lab' +
      (anim ? " enter" : "") +
      '" id="lab" data-pane="' +
      state.pane +
      '">' +
      '<section class="lab-head"><button type="button" class="btn text" data-act="results" style="justify-self:start;padding-left:0">' +
      ic("left", "l") +
      "Retour au bilan</button>" +
      '<h1 id="qt" tabindex="-1">Les coulisses du bilan</h1>' +
      '<p class="lead">' +
      fr(
        "Changez une réponse et regardez le bilan se recomposer. Sous chaque message, vous voyez la réponse qui l’a fait apparaître. Ce que vous faites ici ne touche pas à votre vrai bilan.",
      ) +
      "</p></section>" +
      '<details class="card how"><summary>Comment le bilan est construit' +
      ic("down", "cv") +
      '</summary><div class="how-b">' +
      "<p>" +
      fr(
        "<strong>Pas de note, pas de points.</strong> Chaque message est relié à une ou plusieurs réponses précises. La réponse est là : le message apparaît. Elle n’y est plus : il disparaît.",
      ) +
      "</p>" +
      "<p>" +
      fr(
        '<strong>Quatre familles.</strong> <span class="fam u">Peut blesser</span> <span class="fam c">À regarder</span> <span class="fam p">Point positif</span> <span class="fam m">Un mot sur vos réponses</span>. Les messages sont ensuite rangés par thème.',
      ) +
      "</p>" +
      "<p>" +
      fr(
        "<strong>Un petit point de couleur</strong> à côté d’une réponse veut dire qu’elle fait apparaître un message à elle seule. D’autres messages dépendent de plusieurs réponses à la fois : ils sont détaillés sous chaque question.",
      ) +
      "</p>" +
      "<p>" +
      fr(
        "<strong>Les questions miroirs.</strong> Quatre questions portent sur des choses que presque tout le monde a vécues : la jalousie, un mot blessant, un petit mensonge, un énervement pour rien. Plusieurs « Non, jamais » font apparaître un message sur votre façon de répondre.",
      ) +
      "</p>" +
      "<p>" +
      fr(
        "<strong>Les contradictions.</strong> Quelques paires de réponses sont comparées. Quand elles ne racontent pas la même histoire, un message le signale, sans dire laquelle est juste.",
      ) +
      "</p>" +
      "<p>" +
      fr(
        "<strong>Un outil imparfait.</strong> Ces règles ont été écrites à la main. Elles ne connaissent ni votre histoire ni votre façon d’aimer, et certaines tomberont à côté pour vous. C’est pour ça qu’elles sont montrées ici.",
      ) +
      "</p>" +
      "</div></details>" +
      '<div class="card diff" id="ldiff" aria-live="polite"></div>' +
      '<div class="lab-main"><section class="lab-qs" id="lqs" aria-label="Vos réponses"></section><section class="lab-res" id="lres" aria-label="Le bilan avec ces réponses"></section></div>' +
      "</div>";
    labUpdate(false);
    if (anim) {
      const e = document.getElementById("qt");
      if (e) e.focus({ preventScroll: true });
    }
  }
  /* Sur mobile, chaque onglet des coulisses garde sa position de défilement. */
  const paneY = {};
  function setPane(p) {
    state.pane = p;
    save();
    const l = document.getElementById("lab");
    if (l) l.dataset.pane = p;
    document.querySelectorAll("#lseg button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.p === p));
    });
    document.getElementById("toast").classList.remove("show");
  }
  function smooth() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
  }
  function labGoto(id) {
    if (!matchMedia("(min-width:980px)").matches && state.pane !== "q") {
      paneY.r = window.scrollY;
      setPane("q");
    }
    const el = document.getElementById("lq-" + id);
    if (!el) return;
    el.scrollIntoView({ behavior: smooth(), block: "start" });
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
    const f = el.querySelector("button.chip:not([disabled])");
    if (f)
      setTimeout(function () {
        f.focus({ preventScroll: true });
      }, 400);
  }
  function normSteps(q, a) {
    a = Array.isArray(a) ? a.slice(0, q.rows.length) : [];
    for (let i = 0; i < q.rows.length; i++) if (a[i] === undefined) a[i] = [];
    const cut = a.indexOf(null);
    if (cut >= 0) for (let i = cut; i < q.rows.length; i++) a[i] = null;
    return a;
  }
  function labEdit(act, b) {
    const q = byId[b.dataset.q];
    if (!q) return;
    const A = state.play,
      i = +b.dataset.i,
      r = +b.dataset.r;
    let a = Array.isArray(A[q.id]) ? A[q.id].slice() : [];
    switch (act) {
      case "l-pick":
        A[q.id] = i;
        break;
      case "l-tog": {
        const op = q.opts[i];
        if (op.ex) a = a.indexOf(i) >= 0 ? [] : [i];
        else {
          a = a.filter(function (x) {
            return !q.opts[x].ex;
          });
          a =
            a.indexOf(i) >= 0
              ? a.filter(function (x) {
                  return x !== i;
                })
              : a.concat(i);
        }
        A[q.id] = a;
        break;
      }
      case "l-cell":
        a[r] = q.multi ? cellToggle(q.rows[r].opts || q.opts, a[r], i) : i;
        A[q.id] = a;
        break;
      case "l-ex": {
        a = normSteps(q, A[q.id]);
        let cur = Array.isArray(a[r]) ? a[r].slice() : [];
        cur =
          cur.indexOf(i) >= 0
            ? cur.filter(function (x) {
                return x !== i;
              })
            : cur.concat(i);
        a[r] = cur;
        A[q.id] = normSteps(q, a);
        break;
      }
      case "l-exnone": {
        a = normSteps(q, A[q.id]);
        if (a[r] === null) a[r] = [];
        else for (let j = r; j < q.rows.length; j++) a[j] = null;
        A[q.id] = normSteps(q, a);
        break;
      }
      case "l-rank":
        if (a.indexOf(i) >= 0)
          a = a.filter(function (x) {
            return x !== i;
          });
        else {
          a.push(i);
          if (a.length === q.items.length - 1)
            q.items.forEach(function (_, j) {
              if (a.indexOf(j) < 0) a.push(j);
            });
        }
        A[q.id] = a;
        break;
      case "l-rankclear":
        A[q.id] = [];
        break;
      case "l-skip":
        A[q.id] = "skip";
        break;
      case "l-restore":
        if (state.answers[q.id] === undefined) delete A[q.id];
        else A[q.id] = clone(state.answers[q.id]);
        break;
    }
    save();
    const refocus = keepFocus(b);
    labUpdate(true);
    refocus();
  }

  /* ---------- Navigation ---------- */
  function toTop() {
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }
  /* Étape où reprendre une question par étapes : la première pas encore remplie, sinon la dernière avec des mots. */
  function stepFor(q, fromEnd) {
    const a = Array.isArray(state.answers[q.id]) ? state.answers[q.id] : [];
    if (fromEnd) {
      const n = a.indexOf(null);
      if (n >= 0) return n;
      let k = 0;
      a.forEach(function (x, i) {
        if (Array.isArray(x)) k = i;
      });
      return k;
    }
    return a.length < q.rows.length ? a.length : 0;
  }
  function goTo(i, fromEnd) {
    state.idx = i;
    if (typeof i === "number" && i >= 0 && isSteps(Q[i]))
      state.sub = stepFor(Q[i], fromEnd);
    save();
    render();
    toTop();
  }
  function next() {
    const q = Q[state.idx];
    if (!q) return;
    if (isSteps(q)) {
      const sub = state.sub || 0,
        a = Array.isArray(state.answers[q.id])
          ? state.answers[q.id].slice()
          : [];
      if (a[sub] === undefined) a[sub] = [];
      state.answers[q.id] = a;
      if (a[sub] !== null && sub < q.rows.length - 1) {
        /* En avançant d’une étape, rien n’est coché d’avance : un ancien « pas d’autre ex » est oublié. */
        if (a[sub + 1] === null) a.length = sub + 1;
        state.sub = sub + 1;
        save();
        render();
        toTop();
        return;
      }
    }
    if (!answered(q)) return;
    const j = nextIdx(state.idx, 1);
    goTo(j < Q.length ? j : "results", false);
  }
  function skip() {
    const q = Q[state.idx];
    if (!q) return;
    state.answers[q.id] = "skip";
    state.sub = 0;
    const j = nextIdx(state.idx, 1);
    goTo(j < Q.length ? j : "results", false);
  }
  function back() {
    const q = typeof state.idx === "number" ? Q[state.idx] : null;
    if (isSteps(q) && (state.sub || 0) > 0) {
      state.sub--;
      save();
      render();
      toTop();
      return;
    }
    const j = nextIdx(state.idx === "results" ? Q.length : state.idx, -1);
    goTo(j >= 0 ? j : -1, true);
  }
  function chooseSingle(i) {
    const q = Q[state.idx],
      at = state.idx;
    state.answers[q.id] = i;
    save();
    view.querySelectorAll('[data-act="pick"]').forEach(function (b) {
      const on = +b.dataset.i === i;
      b.classList.toggle("on", on);
      b.classList.remove("just");
      b.setAttribute("aria-checked", String(on));
      if (on) {
        void b.offsetWidth;
        b.classList.add("just");
        b.focus({ preventScroll: true });
      }
    });
    const sk = view.querySelector(".skipq");
    if (sk) sk.classList.add("gone-out");
    const nx = view.querySelector('[data-act="next"]');
    if (nx) {
      nx.disabled = false;
      nx.classList.remove("auto");
      void nx.offsetWidth;
      nx.classList.add("auto");
    }
    cancelAuto();
    autoT = setTimeout(function () {
      if (state.idx !== at) return;
      const art = view.querySelector("article.q");
      if (art) art.classList.add("leave");
      autoT = setTimeout(function () {
        autoT = null;
        if (state.idx === at) next();
      }, AUTO_LEAVE);
    }, AUTO_WAIT);
  }
  function keepFocus(b) {
    let sel = '[data-act="' + b.dataset.act + '"]';
    ["q", "i", "r", "p", "id"].forEach(function (k) {
      if (b.dataset[k] != null)
        sel += "[data-" + k + '="' + b.dataset[k] + '"]';
    });
    return function () {
      const n = view.querySelector(sel);
      if (n) n.focus({ preventScroll: true });
    };
  }
  function resetAll() {
    state.answers = {};
    state.play = null;
    state.pane = "q";
  }

  document.addEventListener(
    "toggle",
    function (e) {
      const d = e.target;
      if (d && d.dataset && d.dataset.tr) labOpen[d.dataset.tr] = d.open;
    },
    { capture: true, signal: ac.signal },
  );

  document.addEventListener(
    "click",
    function (e) {
      const b = e.target.closest("[data-act]");
      if (!b || b.disabled) return;
      const act = b.dataset.act;
      const before = state.idx;
      if (HAPTIC_PICK.indexOf(act) >= 0) haptic();
      if (
        act.indexOf("l-") === 0 &&
        ["l-pane", "l-reset", "l-goto"].indexOf(act) < 0
      ) {
        labEdit(act, b);
        return;
      }
      const q =
        typeof state.idx === "number" && state.idx >= 0 ? Q[state.idx] : null;
      let refocus;
      switch (act) {
        case "pick":
          chooseSingle(+b.dataset.i);
          break;
        case "toggle": {
          const i = +b.dataset.i,
            op = q.opts[i];
          let a = Array.isArray(state.answers[q.id])
            ? state.answers[q.id].slice()
            : [];
          if (op.ex) {
            a = a.indexOf(i) >= 0 ? [] : [i];
          } else {
            a = a.filter(function (x) {
              return !q.opts[x].ex;
            });
            a =
              a.indexOf(i) >= 0
                ? a.filter(function (x) {
                    return x !== i;
                  })
                : a.concat(i);
          }
          state.answers[q.id] = a;
          save();
          justI = i;
          refocus = keepFocus(b);
          render(false);
          refocus();
          break;
        }
        case "cell": {
          const a = Array.isArray(state.answers[q.id])
            ? state.answers[q.id].slice()
            : [];
          const r = +b.dataset.r,
            i = +b.dataset.i;
          a[r] = q.multi ? cellToggle(q.rows[r].opts || q.opts, a[r], i) : i;
          state.answers[q.id] = a;
          save();
          justI = b.dataset.r + ":" + b.dataset.i;
          refocus = keepFocus(b);
          render(false);
          refocus();
          break;
        }
        case "rank": {
          const i = +b.dataset.i;
          let a = Array.isArray(state.answers[q.id])
            ? state.answers[q.id].slice()
            : [];
          if (a.indexOf(i) >= 0)
            a = a.filter(function (x) {
              return x !== i;
            });
          else {
            a.push(i);
            if (a.length === q.items.length - 1) {
              q.items.forEach(function (_, j) {
                if (a.indexOf(j) < 0) a.push(j);
              });
            }
          }
          state.answers[q.id] = a;
          save();
          justI = i;
          refocus = keepFocus(b);
          render(false);
          refocus();
          break;
        }
        case "rankclear":
          state.answers[q.id] = [];
          save();
          render(false);
          break;
        case "next":
          next();
          break;
        case "back":
          goBackTo(backTarget(), back);
          break;
        case "skip":
          skip();
          break;
        case "start":
          resetAll();
          goTo(0, false);
          break;
        case "resume":
          goTo(+b.dataset.to, false);
          break;
        case "extog": {
          const sub = state.sub || 0,
            i = +b.dataset.i;
          const a = Array.isArray(state.answers[q.id])
            ? state.answers[q.id].slice()
            : [];
          for (let j = 0; j < sub; j++) if (!Array.isArray(a[j])) a[j] = [];
          let cur = Array.isArray(a[sub]) ? a[sub].slice() : [];
          cur =
            cur.indexOf(i) >= 0
              ? cur.filter(function (x) {
                  return x !== i;
                })
              : cur.concat(i);
          a[sub] = cur;
          state.answers[q.id] = a;
          save();
          justI = i;
          refocus = keepFocus(b);
          render(false);
          refocus();
          break;
        }
        case "exnone": {
          const sub = state.sub || 0;
          const a = (
            Array.isArray(state.answers[q.id])
              ? state.answers[q.id].slice(0, sub)
              : []
          ).map(function (x) {
            return Array.isArray(x) ? x : [];
          });
          if (
            Array.isArray(state.answers[q.id]) &&
            state.answers[q.id][sub] === null
          ) {
            a[sub] = [];
            state.answers[q.id] = a;
            save();
            refocus = keepFocus(b);
            render(false);
            refocus();
            break;
          }
          while (a.length < q.rows.length) a.push(null);
          state.answers[q.id] = a;
          save();
          {
            const j = nextIdx(state.idx, 1);
            goTo(j < Q.length ? j : "results", false);
          }
          break;
        }
        case "results": {
          const showResults = function () {
            state.idx = "results";
            save();
            render();
            toTop();
          };
          if (state.idx === "lab") goBackTo({ idx: "results", sub: 0 }, showResults);
          else showResults();
          break;
        }
        case "home":
          state.idx = -1;
          save();
          render();
          toTop();
          break;
        case "lab": {
          state.play = clone(state.answers) || {};
          state.idx = "lab";
          state.pane = "q";
          save();
          render();
          toTop();
          const id = b.dataset.q;
          if (id)
            setTimeout(function () {
              labGoto(id);
            }, 120);
          break;
        }
        case "l-pane": {
          const p = b.dataset.p;
          if (p === state.pane) break;
          paneY[state.pane] = window.scrollY;
          setPane(p);
          if (paneY[p] != null) {
            window.scrollTo(0, paneY[p]);
            break;
          }
          const m = document.querySelector(".lab-main");
          if (m) {
            const y = m.getBoundingClientRect().top + window.scrollY - 130;
            if (window.scrollY > y) window.scrollTo(0, y);
          }
          break;
        }
        case "l-reset":
          state.play = clone(state.answers) || {};
          save();
          labUpdate(true);
          break;
        case "l-goto":
          labGoto(b.dataset.q);
          break;
        case "pron":
          state.pron = b.dataset.p;
          save();
          refocus = keepFocus(b);
          render(false);
          refocus();
          break;
        case "theme": {
          const el = document.getElementById("th-" + b.dataset.ax);
          if (el) el.scrollIntoView({ behavior: smooth(), block: "start" });
          break;
        }
        case "restart": {
          const lab = b.querySelector("span");
          if (b.dataset.armed) {
            resetAll();
            state.idx = -1;
            save();
            render();
            toTop();
          } else {
            b.dataset.armed = "1";
            if (lab) lab.textContent = "Confirmer : tout effacer";
            setTimeout(function () {
              if (b.isConnected && b.dataset.armed) {
                delete b.dataset.armed;
                if (lab) lab.textContent = b.dataset.label;
              }
            }, 4000);
          }
          break;
        }
        case "copy": {
          const txt = summaryText(
            lastR || reading(Q, state.answers, state.pron, TX, {}),
          );
          const lab = b.querySelector("span") || b;
          const fallback = function () {
            const ta = document.getElementById("sumtxt");
            if (ta) {
              ta.hidden = false;
              ta.value = txt;
              ta.focus();
              ta.select();
            }
            lab.textContent = "Sélectionnez le texte et copiez-le";
          };
          try {
            navigator.clipboard.writeText(txt).then(function () {
              lab.textContent = "Résumé copié";
              setTimeout(function () {
                if (b.isConnected) lab.textContent = "Copier le résumé";
              }, 2000);
            }, fallback);
          } catch (err) {
            fallback();
          }
          break;
        }
      }
      /* Avancer d’une étape : un tic léger ; arriver au bilan : un tic plus marqué. */
      if (act === "next" || act === "skip")
        haptic(state.idx === "results" && before !== "results");
    },
    on,
  );

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = state.idx;
      if (typeof i !== "number" || i < 0) return;
      const q = Q[i];
      if ((q.type === "tf" || q.type == null) && /^[1-9]$/.test(e.key)) {
        const n = +e.key - 1;
        if (n < q.opts.length) {
          e.preventDefault();
          chooseSingle(n);
        }
      } else if (e.key === "Enter" && !e.target.closest("button")) {
        next();
      }
    },
    on,
  );

  /* ---------- Retour haptique ----------
     Android : navigator.vibrate. iPhone (iOS 18 et plus) : Safari n’a pas cette API, mais activer
     un interrupteur natif caché (<input type="checkbox" switch>) déclenche le retour haptique du système.
     Ailleurs, c’est sans effet. Coupé si l’appareil demande moins d’animations. */
  const HAPTIC_PICK = [
    "pick",
    "toggle",
    "cell",
    "extog",
    "exnone",
    "rank",
    "pron",
    "l-pick",
    "l-tog",
    "l-cell",
    "l-ex",
    "l-exnone",
    "l-rank",
  ];
  const hapticSwitch = (function () {
    if (typeof navigator.vibrate === "function") return null;
    const l = document.createElement("label");
    l.setAttribute("aria-hidden", "true");
    l.style.cssText =
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none";
    const i = document.createElement("input");
    i.type = "checkbox";
    i.setAttribute("switch", "");
    i.tabIndex = -1;
    l.appendChild(i);
    document.body.appendChild(l);
    ac.signal.addEventListener("abort", function () {
      l.remove();
    });
    return l;
  })();
  function haptic(strong) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (typeof navigator.vibrate === "function")
        navigator.vibrate(strong ? [14, 70, 22] : 10);
      else if (hapticSwitch) {
        const a = document.activeElement;
        hapticSwitch.click();
        if (strong)
          setTimeout(function () {
            hapticSwitch.click();
          }, 90);
        if (a && a !== document.activeElement && a.focus)
          a.focus({ preventScroll: true });
      }
    } catch (e) {}
  }

  /* ---------- Historique du navigateur ----------
     Chaque étape (question, étape d’une question, bilan, coulisses) est une vraie entrée d’historique.
     Le bouton ou le geste retour du téléphone revient donc à l’étape précédente, et sur iPhone
     l’animation de glissement montre bien cette étape. Depuis l’accueil, le retour quitte le site. */
  let restoring = false;
  function navKey() {
    const i = state.idx;
    return {
      idx: i,
      sub: typeof i === "number" && i >= 0 && isSteps(Q[i]) ? state.sub || 0 : 0,
    };
  }
  function syncHistory() {
    if (restoring) return;
    const cur = navKey(),
      hs = history.state;
    if (hs && hs.cc === 2 && hs.idx === cur.idx && hs.sub === cur.sub) return;
    const prev = hs && hs.cc === 2 ? { idx: hs.idx, sub: hs.sub } : null;
    history.pushState({ cc: 2, idx: cur.idx, sub: cur.sub, prev: prev }, "");
  }
  /* Le bouton Retour de l’app passe par l’historique quand l’étape précédente y est déjà. */
  function goBackTo(t, fallback) {
    const hs = history.state;
    if (hs && hs.cc === 2 && hs.prev && hs.prev.idx === t.idx && hs.prev.sub === t.sub)
      history.back();
    else fallback();
  }
  function backTarget() {
    const q = typeof state.idx === "number" ? Q[state.idx] : null;
    if (isSteps(q) && (state.sub || 0) > 0)
      return { idx: state.idx, sub: state.sub - 1 };
    const j = nextIdx(state.idx === "results" ? Q.length : state.idx, -1);
    const idx = j >= 0 ? j : -1;
    return { idx: idx, sub: idx >= 0 && isSteps(Q[idx]) ? stepFor(Q[idx], true) : 0 };
  }
  try {
    history.scrollRestoration = "manual";
  } catch (e) {}
  {
    const hs = history.state,
      cur = navKey();
    history.replaceState(
      { cc: 2, idx: cur.idx, sub: cur.sub, prev: hs && hs.cc === 2 ? hs.prev : null },
      "",
    );
  }
  window.addEventListener(
    "popstate",
    function (e) {
      const h = e.state;
      if (!h || h.cc !== 2) return;
      let idx = h.idx;
      if ((idx === "results" || idx === "lab") && !Q.every(done)) idx = -1;
      if (typeof idx === "number" && idx >= 0 && !Q[idx]) idx = -1;
      state.idx = idx;
      state.sub = h.sub || 0;
      if (idx === "lab" && !state.play) state.play = clone(state.answers) || {};
      save();
      restoring = true;
      render();
      restoring = false;
      toTop();
    },
    on,
  );

  /* ---------- Démarrage ---------- */
  const saved = load();
  if (saved) {
    if (PR[saved.pron]) state.pron = saved.pron;
    if (saved.answers && typeof saved.answers === "object")
      state.answers = saved.answers;
    if (saved.play && typeof saved.play === "object") state.play = saved.play;
    if (saved.pane === "r") state.pane = "r";
    if ((saved.idx === "results" || saved.idx === "lab") && Q.every(done))
      state.idx = saved.idx;
  }
  render(false);
  return function () {
    ac.abort();
  };
}
