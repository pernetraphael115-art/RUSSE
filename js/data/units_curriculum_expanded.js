// Leçons complémentaires pour Ruska (A1, A2, B1)
// Chaque leçon inclut des fiches de cours claires, des quiz interactifs, du vocabulaire avec exemples et des phrases de traduction expliquées.

export const EXPANDED_UNITS = [
  // ── 1. A1 : Les Nombres, l'Heure et le Temps ────────────────
  {
    id: 'a1-chiffres',
    level: 'A1',
    icon: '🔢',
    title: 'Les Chiffres, l’Heure & le Temps',
    sub: 'Compter de 0 à 100, dire l’heure et les jours de la semaine',
    lesson: [
      {
        t: 'Compter de 0 à 10 en russe',
        b: [
          ['p', "Les chiffres sont le premier outil indispensable au quotidien (prix, téléphone, heure). Apprenez-les avec leur accent tonique :"],
          ['table', ['Chiffre', 'Russe', 'Prononciation'], [
            ['0', '{ноль}', '[nól]'],
            ['1', '{оди́н} (m.) / {одна́} (f.) / {одно́} (n.)', '[adín / adná / adnó]'],
            ['2', '{два} (m./n.) / {две} (f.)', '[dva / dvyé]'],
            ['3', '{три}', '[tri]'],
            ['4', '{четы́ре}', '[tchitýrye]'],
            ['5', '{пять}', '[pyat’]'],
            ['6', '{шесть}', '[shest’]'],
            ['7', '{семь}', '[syem’]'],
            ['8', '{во́семь}', '[vósyem’]'],
            ['9', '{де́вять}', '[dévyat’]'],
            ['10', '{де́сять}', '[désyat’]']
          ]],
          ['tip', "{оди́н} et {два} s'accordent en genre avec le nom qui suit : {один стол} (1 table m.), {одна книга} (1 livre f.), {два стола}, {две книги}."]
        ]
      },
      {
        t: 'La règle magique des nombres russes (1, 2-4, 5+)',
        b: [
          ['p', "En russe, la forme du nom après un nombre dépend du dernier chiffre :"],
          ['table', ['Terminaison du nombre', 'Cas du nom', 'Exemple avec {рубль} (rouble)'], [
            ['Finit par **1** (sauf 11)', 'Nominatif singulier', '{оди́н рубль} (1 rouble)'],
            ['Finit par **2, 3, 4** (sauf 12-14)', 'Génitif singulier', '{два рубля́}, {четы́ре рубля́}'],
            ['Finit par **5 à 20, ou 0**', 'Génitif pluriel', '{пять рубле́й}, {де́сять рубле́й}']
          ]],
          ['why', "Cette règle s'applique aussi pour l'âge : {один год} (1 an), {два года} (2 ans), {пять лет} (5 ans) !"],
          ['quiz', 'Quelle est la forme correcte pour « 3 roubles » ?', ['три рубль', 'три рубля', 'три рублей'], 1, 'Après 2, 3, 4, le nom se met au Génitif singulier : {три рубля́}.']
        ]
      },
      {
        t: 'Les jours de la semaine & l’heure',
        b: [
          ['p', "Pour dire « lundi », « mardi » ou « à quelle heure ? » :"],
          ['table', ['Jour', 'Russe', 'Le [jour] ({в} + Accusatif)'], [
            ['Lundi', '{понеде́льник}', '{в понеде́льник} (le lundi)'],
            ['Mardi', '{вто́рник}', '{во вто́рник}'],
            ['Mercredi', '{среда́}', '{в сре́ду}'],
            ['Jeudi', '{четве́рг}', '{в четве́рг}'],
            ['Vendredi', '{пя́тница}', '{в пя́тницу}'],
            ['Samedi', '{суббо́та}', '{в суббо́ту}'],
            ['Dimanche', '{воскресе́нье}', '{в воскресе́нье}']
          ]],
          ['tip', "Pour demander l'heure : {Ско́лько сейча́с вре́мени?} (Quelle heure est-il maintenant ?). Réponse simple : {Сейча́с два часа́} (Il est 2 heures)."]
        ]
      }
    ],
    words: [
      ['ско́лько', 'combien', 'mot interrogatif', 'Exige le génitif : {Ско́лько э́то сто́ит?}', [['Ско́лько сто́ит э́тот сувени́р?', 'Combien coûte ce souvenir ?', 'Achats']]],
      ['вре́мя', 'temps / heure', 'nom n. en -мя', 'Génitif : {вре́мени}. Pluriel : {времена́}.', [['У нас есть вре́мя.', 'Nous avons le temps.', 'Génitif']]],
      ['час', 'heure (durée ou horloge)', 'nom m.', 'Génitif : {часа́}, pluriel : {часы́} (aussi la montre).', [['Сейча́с оди́н час.', 'Il est une heure.', 'Heure']]],
      ['мину́та', 'minute', 'nom f.', 'Pluriel : {мину́ты}. Accusatif : {мину́ту}.', [['Подожди́ одну́ мину́ту!', 'Attends une minute !', 'Impératif']]],
      ['сего́дня', 'aujourd’hui', 'adverbe de temps', 'Prononcé [sivódnya].', [['Сего́дня прекра́сный день.', 'Aujourd’hui est une belle journée.', 'Temps']]],
      ['за́втра', 'demain', 'adverbe de temps', 'Accent sur le premier a.', [['До за́втра!', 'À demain !', 'Politesse']]],
      ['вчера́', 'hier', 'adverbe de temps', 'Accent sur le a final.', [['Вчера́ мы бы́ли в теа́тре.', 'Hier nous étions au théâtre.', 'Passé']]],
      ['рубль', 'rouble', 'nom m.', 'Monnaie russe. Pluriel génitif : {рубле́й}.', [['Сто рубле́й.', 'Cent roubles.', 'Monnaie']]]
    ],
    sentences: [
      {
        ru: 'Ско́лько сейча́с вре́мени?',
        fr: 'Quelle heure est-il maintenant ?',
        alt: ['Quelle heure est-il ?', 'Il est quelle heure maintenant ?'],
        w: [['ско́лько', 'combien', 'interrogatif'], ['сейча́с', 'maintenant', 'adverbe de temps'], ['вре́мени', 'de temps', 'génitif neutre de время']],
        g: "{время} est un nom neutre en -мя dont le génitif régulier est {времени}."
      },
      {
        ru: 'Сейча́с ро́вно пять часо́в.',
        fr: 'Il est exactement cinq heures.',
        alt: ['Il est pile 5 heures.', 'Il est exactement 17 heures.'],
        w: [['сейча́с', 'maintenant', 'adverbe'], ['ро́вно', 'exactement / pile', 'adverbe'], ['пять часо́в', 'cinq heures', 'quantité + génitif pluriel']],
        g: "Après le chiffre 5, le nom {час} prend obligatoirement le Génitif pluriel : {часо́в}."
      },
      {
        ru: 'В суббо́ту мы идём в кино́.',
        fr: 'Samedi, nous allons au cinéma.',
        alt: ['Le samedi nous allons au cinéma.'],
        w: [['в суббо́ту', 'le samedi', 'accusatif f. temporel avec В'], ['мы идём', 'nous allons (à pied)', 'présent unidir.'], ['в кино́', 'au cinéma', 'direction accusatif']],
        g: "Pour indiquer le jour où une action se déroule, on emploie {в + Accusatif} : {в суббо́ту}."
      }
    ]
  },

  // ── 2. A1 : La Famille & les Possessifs ──────────────────────
  {
    id: 'a1-famille',
    level: 'A1',
    icon: '👨‍👩‍👧',
    title: 'La Famille & les Possessifs',
    sub: 'Parler de ses proches et maîtriser « mon, ton, notre, votre »',
    lesson: [
      {
        t: 'Les adjectifs possessifs en russe',
        b: [
          ['p', "En russe, « mon », « ton », « notre » et « votre » s'accordent en genre et en nombre avec l'objet possédé :"],
          ['table', ['Possesseur', 'Masculin', 'Féminin', 'Neutre', 'Pluriel'], [
            ['Moi (mon)', '{мой}', '{моя́}', '{моё}', '{мои́}'],
            ['Toi (ton)', '{твой}', '{твоя́}', '{твоё}', '{твои́}'],
            ['Nous (notre)', '{наш}', '{на́ша}', '{на́ше}', '{на́ши}'],
            ['Vous (votre)', '{ваш}', '{ва́ша}', '{ва́ше}', '{ва́ши}']
          ]],
          ['tip', "**Les possessifs invariables de la 3e personne :** Pour « son/sa/leur », le russe utilise les génitifs figés des pronoms qui NE changent JAMAIS de forme : {его́} (à lui [yivó]), {её} (à elle [yiyó]), {их} (à eux/elles [ikh])."]
        ]
      },
      {
        t: 'Exprimer la possession : « J’ai... » ({У меня есть})',
        b: [
          ['p', "En russe, il n'existe pas de verbe « avoir » courant. On dit littéralement « Auprès de moi est [quelque chose] » :"],
          ['table', ['Pronom français', 'Structure russe ({У} + Génitif)', 'Exemple'], [
            ['J’ai', '{У меня́ есть...}', '{У меня́ есть брат.} (J’ai un frère.)'],
            ['Tu as', '{У тебя́ есть...}', '{У тебя́ есть маши́на?} (Tu as une voiture ?)'],
            ['Il a', '{У него́ есть...}', '{У него́ есть соба́ка.} (Il a un chien.)'],
            ['Elle a', '{У неё есть...}', '{У неё есть ко́шка.} (Elle a un chat.)'],
            ['Nous avons', '{У нас есть...}', '{У нас есть кварти́ра.} (Nous avons un appart.)'],
            ['Vous avez', '{У вас есть...}', '{У вас есть вопро́сы?} (Avez-vous des questions ?)'],
            ['Ils ont', '{У них есть...}', '{У них есть де́ти.} (Ils ont des enfants.)']
          ]],
          ['why', "Ce qui est possédé est le **sujet** de la phrase et reste au cas **Nominatif** !"],
          ['quiz', 'Comment dit-on « Ma sœur a un chat » ?', ['Моя сестра есть кот', 'У моей сестры есть кот', 'У меня есть сестра'], 1, 'On met le possesseur au génitif après У : {У мое́й сестры́ есть кот}.']
        ]
      }
    ],
    words: [
      ['роди́тели', 'parents', 'nom pl.', 'Génitif pluriel : {роди́телей}.', [['Мои́ роди́тели живу́т в Пари́же.', 'Mes parents vivent à Paris.', 'Lieu']]],
      ['де́ти', 'enfants', 'nom pl. irrégulier', 'Singulier : {ребёнок}. Génitif : {дете́й}.', [['У них двое дете́й.', 'Ils ont deux enfants.', 'Famille']]],
      ['ба́бушка', 'grand-mère', 'nom f.', 'Figure chaleureuse très respectée.', [['Ба́бушка печёт вку́сные пирожки́.', 'La grand-mère cuisine de délicieux pirojkis.', 'Cuisine']]],
      ['де́душка', 'grand-père', 'nom m.', 'Terminaison en -а mais masculin.', [['Мой де́душка лю́бит шахматы.', 'Mon grand-père aime les échecs.', 'Loisir']]],
      ['друг', 'ami', 'nom m.', 'Pluriel irrégulier : {друзья́} [drouz-ya].', [['Э́то мой лу́чший друг.', 'C’est mon meilleur ami.', 'Amitié']]],
      ['подру́га', 'amie (femme)', 'nom f.', 'Pluriel : {подру́ги}.', [['Она́ моя́ ста́рая подру́га.', 'C’est une vieille amie à moi.', 'Féminin']]],
      ['ма́льчик', 'garçon', 'nom m.', 'Pluriel : {ма́льчики}.', [['Ма́льчик чита́ет ска́зку.', 'Le garçon lit un conte.', 'Lecture']]],
      ['де́вочка', 'fillette / jeune fille', 'nom f.', 'Pluriel : {де́вочки}.', [['Ма́ленькая де́вочка улыба́ется.', 'La petite fille sourit.', 'Présent']]]
    ],
    sentences: [
      {
        ru: 'У меня́ есть брат и сестра́.',
        fr: 'J’ai un frère et une sœur.',
        alt: ['J’ai un frère et une sœur à la maison.'],
        w: [['у меня́ есть', 'auprès de moi se trouve / j’ai', 'structure de possession'], ['брат', 'un frère', 'sujet m. nominatif'], ['и', 'et', 'conjonction'], ['сестра́', 'une sœur', 'sujet f. nominatif']],
        g: "Dans la construction de possession {у меня есть}, les objets possédés ({брат}, {сестра}) sont les sujets au cas Nominatif."
      },
      {
        ru: 'Как зову́т твою́ ма́му?',
        fr: 'Comment s’appelle ta mère ?',
        alt: ['Quel est le prénom de ta mère ?', 'Comment s’appelle ta maman ?'],
        w: [['как зову́т', 'comment appelle-t-on', 'litt. « comment appellent-ils »'], ['твою́ ма́му', 'ta mère', 'accusatif féminin de твоя мама']],
        g: "Pour demander le nom de quelqu’un, le russe utilise {как зовут + Accusatif} (litt. « comment appellent-ils ta mère ? »)."
      },
      {
        ru: 'Э́то на́ша семья́.',
        fr: 'C’est notre famille.',
        alt: ['Voici notre famille.'],
        w: [['э́то', 'c’est / voici', 'démonstratif'], ['на́ша', 'notre', 'possessif féminin'], ['семья́', 'famille', 'nom féminin']],
        g: "Le possessif s’accorde en genre : {семья} étant féminin, on emploie {наша}."
      }
    ]
  },

  // ── 3. A1 : Au Restaurant & la Gastronomie ──────────────────
  {
    id: 'a1-restaurant',
    level: 'A1',
    icon: '🍽️',
    title: 'Au Restaurant & la Nourriture',
    sub: 'Commander, exprimer ses goûts et demander l’addition',
    lesson: [
      {
        t: 'Comment commander poliment en russe',
        b: [
          ['p', "Pour commander au restaurant ou au café, les russophones utilisent principalement deux formules élégantes :"],
          ['ul', [
            "**{Я бу́ду...} + Accusatif** : « Je prendrai... » (Litt. « Je serai... »). C'est la formule la plus naturelle et usuelle.",
            "**{Да́йте, пожа́луйста...} + Accusatif** : « Donnez, s'il vous plaît... »",
            "**{Принеси́те, пожа́луйста...} + Accusatif** : « Apportez, s'il vous plaît... »"
          ]],
          ['tip', "Contrairement au français, dire « Donnez s'il vous plaît » ({Дайте, пожалуйста}) n'est absolument pas impoli en russe : avec {пожалуйста}, c'est parfaitement courtois !"]
        ]
      },
      {
        t: 'Les boissons et les spécialités russes',
        b: [
          ['p', "Le lexique de base pour régaler ses papilles :"],
          ['table', ['Français', 'Russe', 'Note culturelle'], [
            ['Thé noir / vert', '{чёрный / зелёный чай}', 'Boisson nationale n°1, servie très chaude'],
            ['Café au lait', '{ко́фе с молоком}', '{кофе} est traditionnellement masculin invariable'],
            ['Eau minérale', '{минера́льная вода́}', 'Avec gaz ({с га́зом}) ou plate ({без га́за})'],
            ['Soupe Bortsch', '{борщ}', 'Soupe traditionnelle à la betterave'],
            ['Raviolis russes', '{пельме́ни}', 'Farcis à la viande, servis avec crème aigre'],
            ['Crêpes russes', '{блины́}', 'Fines crêpes dégustées salées ou sucrées'],
            ['Addition', '{счёт}', '« Принесите счёт, пожалуйста »']
          ]],
          ['quiz', 'Comment demande-t-on poliment l’addition au serveur ?', ['Дайте деньги', 'Принесите счёт, пожалуйста', 'Сколько меню'], 1, 'La formule consacrée est : {Принеси́те счёт, пожа́луйста}.']
        ]
      }
    ],
    words: [
      ['рестора́н', 'restaurant', 'nom m.', 'Prépositionnel : {в рестора́не}.', [['Мы у́жинаем в рестора́не.', 'Nous dînons au restaurant.', 'Sortie']]],
      ['меню́', 'menu / carte', 'nom n. invariable', 'D’origine française.', [['Покажи́те меню́, пожа́луйста.', 'Montrez la carte, s’il vous plaît.', 'Commande']]],
      ['официа́нт', 'serveur', 'nom m.', 'La serveuse se dit {официа́нтка}.', [['Официа́нт принёс зака́з.', 'Le serveur a apporté la commande.', 'Service']]],
      ['зака́з', 'commande', 'nom m.', 'Verbe : {заказа́ть} (commander).', [['Ваш зака́з гото́в.', 'Votre commande est prête.', 'Restaurant']]],
      ['хлеб', 'pain', 'nom m.', 'Élément sacré de la table russe.', [['Чёрный хлеб о́чень вку́сный.', 'Le pain noir est très bon.', 'Tradition']]],
      ['мя́со', 'viande', 'nom n.', 'Sans viande : {без мя́са}.', [['Я не ем мя́со.', 'Je ne mange pas de viande.', 'Régime']]],
      ['ры́ба', 'poisson', 'nom f.', 'Accusatif : {ры́бу}.', [['Све́жая ры́ба.', 'Du poisson frais.', 'Cuisine']]],
      ['са́хар', 'sucre', 'nom m.', 'Sans sucre : {без са́хара}.', [['Чай без са́хара, пожа́луйста.', 'Du thé sans sucre, s’il vous plaît.', 'Boisson']]]
    ],
    sentences: [
      {
        ru: 'Я бу́ду борщ и зелёный чай.',
        fr: 'Je prendrai un bortsch et un thé vert.',
        alt: ['Je vais prendre un bortsch et du thé vert.'],
        w: [['я бу́ду', 'je serai / je prendrai', 'formule de commande'], ['борщ', 'le bortsch', 'accusatif masculin inanimé'], ['и', 'et', 'conjonction'], ['зелёный чай', 'du thé vert', 'accusatif masculin']],
        g: "L’accusatif inanimé masculin étant identique au nominatif, {борщ} et {зелёный чай} ne changent pas de terminaison."
      },
      {
        ru: 'Принеси́те счёт, пожа́луйста.',
        fr: 'Apportez l’addition, s’il vous plaît.',
        alt: ['L’addition s’il vous plaît.', 'Pourriez-vous apporter l’addition ?'],
        w: [['принеси́те', 'apportez', 'impératif poli de принести'], ['счёт', 'l’addition / la note', 'accusatif masculin'], ['пожа́луйста', 's’il vous plaît', 'formule de politesse']],
        g: "La formule {принеси́те + accusatif} est le standard pour interpeller le personnel de salle."
      },
      {
        ru: 'Э́то блю́до о́чень вку́сное!',
        fr: 'Ce plat est très délicieux !',
        alt: ['Ce plat est très bon !', 'Ce mets est vraiment savoureux !'],
        w: [['э́то блю́до', 'ce plat', 'sujet neutre'], ['о́чень', 'très', 'adverbe de degré'], ['вку́сное', 'savoureux / délicieux', 'adjectif neutre au nominatif']],
        g: "L’adjectif {вку́сное} s’accorde au neutre avec le sujet {блю́до}."
      }
    ]
  },

  // ── 4. A2 : Le Datif (À qui ? L'Âge & les Émotions) ─────────
  {
    id: 'a2-datif',
    level: 'A2',
    icon: '🎁',
    title: 'Le Datif : À qui ? Âge & Émotions',
    sub: 'Le destinataire, l’âge ({мне 25 лет}) et les goûts ({мне нравится})',
    lesson: [
      {
        t: 'Le cas Datif : donner, téléphoner et faire plaisir',
        b: [
          ['p', "Le Datif répond à la question **Кому́?** (À qui ?) et **Чему́?** (À quoi ?). C'est le cas du complément d'objet indirect :"],
          ['table', ['Genre', 'Terminaison au Datif', 'Exemple'], [
            ['Masculin consonne', '**-у**', '{брат} → {бра́ту} (au frère)'],
            ['Masculin en -й / -ь', '**-ю**', '{друг} → {дру́гу}, {учи́тель} → {учи́телю}'],
            ['Féminin en -а / -я', '**-е**', '{сестра́} → {сестре́}, {ма́ма} → {ма́ме}'],
            ['Neutre en -о / -е', '**-у / -ю**', '{письмо́} → {письму́}'],
            ['Pluriel tous genres', '**-ам / -ям**', '{друзья́} → {друзья́м}, {де́ти} → {де́тям}']
          ]],
          ['tip', "Les pronoms au Datif sont indispensables : {мне} (à moi), {тебе́} (à toi), {ему́} (à lui), {ей} (à elle), {нам} (à nous), {вам} (à vous), {им} (à eux)."]
        ]
      },
      {
        t: 'Exprimer ses goûts : {Мне нра́вится}',
        b: [
          ['p', "En russe, on ne dit pas « J'aime ceci », mais « Ceci plaît **à moi** » :"],
          ['table', ['Structure', 'Sens', 'Règle d’accord'], [
            ['{Мне нра́вится} + Singulier', 'J’aime [objet singulier]', 'Le verbe est à la 3e pers. du singulier ({нра́вится})'],
            ['{Мне нра́вятся} + Pluriel', 'J’aime [objets pluriel]', 'Le verbe est à la 3e pers. du pluriel ({нра́вятся})'],
            ['{Тебе́ нра́вится... ?}', 'Aimes-tu... ?', 'Le sujet grammatical est ce qui plaît !']
          ]],
          ['why', "Exemples : {Мне нра́вится Москва́} (Moscou me plaît) vs {Мне нра́вятся кни́ги} (Les livres me plaisent)."],
          ['quiz', 'Comment dit-on « J’aime les langues étrangères » ?', ['Я люблю язык', 'Мне нравятся иностранные языки', 'Мне нравится языки'], 1, '{языки} étant au pluriel, le verbe s’accorde au pluriel : {нра́вятся}.']
        ]
      },
      {
        t: 'Dire son âge au Datif',
        b: [
          ['p', "Pour exprimer l'âge, la personne à qui l'on attribue les années se met au **Datif** :"],
          ['ul', [
            "**{Ско́лько вам лет?}** : Quel âge avez-vous ? (Litt. « Combien d'années à vous ? »)",
            "**{Мне два́дцать лет.}** : J'ai 20 ans. (Litt. « À moi 20 ans »)",
            "**{Ему́ три́дцать оди́н год.}** : Il a 31 ans.",
            "**{Ей два́дцать два го́да.}** : Elle a 22 ans."
          ]]
        ]
      }
    ],
    words: [
      ['нра́виться', 'plaire', 'verbe réfléchi', 'Se construit avec le Datif : {Мне нра́вится}.', [['Мне о́чень нра́вится э́та пе́сня.', 'Cette chanson me plaît beaucoup.', 'Goût']]],
      ['звони́ть', 'téléphoner / sonner', 'verbe 2e groupe', 'Exige le Datif : {звони́ть ма́ме}. Accent : {звони́т} [zvanít].', [['Я позвоню́ тебе́ ве́чером.', 'Je t’appellerai ce soir.', 'Téléphone']]],
      ['помога́ть', 'aider', 'verbe 1er groupe', 'Exige le Datif : {помога́ть дру́гу}.', [['Он всегда́ помога́ет роди́телям.', 'Il aide toujours ses parents.', 'Datif pl.']]],
      ['дари́ть', 'offrir en cadeau', 'verbe', 'Offrir quelque chose (Acc.) à quelqu’un (Dat.).', [['Что подари́ть сестре́?', 'Que convient-il d’offrir à ma sœur ?', 'Cadeau']]],
      ['хо́лодно', 'il fait froid', 'adverbe d’état', 'Avec Datif : {Мне хо́лодно} = J’ai froid.', [['Тебе́ не хо́лодно?', 'Tu n’as pas froid ?', 'Sensation']]],
      ['жа́рко', 'il fait chaud', 'adverbe d’état', 'Avec Datif : {Ему́ жа́рко} = Il a chaud.', [['Здесь сли́шком жа́рко.', 'Il fait trop chaud ici.', 'Météo']]],
      ['ну́жно', 'il faut / nécessaire', 'adverbe de besoin', 'Avec Datif : {Нам ну́жно идти́} = Nous devons partir.', [['Мне ну́жно поду́мать.', 'J’ai besoin de réfléchir.', 'Besoin']]],
      ['возраст', 'âge', 'nom m.', 'Pluriel : {во́зрасты}.', [['В любо́м во́зрасте.', 'À tout âge.', 'Prépositionnel']]]
    ],
    sentences: [
      {
        ru: 'Мне о́чень нра́вится ру́сская культу́ра.',
        fr: 'J’aime beaucoup la culture russe.',
        alt: ['La culture russe me plaît énormément.', 'J’apprécie beaucoup la culture russe.'],
        w: [['мне', 'à moi', 'pronom au datif'], ['о́чень', 'beaucoup / très', 'adverbe'], ['нра́вится', 'plaît', 'verbe réfléchi au présent'], ['ру́сская культу́ра', 'la culture russe', 'sujet féminin au nominatif']],
        g: "{русская культура} est le sujet grammatical, c’est pourquoi le verbe {нравится} s’accorde au singulier."
      },
      {
        ru: 'Ско́лько лет ва́шему бра́ту?',
        fr: 'Quel âge a votre frère ?',
        alt: ['Quel âge votre frère a-t-il ?', 'Combien d’années a votre frère ?'],
        w: [['ско́лько лет', 'combien d’années', 'expression de l’âge'], ['ва́шему бра́ту', 'à votre frère', 'datif masculin régulier']],
        g: "Pour demander l’âge en russe, le possesseur des années est au cas Datif : {вашему брату}."
      },
      {
        ru: 'Я позвоню́ тебе́ за́втра у́тром.',
        fr: 'Je t’appellerai demain matin.',
        alt: ['Je te téléphonerai demain matin.'],
        w: [['я позвоню́', 'j’appellerai', 'futur perfectif'], ['тебе́', 'à toi', 'datif de ты'], ['за́втра', 'demain', 'temps'], ['у́тром', 'le matin', 'instrumental temporel']],
        g: "Le verbe {звонить} commande le cas Datif de la personne appelée ({тебе})."
      }
    ]
  },

  // ── 5. A2 : L'Instrumental (Avec qui ? Métiers & Loisirs) ───
  {
    id: 'a2-instrumental',
    level: 'A2',
    icon: '🤝',
    title: 'L’Instrumental : Avec qui ? Métiers & Loisirs',
    sub: 'La compagnie ({с кем}), l’outil, la profession et les passions',
    lesson: [
      {
        t: 'L’Instrumental : l’accompagnement avec С / СО',
        b: [
          ['p', "Pour dire « avec quelqu'un » ou « avec quelque chose », on utilise la préposition **с / со** suivie du cas **Instrumental** :"],
          ['table', ['Genre', 'Terminaison', 'Exemple avec {с} (avec)'], [
            ['Masculin consonne', '**-ом / -ем**', '{с бра́том} (avec le frère), {с дру́гом}'],
            ['Féminin en -а / -я', '**-ой / -ей**', '{с сестро́й} (avec la sœur), {с ма́мой}'],
            ['Neutre en -о / -е', '**-ом / -ем**', '{с молоко́м} (avec du lait)'],
            ['Pluriel tous genres', '**-ами / -ями**', '{с друзья́ми} (avec des amis), {с роди́телями}']
          ]],
          ['tip', "Les pronoms à l'Instrumental : {со мной} (avec moi), {с тобо́й} (avec toi), {с ним} (avec lui), {с ней} (avec elle), {с на́ми} (avec nous), {с ва́ми} (avec vous), {с ни́ми} (avec eux)."]
        ]
      },
      {
        t: 'Les professions & devenir quelqu’un ({быть / стать})',
        b: [
          ['p', "Pour indiquer le métier ou ce qu'on devient, le russe utilise l'Instrumental **sans préposition** après les verbes {рабо́тать} (travailler comme), {быть} (être au passé/futur) et {стать} (devenir) :"],
          ['ul', [
            "**{Он рабо́тает инжене́ром.}** : Il travaille comme ingénieur.",
            "**{Она́ хо́чет стать врачо́м.}** : Elle veut devenir médecin.",
            "**{Кем вы рабо́таете?}** : Quel est votre métier ? (Litt. « En tant que qui travaillez-vous ? »)"
          ]]
        ]
      },
      {
        t: 'Les passions et centres d’intérêt',
        b: [
          ['p', "Les verbes de loisir exigent l'Instrumental sans préposition :"],
          ['table', ['Verbe', 'Sens', 'Exemple'], [
            ['{занима́ться}', 'pratiquer / étudier', '{занима́ться спо́ртом} (faire du sport)'],
            ['{интересова́ться}', 's’intéresser à', '{интересова́ться исто́рией} (s’intéresser à l’histoire)'],
            ['{увлека́ться}', 'se passionner pour', '{увлека́ться фотогра́фией} (se passionner pour la photo)']
          ]],
          ['quiz', 'Comment dit-on « Je fais du sport » en russe ?', ['Я делаю спорт', 'Я занимаюсь спортом', 'Я играю спорт'], 1, 'L’expression idiomatique est {занима́ться спо́ртом} à l’Instrumental.']
        ]
      }
    ],
    words: [
      ['занима́ться', 's’occuper de / faire (sport)', 'verbe réfléchi', 'Exige l’Instrumental : {занима́ться спо́ртом}.', [['Я регуля́рно занима́юсь спо́ртом.', 'Je fais régulièrement du sport.', 'Activité']]],
      ['интересова́ться', 's’intéresser à', 'verbe réfléchi', 'Exige l’Instrumental : {интересова́ться му́зыкой}.', [['Он интересу́ется нау́кой.', 'Il s’intéresse à la science.', 'Science']]],
      ['стать', 'devenir', 'verbe perfectif', 'Attribut à l’Instrumental : {Она́ ста́ла врачо́м}.', [['Кем ты хо́чешь стать?', 'Que veux-tu devenir ?', 'Avenir']]],
      ['инжене́р', 'ingénieur', 'nom m.', 'Instrumental : {инжене́ром}.', [['Мой па́па рабо́тает инжене́ром.', 'Mon père travaille comme ingénieur.', 'Métier']]],
      ['врач', 'médecin / docteur', 'nom m.', 'Instrumental : {врачо́м}.', [['Она́ прекра́сный врач.', 'C’est un médecin remarquable.', 'Profession']]],
      ['учи́тель', 'enseignant / professeur', 'nom m.', 'Féminin : {учи́тельница}. Instrumental : {учи́телем}.', [['Он рабо́тает учи́телем исто́рии.', 'Il travaille comme professeur d’histoire.', 'Enseignement']]],
      ['чай с лимо́ном', 'thé au citron', 'locution', 'Préposition С + Instrumental.', [['Да́йте чай с лимо́ном.', 'Donnez du thé au citron.', 'Boisson']]],
      ['кофе с молоко́м', 'café au lait', 'locution', 'Préposition С + Instrumental neutre.', [['Я пью ко́фе с молоко́м.', 'Je bois du café au lait.', 'Habitude']]]
    ],
    sentences: [
      {
        ru: 'Мы познако́мились с ней в университе́те.',
        fr: 'J’ai fait sa connaissance à l’université.',
        alt: ['Nous avons fait sa connaissance à l’université.', 'On a fait sa connaissance à la fac.'],
        w: [['мы познако́мились', 'nous avons fait connaissance', 'verbe réfléchi passé'], ['с ней', 'avec elle', 'instrumental de она avec С'], ['в университе́те', 'à l’université', 'prépositionnel']],
        g: "Le verbe {познакомиться} se construit avec {с + Instrumental} pour indiquer la personne rencontrée."
      },
      {
        ru: 'Она́ рабо́тает учи́тельницей в шко́ле.',
        fr: 'Elle travaille comme institutrice dans une école.',
        alt: ['Elle est professeure dans une école.'],
        w: [['она́ рабо́тает', 'elle travaille', 'présent'], ['учи́тельницей', 'en tant qu’enseignante', 'instrumental f. de учительница'], ['в шко́ле', 'à l’école', 'prépositionnel f.']],
        g: "Après {работать}, le métier s’exprime à l’Instrumental SANS préposition."
      },
      {
        ru: 'Я с удово́льствием помогу́ тебе́.',
        fr: 'Je t’aiderai avec plaisir.',
        alt: ['C’est avec plaisir que je vais t’aider.'],
        w: [['я', 'je', 'sujet'], ['с удово́льствием', 'avec plaisir', 'instrumental neutre de удовольствие'], ['помогу́', 'aiderai', 'futur perfectif'], ['тебе́', 'à toi', 'datif']],
        g: "{с удовольствием} est une formule de politesse très courante à l’Instrumental pour signifier son enthousiasme."
      }
    ]
  },

  // ── 6. B1 : Le Conditionnel & l’Hypothèse ───────────────────
  {
    id: 'b1-conditionnel',
    level: 'B1',
    icon: '✨',
    title: 'Le Conditionnel & le Subjonctif',
    sub: 'Exprimer le souhait, le regret et les hypothèses ({Если бы... я бы})',
    lesson: [
      {
        t: 'La structure magique du conditionnel : {БЫ} + Passé',
        b: [
          ['p', "Le russe n'a pas de temps conditionnel compliqué : il suffit d'associer la particule invariable **{бы}** (ou **{б}**) avec le verbe au **passé** !"],
          ['table', ['Français', 'Formule russe', 'Exemple'], [
            ['Je voudrais (homme)', 'Passé masculin + {бы}', '{Я хоте́л бы...}'],
            ['Je voudrais (femme)', 'Passé féminin + {бы}', '{Я хоте́ла бы...}'],
            ['Nous aimerions', 'Passé pluriel + {бы}', '{Мы хоте́ли бы...}']
          ]],
          ['tip', "{Я хоте́л бы} / {Я хоте́ла бы} est la formule reine de la politesse pour demander quelque chose avec courtoisie."]
        ]
      },
      {
        t: 'L’hypothèse irréelle : « Si... alors... » ({Е́сли бы... то...})',
        b: [
          ['p', "Pour exprimer une condition hypothétique (« Si j'avais le temps, je viendrais »), la particule {бы} doit être présente dans les **DEUX** propositions :"],
          ['ul', [
            "**{Е́сли бы у меня́ бы́ло вре́мя, я бы пришёл.}** : Si j'avais le temps, je viendrais.",
            "**{Е́сли бы ты зна́л, ты бы помо́г.}** : Si tu avais su, tu aurais aidé."
          ]],
          ['why', "Contrairement au français qui alterne Imparfait et Conditionnel (« Si j'avais... je ferais »), le russe utilise la même structure symétrique des deux côtés : {Если бы [passé], [passé] бы} !"],
          ['quiz', 'Quelle phrase est correcte pour « Si j’avais de l’argent, j’achèterais cette maison » ?', ['Если у меня есть деньги, я купил бы дом', 'Если бы у меня были деньги, я бы купил этот дом', 'Если бы деньги, я покупаю дом'], 1, 'Il faut {бы + passé} dans la subordonnée ET dans la principale.']
        ]
      },
      {
        t: 'Le but et la volonté : {Что́бы} + Passé ou Infinitif',
        b: [
          ['p', "Pour exprimer « pour que » ou le souhait qu'une autre personne agisse :"],
          ['ul', [
            "Même sujet : {что́бы} + Infinitif → **{Я учу́ ру́сский, что́бы чита́ть Пу́шкина.}** (J'apprends le russe pour lire Pouchkine).",
            "Sujets différents : {что́бы} + Passé → **{Я хочу́, что́бы ты был сщастлив.}** (Je veux que tu sois heureux)."
          ]]
        ]
      }
    ],
    words: [
      ['е́сли бы', 'si (irréel / conditionnel)', 'conjonction hypothétique', 'Exige le verbe au passé.', [['Е́сли бы не ты, я бы опозда́л.', 'Sans toi (si ce n’était toi), j’aurais été en retard.', 'Hypothèse']]],
      ['что́бы', 'afin de / pour que', 'conjonction de but', 'Avec le passé quand les sujets diffèrent.', [['Я позвони́л, что́бы предупреди́ть.', 'J’ai appelé pour prévenir.', 'But']]],
      ['хоте́лось бы', 'on aimerait / il plairait', 'verbe impersonnel conditionnel', 'Tournure très polie : {Мне хоте́лось бы}.', [['Мне хоте́лось бы вы́пить чаю.', 'J’aimerais bien boire un peu de thé.', 'Politesse']]],
      ['мечта́', 'rêve / aspiration', 'nom f.', 'Verbe : {мечта́ть} (rêver).', [['Э́то моя́ заветная мечта́.', 'C’est mon rêve le plus cher.', 'Sentiments']]],
      ['возмо́жность', 'possibilité / opportunité', 'nom f.', 'Pluriel : {возмо́жности}.', [['Е́сли бу́дет возмо́жность, приезжа́й.', 'Si l’occasion se présente, viens.', 'Condition']]],
      ['жела́ние', 'désir / souhait', 'nom n.', 'Verbe : {жела́ть}.', [['Загада́й жела́ние!', 'Fais un vœu !', 'Magie']]],
      ['сожале́ние', 'regret', 'nom n.', 'Locution : {К сожале́нию} = Malheureusement.', [['К сожале́нию, я не смогу́ прийти́.', 'Malheureusement, je ne pourrai pas venir.', 'Refus poli']]],
      ['наде́жда', 'espoir', 'nom f.', 'Prénom féminin aussi (Nadia).', [['Наде́жда умира́ет после́дней.', 'L’espoir fait vivre (meurt le dernier).', 'Proverbe']]]
    ],
    sentences: [
      {
        ru: 'Е́сли бы у меня́ бы́ло вре́мя, я бы пое́хал с ва́ми.',
        fr: 'Si j’avais le temps, je partirais avec vous.',
        alt: ['Si j’avais du temps, j’irais avec vous.'],
        w: [['е́сли бы', 'si', 'conjonction de condition irréelle'], ['у меня́ бы́ло', 'auprès de moi était / j’avais', 'passé neutre'], ['вре́мя', 'le temps', 'sujet neutre'], ['я бы пое́хал', 'je partirais (en transport)', 'passé m. + particule бы'], ['с ва́ми', 'avec vous', 'instrumental de вы']],
        g: "En russe, la condition irréelle se construit symétriquement avec {бы + verbe au passé} dans les deux propositions."
      },
      {
        ru: 'Я хоте́л бы заказа́ть сто́лик на двои́х.',
        fr: 'Je voudrais réserver une table pour deux.',
        alt: ['J’aimerais réserver une table pour 2 personnes.'],
        w: [['я хоте́л бы', 'je voudrais (homme)', 'conditionnel de politesse'], ['заказа́ть', 'réserver / commander', 'infinitif perfectif'], ['сто́лик', 'une table (diminutif affectueux)', 'accusatif m.'], ['на двои́х', 'pour deux', 'numéral collectif accusatif']],
        g: "{хотел бы} (ou {хотела бы} pour une femme) est la formule polie indispensable pour formuler une demande."
      },
      {
        ru: 'Я хочу́, что́бы мы оста́лись друзья́ми.',
        fr: 'Je veux que nous restions amis.',
        alt: ['J’aimerais que l’on reste amis.'],
        w: [['я хочу́', 'je veux', 'présent de хотеть'], ['что́бы', 'que / pour que', 'conjonction de subordination'], ['мы оста́лись', 'nous restions', 'passé pluriel'], ['друзья́ми', 'amis', 'instrumental pluriel de друзья']],
        g: "Après {хочу, чтобы}, le verbe de la subordonnée se met obligatoirement au PASSÉ même s’il exprime un souhait pour le présent ou l’avenir !"
      }
    ]
  }
];
