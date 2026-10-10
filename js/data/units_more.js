// Niveaux A1 à C2 — Cursus complet de russe (de zéro à bilingue)
// Contient les cours de grammaire, conjugaison, orthographe, vocabulaire avec notes et exemples,
// ainsi que les phrases à traduire avec décomposition mot à mot et règles.

export const ADDITIONAL_UNITS = [
  // ── A1 : Premiers pas ───────────────────────────────────
  {
    id: 'a1-present',
    level: 'A1',
    icon: '🗣️',
    title: 'Le présent & les pronoms',
    sub: 'Conjuguer les verbes réguliers (читать, говорить)',
    lesson: [
      {
        t: 'Les pronoms personnels sujets',
        b: [
          ['p', "En russe, les pronoms sont simples et indispensables pour conjuguer. Contrairement à l'espagnol ou à l'italien, on les utilise très couramment."],
          ['table', ['Pronom', 'Sens', 'Prononciation'], [
            ['{я}', 'je, moi', '[ya]'],
            ['{ты}', 'tu, toi (tutoiement)', '[ty]'],
            ['{он}', 'il, lui', '[on]'],
            ['{она́}', 'elle', '[aná] (réduction du o)'],
            ['{оно́}', 'il/elle (neutre)', '[anó]'],
            ['{мы}', 'nous', '[my]'],
            ['{вы}', 'vous (politesse ou pluriel)', '[vy]'],
            ['{они́}', 'ils, elles', '[aní]']
          ]],
          ['tip', "{вы} sert à la fois pour le vouvoiement d'une seule personne (respect) et pour s'adresser à plusieurs personnes."]
        ]
      },
      {
        t: 'Le 1er groupe de verbes : infinitif en -АТЬ',
        b: [
          ['p', "La plupart des verbes en **-ать** se conjuguent avec les terminaisons régulières suivantes. On retire **-ть** et on ajoute :"],
          ['table', ['Pronom', 'Terminaison', 'Exemple : {чита́ть} (lire)'], [
            ['я', '-ю', '{чита́ю} — je lis'],
            ['ты', '-ешь', '{чита́ешь} — tu lis'],
            ['он / она́', '-ет', '{чита́ет} — il/elle lit'],
            ['мы', '-ем', '{чита́ем} — nous lisons'],
            ['вы', '-ете', '{чита́ете} — vous lisez'],
            ['они́', '-ют', '{чита́ют} — ils/elles lisent']
          ]],
          ['why', "**Pas d'auxiliaire !** En russe, il n'existe pas de forme composée au présent. « Je lis », « je suis en train de lire » se traduisent tous deux par {я чита́ю}."],
          ['quiz', 'Comment dit-on « nous lisons » ?', ['мы читаем', 'мы читаете', 'мы читают'], 0, 'La terminaison de мы est -ем : {мы чита́ем}.']
        ]
      },
      {
        t: 'Le 2e groupe : les verbes en -ИТЬ',
        b: [
          ['p', "Le verbe {говори́ть} (parler) est l'exemple type du 2e groupe : la voyelle de base est **-и-**."],
          ['table', ['Pronom', 'Terminaison', 'Exemple : {говори́ть} (parler)'], [
            ['я', '-ю / -у', '{говорю́} — je parle'],
            ['ты', '-ишь', '{говори́шь} — tu parles'],
            ['он / она́', '-ит', '{говори́т} — il/elle parle'],
            ['мы', '-им', '{говори́м} — nous parlons'],
            ['вы', '-ите', '{говори́те} — vous parlez'],
            ['они́', '-ят / -ат', '{говоря́т} — ils parlent']
          ]],
          ['tip', "Pour dire « parler russe », on dit {говори́ть по-ру́сски} (littéralement « parler à la manière russe »)."],
          ['quiz', 'Quelle est la terminaison pour « ты » au 2e groupe ?', ['-ишь', '-ешь', '-ит'], 0, 'Au 2e groupe, ты prend -ишь : {ты говори́шь}.']
        ]
      }
    ],
    words: [
      ['чита́ть', 'lire', 'verbe impf.', 'Verbe régulier du 1er groupe.', [['Я чита́ю кни́гу ка́ждый день.', 'Je lis un livre chaque jour.', '{ка́ждый день} = tous les jours.']]],
      ['зна́ть', 'savoir, connaître', 'verbe impf.', 'Très utilisé : {я зна́ю} = je sais !', [['Ты зна́ешь э́то пра́вило?', 'Tu connais cette règle ?', '{пра́вило} = règle.']]],
      ['понима́ть', 'comprendre', 'verbe impf.', '1er groupe régulier.', [['Я о́чень хорошо́ понима́ю.', 'Je comprends très bien.']]],
      ['говори́ть', 'parler', 'verbe impf.', '2e groupe en -ить.', [['Мы говори́м по-ру́сски.', 'Nous parlons russe.']]],
      ['ру́сский', 'russe', 'adjectif m.', 'Désigne la langue ou un homme russe.', [['Ру́сский язы́к о́чень краси́вый.', 'La langue russe est très belle.', '{язы́к} = langue.']]],
      ['кни́га', 'livre', 'nom f.', 'À l’accusatif (COD) : {кни́гу}.', [['Э́то интере́сная кни́га.', "C'est un livre intéressant."]]],
      ['рабо́тать', 'travailler', 'verbe impf.', '1er groupe.', [['Он рабо́тает в ба́нке.', 'Il travaille dans une banque.']]]
    ],
    sentences: [
      {
        ru: 'Я чита́ю кни́гу.',
        fr: 'Je lis un livre.',
        alt: ['Je lis le livre.'],
        w: [['я', 'je', 'pronom sujet'], ['чита́ю', 'lis', 'verbe au présent (1re personne)'], ['кни́гу', 'livre', 'nom féminin à l’accusatif singulier']],
        g: "Le COD féminin {кни́га} prend la terminaison -у à l'accusatif : {кни́гу}."
      },
      {
        ru: 'Ты говори́шь по-ру́сски?',
        fr: 'Tu parles russe ?',
        alt: ['Est-ce que tu parles russe ?', 'Tu parles le russe ?'],
        w: [['ты', 'tu', 'pronom sujet'], ['говори́шь', 'parles', 'verbe au présent (2e personne)'], ['по-ру́сски', 'en russe', 'adverbe de langue']],
        g: "Devant les noms de langues après parler, on utilise le préfixe {по-} avec un trait d'union : {по-ру́сски}, {по-францу́зски}."
      },
      {
        ru: 'Мы всё понима́ем.',
        fr: 'Nous comprenons tout.',
        alt: ['On comprend tout.'],
        w: [['мы', 'nous', 'pronom sujet'], ['всё', 'tout', 'pronom neutre'], ['понима́ем', 'comprenons', 'verbe au présent']],
        g: "{всё} [vsyo] signifie « tout ». L'ordre des mots est libre mais naturel ici."
      }
    ]
  },

  {
    id: 'a1-prepositionnel',
    level: 'A1',
    icon: '📍',
    title: 'Où es-tu ? Le Prépositionnel',
    sub: 'Le 1er des 6 cas russes : le lieu avec В et НА',
    lesson: [
      {
        t: "Pourquoi le russe a-t-il des cas ?",
        b: [
          ['p', "En français, c'est l'**ordre des mots** et les prépositions qui indiquent le rôle : « Le chat mange la souris » n'est pas « La souris mange le chat »."],
          ['why', "**En russe, les terminaisons changent !** Le mot lui-même porte son rôle (sujet, COD, lieu, etc.). Du coup, l'ordre des mots est beaucoup plus souple, et la langue est d'une immense précision."],
          ['p', "Le **Prépositionnel** (предло́жный падеж) est le plus facile des 6 cas : il ne s'emploie **jamais seul**, toujours avec une préposition comme **В** (dans/en) ou **НА** (sur/à)."]
        ]
      },
      {
        t: 'La règle magique : la terminaison en -Е',
        b: [
          ['p', "Pour indiquer le lieu (« Où ? » = {где́}), la quasi-totalité des noms masculins, féminins et neutres prennent **-е** :"],
          ['table', ['Nom de base', 'Au prépositionnel (Lieu)', 'Signification'], [
            ['{парк} (m.)', '{в па́рке}', 'dans le parc'],
            ['{дом} (m.)', '{в до́ме}', 'dans la maison'],
            ['{Москва́} (f.)', '{в Москве́}', 'à Moscou'],
            ['{Пари́ж} (m.)', '{в Пари́же}', 'à Paris'],
            ['{стол} (m.)', '{на столе́}', 'sur la table'],
            ['{рабо́та} (f.)', '{на рабо́те}', 'au travail']
          ]],
          ['tip', "Exception très courante : {дом} fait {до́ма} pour dire « à la maison » (adverbe figé)."],
          ['quiz', 'Comment dire « à Paris » ?', ['в Париже', 'в Париж', 'на Париже'], 0, 'On ajoute -е : {в Пари́же}. Paris est une ville fermée → préposition В.']
        ]
      },
      {
        t: 'Quand utiliser В et quand utiliser НА ?',
        b: [
          ['p', "La règle de base est visuelle :"],
          ['ul', [
            "**В** : à l'intérieur d'un espace fermé, d'un bâtiment, d'une ville ou d'un pays ({в ба́нке}, {в го́роде}, {в Росси́и}).",
            "**НА** : sur une surface plate ({на столе́}), dans un lieu ouvert ({на у́лице}), ou lors d'un événement/activité ({на конце́рте}, {на рабо́те})."
          ]],
          ['warn', "On dit {на рабо́те} (au travail) et {на по́чте} (à la poste) : ce sont des usages historiques à mémoriser !"]
        ]
      }
    ],
    words: [
      ['где', 'où', 'adverbe interrogatif', 'Sert à poser la question de lieu.', [['Где ты сейча́с?', 'Où es-tu en ce moment ?']]],
      ['в', 'dans, en, à', 'préposition', 'Indique le lieu fermé avec le prépositionnel.', [['Я живу́ в Пари́же.', "J'habite à Paris."]]],
      ['на', 'sur, à', 'préposition', 'Indique la surface ou l’événement.', [['Книга на столе́.', 'Le livre est sur la table.']]],
      ['парк', 'parc', 'nom m.', 'Prépositionnel : {в па́рке}.', [['Мы гуля́ем в па́рке.', 'Nous nous promenons dans le parc.']]],
      ['го́род', 'ville', 'nom m.', 'Pluriel irrégulier : {города́}.', [['В э́том го́роде о́чень тепло́.', 'Dans cette ville il fait très chaud.']]],
      ['рабо́та', 'travail', 'nom f.', 'Se dit toujours avec НА : {на рабо́те}.', [['Па́па на рабо́те.', 'Papa est au travail.']]],
      ['стол', 'table', 'nom m.', 'Accent mobile : {на столе́}.', [['Чай стои́т на столе́.', 'Le thé est sur la table.']]]
    ],
    sentences: [
      {
        ru: 'Я живу́ в Москве́.',
        fr: "J'habite à Moscou.",
        alt: ["Je vis à Moscou."],
        w: [['я', 'je', 'pronom'], ['живу́', 'habite / vis', 'verbe жить au présent'], ['в', 'à / dans', 'préposition'], ['Москве́', 'Moscou', 'au prépositionnel (Москва → Москве)']],
        g: "Москва se termine par -а : au cas prépositionnel de lieu, la terminaison devient -е."
      },
      {
        ru: 'Кот спит на столе́.',
        fr: 'Le chat dort sur la table.',
        alt: ['Un chat dort sur la table.'],
        w: [['кот', 'chat', 'nom sujet'], ['спит', 'dort', 'verbe спать au présent'], ['на', 'sur', 'préposition'], ['столе́', 'table', 'au prépositionnel']],
        g: "Pour une surface plate (la table), on utilise НА + prépositionnel : {на столе́}."
      }
    ]
  },

  // ── A2 : Élémentaire ───────────────────────────────────────
  {
    id: 'a2-genitif',
    level: 'A2',
    icon: '🔑',
    title: 'Le Génitif : Avoir & Manquer',
    sub: '« У меня есть » (j’ai) et « Нет » (il n’y a pas)',
    lesson: [
      {
        t: 'Comment dire « avoir » en russe ?',
        b: [
          ['p', "Le russe n'utilise presque jamais de verbe direct pour « avoir ». À la place, on dit littéralement : **« Chez moi, il y a... »**."],
          ['table', ['Français', 'Russe littéral', 'Construction'], [
            ["J'ai une voiture.", '{У меня́ есть маши́на.}', 'Chez moi + existe + voiture (sujet)'],
            ["Tu as un frère.", '{У тебя́ есть брат.}', 'Chez toi + existe + frère'],
            ["Il a du temps.", '{У него́ есть вре́мя.}', 'Chez lui + existe + temps']
          ]],
          ['why', "**У** exige le cas **Génitif** : я → {меня́}, ты → {тебя́}, он → {него́}, она → {неё}, мы → {нас}, вы → {вас}, они → {них}."]
        ]
      },
      {
        t: 'La négation : l’absence avec НЕТ',
        b: [
          ['p', "Pour dire « je n'ai pas » ou « il n'y a pas », on utilise le mot magique **НЕТ** suivi du **Génitif** !"],
          ['ul', [
            "Affirmatif : {У меня́ есть вре́мя.} (J'ai le temps.)",
            "Négatif : {У меня́ **нет вре́мени**.} (Je n'ai pas de temps.)",
            "Affirmatif : {Брат до́ма.} (Le frère est à la maison.)",
            "Négatif : {Бра́та **нет** до́ма.} (Le frère n'est pas à la maison — absence !)"
          ]],
          ['warn', "En russe, dès qu'il s'agit de **l'absence totale** d'une chose ou d'une personne, le mot passe obligatoirement au **Génitif**."],
          ['quiz', 'Quelle phrase est correcte pour « Je n’ai pas de voiture » ?', ['У меня нет машины.', 'У меня нет машина.', 'Я не имею машину.'], 0, 'Après НЕТ, le féminin машина passe au génitif : {маши́ны}.']
        ]
      }
    ],
    words: [
      ['нет', 'il n’y a pas / non', 'mot négatif', 'Suivi du génitif pour marquer l’absence.', [['Здесь нет пробле́мы.', 'Il n’y a pas de problème ici.']]],
      ['вре́мя', 'temps (durée)', 'nom neutre en -мя', 'Génitif irrégulier : {вре́мени}.', [['У меня́ нет вре́мени.', 'Je n’ai pas le temps.']]],
      ['маши́на', 'voiture', 'nom f.', 'Génitif : {маши́ны}.', [['У бра́та есть маши́на.', 'Mon frère a une voiture.']]],
      ['де́ньги', 'argent (monnaie)', 'nom pl. invariable', 'Génitif : {де́нег}.', [['У нас нет де́нег.', 'Nous n’avons pas d’argent.']]],
      ['друг', 'ami', 'nom m.', 'Génitif : {дру́га}.', [['Э́то дом моего́ дру́га.', "C'est la maison de mon ami."]]]
    ],
    sentences: [
      {
        ru: 'У меня́ нет вре́мени.',
        fr: "Je n'ai pas le temps.",
        alt: ["Je n'ai pas de temps."],
        w: [['у меня́', 'chez moi (j’ai)', 'préposition У + génitif de я'], ['нет', 'il n’y a pas', 'négation d’existence'], ['вре́мени', 'de temps', 'génitif du nom neutre время']],
        g: "Après {нет}, le nom passe toujours au cas génitif ({вре́мя} → {вре́мени})."
      },
      {
        ru: 'У тебя́ есть маши́на?',
        fr: 'Tu as une voiture ?',
        alt: ['Est-ce que tu as une voiture ?', 'As-tu une voiture ?'],
        w: [['у тебя́', 'chez toi (tu as)', 'У + génitif de ты'], ['есть', 'il y a / existe', 'verbe être au présent'], ['маши́на', 'voiture', 'nominatif sujet']],
        g: "Dans la tournure affirmative de possession, l'objet possédé est le sujet grammatical au nominatif."
      }
    ]
  },

  {
    id: 'a2-aspects',
    level: 'A2',
    icon: '⏳',
    title: 'Aspects : Fait vs Résultat',
    sub: 'Imperfectif (НСВ) vs Perfectif (СВ)',
    lesson: [
      {
        t: "Le plus grand secret de la langue russe",
        b: [
          ['p', "En français, on a le passé composé, l'imparfait, le passé simple... En russe, il n'y a qu'**un seul temps du passé** ! Pour exprimer toutes les nuances, le russe utilise **deux aspects** pour chaque verbe :"],
          ['table', ['Aspect', 'Nom russe', 'Ce qu’il exprime', 'Exemple'], [
            ['**Imperfectif**', 'НСВ', 'Le processus en cours, la durée, la répétition, l’action sans fin précise.', '{чита́ть} (être en train de lire)'],
            ['**Perfectif**', 'СВ', 'Le résultat final atteint, l’action achevée avec succès, un événement unique.', '{прочита́ть} (avoir fini de lire)']
          ]],
          ['why', "**Le test du détective :** Si l'important est « Qu'as-tu fait de ta journée ? » (l'activité), on emploie l'imperfectif : {Я чита́л}. Si l'important est « Le livre est-il fini ? » (le résultat), on emploie le perfectif : {Я прочита́л}."]
        ]
      },
      {
        t: 'Comment se forment les couples d’aspect ?',
        b: [
          ['p', "Généralement, on ajoute un **préfixe** au verbe imperfectif pour former le verbe perfectif :"],
          ['ul', [
            "{де́лать} (faire - processus) → {**с**де́лать} (faire - et terminer !)",
            "{писа́ть} (écrire) → {**на**писа́ть} (avoir écrit, rédigé)",
            "{пить} (boire) → {**вы́**пить} (boire jusqu'à la dernière goutte)"
          ]],
          ['quiz', 'Quelle phrase signifie « J’ai fini de lire ce livre » (résultat atteint) ?', ['Я прочитал эту книгу.', 'Я читал эту книгу.', 'Я читаю эту книгу.'], 0, 'Le perfectif {прочита́л} indique le résultat et l’achèvement.']
        ]
      }
    ],
    words: [
      ['де́лать', 'faire (processus)', 'verbe impf.', 'Focus sur l’activité.', [['Что ты де́лал вчера́?', 'Qu’as-tu fait hier ?']]],
      ['сде́лать', 'faire (résultat)', 'verbe perf.', 'Focus sur l’accomplissement.', [['Я уже́ всё сде́лал.', 'J’ai déjà tout fait !']]],
      ['писа́ть', 'écrire', 'verbe impf.', 'Conjugaison : {я пишу́, ты пи́шешь}.', [['Она́ пи́шет письмо́.', 'Elle écrit une lettre.']]],
      ['написа́ть', 'avoir écrit / rédiger', 'verbe perf.', 'Résultat final.', [['Я написа́l тест.', 'J’ai rédigé le test.']]],
      ['уже́', 'déjà', 'adverbe', 'Souvent associé au perfectif.', [['Он уже́ пришёл.', 'Il est déjà arrivé.']]]
    ],
    sentences: [
      {
        ru: 'Я уже́ всё сде́лал.',
        fr: "J'ai déjà tout fait.",
        alt: ["J'ai déjà tout terminé."],
        w: [['я', 'je', 'sujet'], ['уже́', 'déjà', 'adverbe'], ['всё', 'tout', 'pronom neutre'], ['сде́лал', 'ai fait / accompli', 'verbe perfectif au passé masculin']],
        g: "Le verbe perfectif {сде́лать} au passé indique que l'action est menée à son terme avec un résultat concret."
      }
    ]
  },

  // ── B1 : Seuil ───────────────────────────────────────────
  {
    id: 'b1-mouvement',
    level: 'B1',
    icon: '🚶',
    title: 'Les Verbes de mouvement',
    sub: 'Идти / ходить et ехать / ездить',
    lesson: [
      {
        t: 'À pied ou en transport ? Le double choix russe',
        b: [
          ['p', "En russe, « aller » n'existe pas de façon générique. Il faut obligatoirement choisir :"],
          ['ul', [
            "**À pied** : {идти́} / {ходи́ть}",
            "**En véhicule** (voiture, train, métro, avion...) : {е́хать} / {е́здить}"
          ]],
          ['p', "Puis, choisir entre **unidirectionnel** (un seul voyage en cours) et **multidirectionnel** (aller-retour, habitude générale) :"],
          ['table', ['Mode', 'En cours (Unidirectionnel)', 'Habitude / Aller-retour (Multi)'], [
            ['À pied', '{идти́} (je vais là-bas maintenant)', '{ходи́ть} (je vais tous les lundis / j’aime marcher)'],
            ['En véhicule', '{е́хать} (je suis dans le train)', '{е́здить} (je voyage souvent en train)']
          ]],
          ['tip', "Si tu es en train de marcher vers la gare : {Я иду́ на вокза́л}. Si tu y vas tous les jours : {Я ка́ждый день хожу́ на вокза́л}."]
        ]
      }
    ],
    words: [
      ['идти́', 'aller à pied (en ce moment)', 'verbe unidir.', 'Conjugaison : {я иду́, ты идёшь}.', [['Куда́ ты идёшь?', 'Où vas-tu ?']]],
      ['ходи́ть', 'aller à pied (habitude)', 'verbe multidir.', '{я хожу́, ты хо́дишь}.', [['Я ча́сто хожу́ в теа́тр.', 'Je vais souvent au théâtre.']]],
      ['е́хать', 'aller en véhicule (en ce moment)', 'verbe unidir.', '{я е́ду, ты е́дешь}.', [['Мы е́дем домо́й.', 'Nous rentrons chez nous (en voiture/métro).']]],
      ['е́здить', 'aller en véhicule (habitude)', 'verbe multidir.', '{я е́зжу, ты е́здишь}.', [['Она́ е́здит на рабо́ту на метро́.', 'Elle va au travail en métro.']]],
      ['пешко́м', 'à pied', 'adverbe', 'S’emploie avec идти/ходить.', [['Я люблю́ гуля́ть пешко́м.', 'J’aime me promener à pied.']]]
    ],
    sentences: [
      {
        ru: 'Куда́ ты идёшь?',
        fr: 'Où vas-tu ?',
        alt: ['Où est-ce que tu vas ?', 'Tu vas où ?'],
        w: [['куда́', 'vers où', 'adverbe interrogatif de direction'], ['ты', 'tu', 'sujet'], ['идёшь', 'vas (à pied)', 'verbe идти à la 2e personne']],
        g: "{куда́} indique la direction (« vers où »), distinct de {где́} (« en quel endroit »)."
      }
    ]
  },

  // ── B2 : Avancé ──────────────────────────────────────────
  {
    id: 'b2-prefixes',
    level: 'B2',
    icon: '⚡',
    title: 'Les Préfixes de mouvement',
    sub: 'При-, у-, во-, вы-, пере- : la boussole russe',
    lesson: [
      {
        t: 'Comment un préfixe change tout',
        b: [
          ['p', "Prends le verbe {идти́} (aller). Ajoute un préfixe :"],
          ['table', ['Préfixe', 'Sens spatial', 'Verbe', 'Exemple'], [
            ['**при-**', 'arrivée, rapprochement', '{прийти́}', 'arriver à pied'],
            ['**у-**', 'départ lointain', '{уйти́}', 'partir, quitter un lieu'],
            ['**в- / во-**', 'entrée à l’intérieur', '{войти́}', 'entrer'],
            ['**вы-**', 'sortie vers l’extérieur', '{вы́йти}', 'sortir'],
            ['**пере-**', 'traversée d’un obstacle', '{перейти́}', 'traverser (la rue)']
          ]],
          ['why', "Avec 10 préfixes et les 2 bases (pied/véhicule), tu peux exprimer avec un seul mot ce qui prendrait toute une phrase en français !"]
        ]
      }
    ],
    words: [
      ['прийти́', 'arriver à pied', 'verbe perf.', 'Passé masculin : {пришёл}.', [['По́езд прибы́л во́время.', 'Le train est arrivé à l’heure.']]],
      ['уйти́', 'partir / s’en aller', 'verbe perf.', 'Passé masculin : {ушёл}.', [['Он уже́ ушёл.', 'Il est déjà parti.']]],
      ['войти́', 'entrer', 'verbe perf.', 'Avec préposition в.', [['Войди́те, пожа́луйста!', 'Entrez, s’il vous plaît !']]],
      ['вы́йти', 'sortir', 'verbe perf.', 'Avec préposition из.', [['Она́ вы́шла из ко́мнаты.', 'Elle est sortie de la pièce.']]],
      ['перейти́', 'traverser', 'verbe perf.', 'Passer d’un côté à l’autre.', [['Перейти́ доро́гу.', 'Traverser la route.']]]
    ],
    sentences: [
      {
        ru: 'Он уже́ ушёл.',
        fr: 'Il est déjà parti.',
        alt: ["Il s'en est déjà allé."],
        w: [['он', 'il', 'sujet'], ['уже́', 'déjà', 'adverbe'], ['ушёл', 'est parti', 'verbe уйти au passé']],
        g: "Le préfixe {у-} marque l'éloignement définitif ou durable."
      }
    ]
  },

  // ── C1 : Autonome ─────────────────────────────────────────
  {
    id: 'c1-nuances',
    level: 'C1',
    icon: '🎭',
    title: 'Particules & Nuances orales',
    sub: 'Же, ведь, ли, давай, неужели : parler comme un natif',
    lesson: [
      {
        t: "Ce qui ne s'apprend pas dans les manuels scolaires",
        b: [
          ['p', "Un russophone natif parsème ses phrases de petites particules indispensables pour exprimer l'insistance, le doute, la complicité ou l'évidence :"],
          ['table', ['Particule', 'Ce qu’elle apporte', 'Exemple'], [
            ['**же**', 'insistance, évidence partagée', '{Ты же зна́ешь!} (Mais tu le sais pourtant !)'],
            ['**ведь**', 'rappel d’un fait incontestable', '{Мы ведь договори́лись.} (On s’était pourtant mis d’accord.)'],
            ['**неуже́ли**', 'stupéfaction / est-ce possible ?', '{Неуже́ли э́то пра́вда?} (Est-ce possible que ce soit vrai ?)'],
            ['**-ка**', 'adoucit un ordre / impératif amical', '{Погоди́-ка!} (Attends un peu !)'],
            ['**дава́й**', 'incitation amicale / proposition', '{Дава́й погово́рим.} (Discutons un peu.)']
          ]]
        ]
      }
    ],
    words: [
      ['ведь', 'pourtant, après tout, en fait', 'particule', 'Rappelle une évidence.', [['Ведь э́то так про́сто!', 'C’est pourtant si simple !']]],
      ['же', 'donc, pourtant (insistance)', 'particule', 'Se place après le mot accentué.', [['Где же он?', 'Mais où est-il donc ?']]],
      ['неуже́ли', 'vraiment ? est-ce possible ?', 'particule interrogative', 'Marque l’étonnement sincère.', [['Неуже́ли ты забы́л?', 'Aurais-tu vraiment oublié ?']]],
      ['дава́й', 'allez, viens, allons-y', 'particule incitative', 'Pour proposer une action.', [['Дава́й ча́ю попьём!', 'Et si on buvait du thé !']]]
    ],
    sentences: [
      {
        ru: 'Ты же всё прекра́сно зна́ешь!',
        fr: 'Mais tu sais pourtant tout parfaitement !',
        alt: ['Tu sais très bien tout !', 'Mais tu le sais parfaitement !'],
        w: [['ты', 'tu', 'sujet'], ['же', 'pourtant / donc', 'particule d’insistance'], ['всё', 'tout', 'pronom neutre'], ['прекра́сно', 'magnifiquement / parfaitement', 'adverbe'], ['зна́ешь', 'sais', 'verbe']],
        g: "{же} souligne une évidence que l'interlocuteur devrait admettre sans hésiter."
      }
    ]
  },

  // ── C2 : Maîtrise / Bilingue ──────────────────────────────
  {
    id: 'c2-maitrise',
    level: 'C2',
    icon: '👑',
    title: 'Style bilingue & Diminutifs',
    sub: 'L’âme slave, les suffixes affectifs et l’intraduisible',
    lesson: [
      {
        t: 'Les suffixes affectifs : la magie émotionnelle du russe',
        b: [
          ['p', "Le russe possède une richesse incomparable de suffixes pour nuancer les sentiments et la tendresse. Un simple prénom ou mot peut avoir 20 nuances :"],
          ['table', ['Mot de base', 'Forme affective', 'Nuance'], [
            ['{ма́ма} (maman)', '{ма́мочка}', 'petite maman adorée (extrême tendresse)'],
            ['{рука́} (main)', '{ру́чка}', 'petite main douce'],
            ['{сон} (sommeil)', '{со́ник}', 'doux petit somme'],
            ['{вода́} (eau)', '{води́чка}', 'petite eau fraîche'],
            ['{друг} (ami)', '{дружи́ще}', 'grand pote, vieux compère (amical viril)']
          ]],
          ['tip', "Ces suffixes permettent d'exprimer instantanément la chaleur humaine, la complicité ou l'ironie sans ajouter le moindre adjectif."]
        ]
      },
      {
        t: 'Les mots intraduisibles de la culture',
        b: [
          ['p', "Certains mots russes concentrent des pans entiers de philosophie :"],
          ['ul', [
            "**Тоска́** : une mélancolie spirituelle profonde, une nostalgie sans cause précise qu'aucune langue n'exprime en un seul mot.",
            "**Душа́** (l'âme) : le centre de toute relation humaine russe ({по душа́м} = parler à cœur ouvert).",
            "**Аво́сь** : la confiance absolue que le destin s'arrangera tout seul, même sans plan réfléchi."
          ]]
        ]
      }
    ],
    words: [
      ['душа́', 'l’âme, le cœur profond', 'nom f.', 'Expression : {по душа́м} (à cœur ouvert).', [['У него́ до́брая душа́.', 'Il a une âme bonne et généreuse.']]],
      ['тоска́', 'mélancolie profonde, vague à l’âme', 'nom f.', 'Intraduisible exactement.', [['На душе́ тоска́.', 'J’ai le cœur lourd de mélancolie.']]],
      ['потихо́ньку', 'doucement, petit à petit, comme si de rien n’était', 'adverbe', 'Réponse typique à « Comment ça va ? »', [['Всё идёт потихо́ньку.', 'Tout va son petit bonhomme de chemin.']]],
      ['со́лнышко', 'mon soleil, mon trésor', 'nom neutre diminutif', 'Surnom affectueux universel.', [['Доброе утро, со́лнышко!', 'Bonjour mon petit soleil !']]]
    ],
    sentences: [
      {
        ru: 'Мы поговори́ли по душа́м.',
        fr: 'Nous avons parlé à cœur ouvert.',
        alt: ['Nous avons discuté à cœur ouvert.', 'On a parlé d’âme à âme.'],
        w: [['мы', 'nous', 'sujet'], ['поговори́ли', 'avons parlé / échangé', 'verbe perfectif'], ['по душа́м', 'à cœur ouvert', 'locution idiomatique litt. « selon les âmes »']],
        g: "{по душа́м} est une expression idiomatique fondamentale désignant une conversation sincère, intime et sans faux-semblant."
      }
    ]
  }
];
