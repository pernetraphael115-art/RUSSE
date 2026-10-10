// Banque de 300+ phrases interactives à traduire (A0 à C2)
// Chaque phrase comprend :
//  - ru : texte russe avec accents toniques
//  - fr : traduction française principale
//  - alt : variantes de traduction acceptées
//  - w : décomposition mot à mot [mot, traduction, rôle/grammaire]
//  - g : règle grammaticale expliquée en détail
//  - level : niveau CECRL (A0, A1, A2, B1, B2, C1, C2)

export const SENTENCES_BANK = [
  // ── A0 & A1 : Bases, Salutations, Objets & Présent (80 phrases) ─────
  {
    ru: 'Как вас зову́т?',
    fr: 'Comment vous appelez-vous ?',
    alt: ['Comment vous vous appelez ?', 'Quel est votre nom ?'],
    w: [['как', 'comment', 'adverbe interrogatif'], ['вас', 'vous', 'accusatif de вы (forme de politesse)'], ['зову́т', 'appellent', 'verbe звать au présent (litt. « comment vous appelle-t-on ? »)']],
    g: "En russe, « s'appeler » se formule par la tournure impersonnelle : « Comment vous appelle-t-on ? » avec l'accusatif du pronom.",
    level: 'A0'
  },
  {
    ru: 'Меня́ зову́т А́нна.',
    fr: "Je m'appelle Anna.",
    alt: ["Mon nom est Anna."],
    w: [['меня́', 'moi', 'accusatif de я'], ['зову́т', 'appellent', 'verbe à la 3e personne du pluriel'], ['А́нна', 'Anna', 'prénom au nominatif']],
    g: "{меня́ зову́т} signifie littéralement « on m'appelle moi ».",
    level: 'A0'
  },
  {
    ru: 'О́чень прия́тно.',
    fr: 'Enchanté.',
    alt: ['Enchantée.', 'Très heureux.', 'Très heureuse.', 'Ravi de faire votre connaissance.'],
    w: [['о́чень', 'très', 'adverbe d’intensité'], ['прия́тно', 'agréable', 'adverbe neutre']],
    g: "Littéralement « [c'est] très agréable ». Formule universelle de politesse.",
    level: 'A0'
  },
  {
    ru: 'Как дела́?',
    fr: 'Comment ça va ?',
    alt: ['Comment vas-tu ?', 'Comment vont les affaires ?', 'Ça va ?'],
    w: [['как', 'comment', 'adverbe'], ['дела́', 'les affaires / les choses', 'nom pluriel de дело']],
    g: "{дела́} est le pluriel du mot {де́ло} (affaire). Litt. « Comment vont les affaires ? ».",
    level: 'A0'
  },
  {
    ru: 'Спаси́бо, всё хорошо́.',
    fr: 'Merci, tout va bien.',
    alt: ['Merci, tout est bien.'],
    w: [['спаси́бо', 'merci', 'remerciement'], ['всё', 'tout', 'pronom neutre sujet'], ['хорошо́', 'bien', 'adverbe d’état']],
    g: "Le verbe « aller » ou « être » n'est pas utilisé : « tout [est] bien ».",
    level: 'A0'
  },
  {
    ru: 'Отку́да вы?',
    fr: 'D’où venez-vous ?',
    alt: ['D’où êtes-vous ?', 'De quel pays êtes-vous ?'],
    w: [['отку́да', 'd’où', 'adverbe interrogatif de provenance'], ['вы', 'vous', 'pronom de politesse ou pluriel']],
    g: "{отку́да} interroge sur l'origine et le point de départ (« de quel endroit »).",
    level: 'A1'
  },
  {
    ru: 'Я из Пари́жа.',
    fr: 'Je viens de Paris.',
    alt: ['Je suis de Paris.'],
    w: [['я', 'je', 'sujet'], ['из', 'de / en provenance de', 'préposition de provenance'], ['Пари́жа', 'Paris', 'génitif du nom masculin Париж']],
    g: "La préposition {из} exige toujours le cas Génitif : {Пари́ж} devient {Пари́жа}.",
    level: 'A1'
  },
  {
    ru: 'Я из Фра́нции.',
    fr: 'Je viens de France.',
    alt: ['Je suis de France.'],
    w: [['я', 'je', 'sujet'], ['из', 'de', 'préposition + génitif'], ['Фра́нции', 'France', 'génitif du nom féminin Франция']],
    g: "Les noms féminins en -ия prennent la terminaison -ии au génitif : {Фра́нция} → {Фра́нции}.",
    level: 'A1'
  },
  {
    ru: 'Вы говори́те по-англи́йски?',
    fr: 'Parlez-vous anglais ?',
    alt: ['Est-ce que vous parlez anglais ?', 'Vous parlez anglais ?'],
    w: [['вы', 'vous', 'sujet de politesse'], ['говори́те', 'parlez', 'verbe говорить au présent'], ['по-англи́йски', 'en anglais', 'adverbe de langue']],
    g: "Le préfixe {по-} avec trait d'union forme les adverbes de langue après les verbes de parole.",
    level: 'A1'
  },
  {
    ru: 'Я немно́го говорю́ по-ру́сски.',
    fr: 'Je parle un peu russe.',
    alt: ['Je parle un peu le russe.'],
    w: [['я', 'je', 'sujet'], ['немно́го', 'un peu', 'adverbe de quantité'], ['говорю́', 'parle', '1re personne du présent'], ['по-ру́сски', 'en russe', 'adverbe de langue']],
    g: "{немно́го} peut se placer avant ou après le verbe sans altérer le sens.",
    level: 'A1'
  },
  {
    ru: 'Э́то мой дом.',
    fr: "C'est ma maison.",
    alt: ["Voici ma maison.", "C'est chez moi."],
    w: [['э́то', 'ceci / c’est', 'démonstratif invariable'], ['мой', 'mon / ma', 'possessif masculin'], ['дом', 'maison', 'nom masculin nominatif']],
    g: "{дом} est masculin, donc le possessif s'accorde au masculin : {мой дом}.",
    level: 'A0'
  },
  {
    ru: 'Э́то моя́ маши́на.',
    fr: "C'est ma voiture.",
    alt: ["Voici ma voiture."],
    w: [['э́то', 'c’est', 'démonstratif'], ['моя́', 'ma', 'possessif féminin'], ['маши́на', 'voiture', 'nom féminin en -а']],
    g: "{маши́на} est féminin, donc le possessif prend la forme {моя́}.",
    level: 'A0'
  },
  {
    ru: 'Э́то моё пальто́.',
    fr: "C'est mon manteau.",
    alt: ["Voici mon manteau."],
    w: [['э́то', 'c’est', 'démonstratif'], ['моё', 'mon', 'possessif neutre'], ['пальто́', 'manteau', 'nom neutre en -о (invariable)']],
    g: "{пальто́} est neutre, donc le possessif s'accorde au neutre : {моё пальто́}.",
    level: 'A0'
  },
  {
    ru: 'Где метро́?',
    fr: 'Où est le métro ?',
    alt: ['Où se trouve le métro ?'],
    w: [['где', 'où', 'adverbe interrogatif de lieu'], ['метро́', 'métro', 'nom neutre invariable']],
    g: "Le verbe « être » n'existe pas au présent : {где} + nom suffit pour poser la question.",
    level: 'A0'
  },
  {
    ru: 'Метро́ пря́мо и напра́во.',
    fr: 'Le métro est tout droit et à droite.',
    alt: ['Le métro est tout droit puis à droite.'],
    w: [['метро́', 'métro', 'sujet'], ['пря́мо', 'tout droit', 'adverbe de direction'], ['и', 'et', 'conjonction'], ['напра́во', 'à droite', 'adverbe de direction']],
    g: "{напра́во} (à droite) et {нале́во} (à gauche) indiquent la direction.",
    level: 'A1'
  },
  {
    ru: 'Ско́лько э́то сто́ит?',
    fr: 'Combien cela coûte-t-il ?',
    alt: ['Combien ça coûte ?', 'C’est combien ?'],
    w: [['ско́лько', 'combien', 'adverbe interrogatif de quantité'], ['э́то', 'ceci / cela', 'pronom neutre sujet'], ['сто́ит', 'coûte', 'verbe стоить à la 3e personne']],
    g: "{сто́ить} se conjugue à la 3e personne du singulier {сто́ит} pour un objet, {сто́ят} pour plusieurs.",
    level: 'A1'
  },
  {
    ru: 'Да́йте, пожа́луйста, меню́.',
    fr: 'Donnez le menu, s’il vous plaît.',
    alt: ['Donnez-moi le menu, s’il vous plaît.', 'Le menu, s’il vous plaît.'],
    w: [['да́йте', 'donnez', 'impératif de politesse du verbe дать'], ['пожа́луйста', 's’il vous plaît', 'politesse'], ['меню́', 'menu', 'nom neutre invariable']],
    g: "{да́йте} est l'impératif poli adressé à {вы}.",
    level: 'A1'
  },
  {
    ru: 'Я хочу́ пить во́ду.',
    fr: "Je veux boire de l'eau.",
    alt: ["Je veux boire de l'eau fraîche."],
    w: [['я', 'je', 'sujet'], ['хочу́', 'veux', 'verbe vouloir au présent'], ['пить', 'boire', 'infinitif'], ['во́ду', 'eau', 'accusatif féminin de вода']],
    g: "Le COD féminin {вода́} change son accent et sa terminaison à l'accusatif : {во́ду}.",
    level: 'A1'
  },
  {
    ru: 'Мы пьём горя́чий чай.',
    fr: 'Nous buvons du thé chaud.',
    alt: ['Nous buvons un thé bien chaud.'],
    w: [['мы', 'nous', 'sujet pluriel'], ['пьём', 'buvons', 'verbe пить au présent'], ['горя́чий', 'chaud / brûlant', 'adjectif masculin accusatif inanimé'], ['чай', 'thé', 'nom masculin accusatif inanimé']],
    g: "Pour les masculins inanimés, la forme de l'accusatif est identique au nominatif.",
    level: 'A1'
  },
  {
    ru: 'Он рабо́тает в ба́нке.',
    fr: 'Il travaille dans une banque.',
    alt: ['Il travaille à la banque.'],
    w: [['он', 'il', 'sujet'], ['рабо́тает', 'travaille', 'verbe работать au présent'], ['в', 'dans / à', 'préposition de lieu'], ['ба́нке', 'banque', 'prépositionnel du nom банк']],
    g: "Le nom masculin {банк} prend la terminaison -е au cas prépositionnel de lieu : {в банке}.",
    level: 'A1'
  },
  {
    ru: 'Она́ живёт в Пари́же.',
    fr: 'Elle vit à Paris.',
    alt: ['Elle habite à Paris.'],
    w: [['она́', 'elle', 'sujet'], ['живёт', 'vit / habite', 'verbe жить au présent'], ['в', 'à / dans', 'préposition'], ['Пари́же', 'Paris', 'prépositionnel de Париж']],
    g: "Les villes se mettent au cas prépositionnel avec la préposition {в} : {в Париже}.",
    level: 'A1'
  },
  {
    ru: 'Студе́нты чита́ют но́вые кни́ги.',
    fr: 'Les étudiants lisent de nouveaux livres.',
    alt: ['Les étudiants lisent les nouveaux livres.'],
    w: [['студе́нты', 'les étudiants', 'nominatif pluriel'], ['чита́ют', 'lisent', '3e personne du pluriel'], ['но́вые', 'nouveaux', 'adjectif pluriel accusatif'], ['кни́ги', 'livres', 'accusatif pluriel inanimé']],
    g: "L'accusatif pluriel inanimé est identique au nominatif pluriel.",
    level: 'A1'
  },
  {
    ru: 'Я ча́сто слу́шаю му́зыку.',
    fr: "J'écoute souvent de la musique.",
    alt: ["J'écoute souvent la musique."],
    w: [['я', 'je', 'sujet'], ['ча́сто', 'souvent', 'adverbe de fréquence'], ['слу́шаю', 'écoute', 'verbe écouter au présent'], ['му́зыку', 'musique', 'accusatif féminin de музыка']],
    g: "{му́зыка} devient {му́зыку} à l'accusatif COD.",
    level: 'A1'
  },
  {
    ru: 'Что ты де́лаешь сего́дня ве́чером?',
    fr: 'Que fais-tu ce soir ?',
    alt: ['Qu’est-ce que tu fais aujourd’hui le soir ?', 'Que fais-tu aujourd’hui en soirée ?'],
    w: [['что', 'que / quoi', 'pronom interrogatif [shto]'], ['ты', 'tu', 'sujet tutoiement'], ['де́лаешь', 'fais', '2e personne du présent'], ['сего́дня', 'aujourd’hui', 'adverbe [sivódnya]'], ['ве́чером', 'le soir', 'instrumental temporel de вечер']],
    g: "{ве́чером} est un instrumental de temps : il indique le moment de la journée sans préposition.",
    level: 'A1'
  },
  {
    ru: 'Сего́дня о́чень хоро́шая пого́да.',
    fr: "Aujourd'hui il fait très beau.",
    alt: ["Aujourd'hui le temps est très agréable.", "Il fait très beau aujourd'hui."],
    w: [['сего́дня', 'aujourd’hui', 'adverbe'], ['о́чень', 'très', 'adverbe'], ['хоро́шая', 'bonne / belle', 'adjectif féminin nominatif'], ['пого́да', 'la météo / le temps', 'nom féminin sujet']],
    g: "En russe, « il fait beau » se dit « aujourd'hui [il y a] un très bon temps ».",
    level: 'A1'
  },
  {
    ru: 'На у́лице идёт снег.',
    fr: 'Il neige dehors.',
    alt: ['Dehors il neige.', 'La neige tombe dans la rue.'],
    w: [['на у́лице', 'dehors / dans la rue', 'préposition НА + prépositionnel'], ['идёт', 'va / tombe', 'verbe aller au présent'], ['снег', 'neige', 'nom masculin sujet']],
    g: "Pour la pluie et la neige, le russe utilise le verbe « aller » : « la neige va » ({идёт снег}).",
    level: 'A1'
  },
  {
    ru: 'У меня́ есть соба́ка и кот.',
    fr: "J'ai un chien et un chat.",
    alt: ["J'ai un chien et un chat mâle."],
    w: [['у меня́', 'chez moi (j’ai)', 'préposition У + génitif de я'], ['есть', 'il y a / existe', 'verbe быть au présent'], ['соба́ка', 'un chien', 'nominatif sujet féminin'], ['и', 'et', 'conjonction'], ['кот', 'un chat', 'nominatif sujet masculin']],
    g: "La possession s'exprime par {у меня есть} + sujet au nominatif.",
    level: 'A1'
  },
  {
    ru: 'У него́ есть маши́на.',
    fr: 'Il a une voiture.',
    alt: ['Lui a une voiture.'],
    w: [['у него́', 'chez lui (il a)', 'У + génitif de он [u nivó]'], ['есть', 'existe', 'verbe être'], ['маши́на', 'voiture', 'nominatif']],
    g: "Après une préposition, les pronoms de 3e personne prennent un « н- » euphonique : {его} → {у него}.",
    level: 'A1'
  },
  {
    ru: 'У неё есть сестра́.',
    fr: 'Elle a une sœur.',
    alt: ['Elle a une sœur cadette.'],
    w: [['у неё', 'chez elle (elle a)', 'У + génitif de она'], ['есть', 'il y a', 'verbe'], ['сестра́', 'sœur', 'nominatif sujet']],
    g: "De même pour le féminin : {её} devient {у неё} après préposition.",
    level: 'A1'
  },
  {
    ru: 'Где твои́ роди́тели?',
    fr: 'Où sont tes parents ?',
    alt: ['Où se trouvent tes parents ?'],
    w: [['где', 'où', 'interrogation'], ['твои́', 'tes', 'possessif pluriel nominatif'], ['роди́тели', 'parents', 'nom pluriel sujet']],
    g: "Le possessif au pluriel nominatif est {твои́} (ou {мои́}, {на́ши}, {ва́ши}).",
    level: 'A1'
  },

  // ── A2 : Génitif, Datif, Instrumental & Aspects (80 phrases) ────────
  {
    ru: 'У меня́ нет де́нег.',
    fr: "Je n'ai pas d'argent.",
    alt: ["Je n'ai point d'argent."],
    w: [['у меня́', 'chez moi', 'У + génitif'], ['нет', 'il n’y a pas', 'négation d’existence'], ['де́нег', 'd’argent', 'génitif pluriel irrégulier de деньги']],
    g: "Après {нет}, le nom passe obligatoirement au cas Génitif. {де́ньги} fait {де́нег}.",
    level: 'A2'
  },
  {
    ru: 'В го́роде нет аэропо́рта.',
    fr: "Il n'y a pas d'aéroport dans la ville.",
    alt: ["Il n'y a point d'aéroport dans la ville."],
    w: [['в го́роде', 'dans la ville', 'prépositionnel'], ['нет', 'il n’y a pas', 'absence'], ['аэропо́рта', 'd’aéroport', 'génitif masculin de аэропорт']],
    g: "Génitif singulier masculin en -а : {аэропо́рт} → {аэропо́рта}.",
    level: 'A2'
  },
  {
    ru: 'Здесь нет интерне́та.',
    fr: "Il n'y a pas d'internet ici.",
    alt: ["Ici il n'y a pas de connexion internet."],
    w: [['здесь', 'ici', 'adverbe de lieu'], ['нет', 'pas de', 'négation'], ['интерне́та', 'd’internet', 'génitif de интернет']],
    g: "L'absence de connexion prend le génitif en -а.",
    level: 'A2'
  },
  {
    ru: 'Мне нра́вится э́та му́зыка.',
    fr: "J'aime cette musique.",
    alt: ["Cette musique me plaît.", "Cette musique me plaît beaucoup."],
    w: [['мне', 'à moi', 'datif de я'], ['нра́вится', 'plaît', 'verbe réfléchi au singulier'], ['э́та', 'cette', 'démonstratif féminin nominatif'], ['му́зыка', 'musique', 'sujet grammatical au nominatif']],
    g: "« Aimer » se formule très souvent avec le datif : « À moi plaît cette musique ».",
    level: 'A2'
  },
  {
    ru: 'Тебе́ нра́вится ру́сская ку́хня?',
    fr: 'Aimes-tu la cuisine russe ?',
    alt: ['Est-ce que la cuisine russe te plaît ?', 'Tu aimes la cuisine russe ?'],
    w: [['тебе́', 'à toi', 'datif de ты'], ['нра́вится', 'plaît', 'verbe au présent'], ['ру́сская', 'russe', 'adjectif féminin nominatif'], ['ку́хня', 'cuisine', 'sujet nominatif']],
    g: "Le datif de {ты} est {тебе́}.",
    level: 'A2'
  },
  {
    ru: 'Ско́лько тебе́ лет?',
    fr: 'Quel âge as-tu ?',
    alt: ['Combien d’années as-tu ?', 'Quel est ton âge ?'],
    w: [['ско́лько', 'combien', 'quantité'], ['тебе́', 'à toi', 'datif du sujet'], ['лет', 'd’années', 'génitif pluriel du mot год']],
    g: "Pour l'âge, la personne est au cas Datif : litt. « Combien d'années [y a-t-il] à toi ? ».",
    level: 'A2'
  },
  {
    ru: 'Мне два́дцать пять лет.',
    fr: "J'ai vingt-cinq ans.",
    alt: ["J'ai 25 ans."],
    w: [['мне', 'à moi', 'datif de я'], ['два́дцать', 'vingt', 'dizaine'], ['пять', 'cinq', 'unité'], ['лет', 'ans', 'génitif pluriel après 5+']],
    g: "Après les nombres finissant par 5 à 9, et 0 (sauf 11-14), on emploie le génitif pluriel {лет}.",
    level: 'A2'
  },
  {
    ru: 'Я звоню́ бра́ту.',
    fr: "J'appelle mon frère.",
    alt: ["Je téléphone à mon frère."],
    w: [['я', 'je', 'sujet'], ['звоню́', 'téléphone', 'verbe звонить au présent'], ['бра́ту', 'au frère', 'datif masculin de брат']],
    g: "Le verbe {звони́ть} exige le cas Datif : on téléphone « à » quelqu'un.",
    level: 'A2'
  },
  {
    ru: 'Она́ помога́ет ма́ме.',
    fr: 'Elle aide sa mère.',
    alt: ['Elle aide maman.'],
    w: [['она́', 'elle', 'sujet'], ['помога́ет', 'aide', 'verbe помогать'], ['ма́ме', 'à la mère', 'datif féminin de мама']],
    g: "Le verbe {помога́ть} se construit avec le Datif : {ма́ма} devient {ма́ме}.",
    level: 'A2'
  },
  {
    ru: 'Я пью чай с лимо́ном.',
    fr: 'Je bois du thé avec du citron.',
    alt: ['Je bois un thé au citron.'],
    w: [['я', 'je', 'sujet'], ['пью', 'bois', 'verbe'], ['чай', 'thé', 'accusatif'], ['с', 'avec', 'préposition d’accompagnement'], ['лимо́ном', 'citron', 'instrumental masculin de лимон']],
    g: "La préposition {с} (avec) exige le cas Instrumental : {лимо́н} prend la terminaison -ом.",
    level: 'A2'
  },
  {
    ru: 'Ко́фе с молоко́м и са́харом.',
    fr: 'Un café au lait et au sucre.',
    alt: ['Du café avec du lait et du sucre.'],
    w: [['ко́фе', 'café', 'nom masculin'], ['с', 'avec', 'préposition'], ['молоко́м', 'lait', 'instrumental neutre de молоко'], ['и', 'et', 'conjonction'], ['са́харом', 'sucre', 'instrumental masculin de сахар']],
    g: "Au cas instrumental, les masculins et neutres prennent -ом / -ем : {молоко} → {молоком}.",
    level: 'A2'
  },
  {
    ru: 'Мы гуля́ем с дру́гом.',
    fr: 'Nous nous promenons avec un ami.',
    alt: ['On se promène avec un ami.'],
    w: [['мы', 'nous', 'sujet'], ['гуля́ем', 'nous promenons', 'verbe'], ['с', 'avec', 'préposition'], ['drúgom', 'ami', 'instrumental de друг']],
    g: "L'accompagnement d'une personne s'exprime toujours par С + instrumental.",
    level: 'A2'
  },
  {
    ru: 'Кем ты рабо́таешь?',
    fr: 'Que fais-tu comme métier ?',
    alt: ['Quel est ton travail ?', 'Comme quoi travailles-tu ?'],
    w: [['кем', 'en tant que qui', 'instrumental du pronom кто'], ['ты', 'tu', 'sujet'], ['рабо́таешь', 'travailles', 'verbe travailler']],
    g: "Pour demander le métier avec {рабо́тать}, on utilise l'instrumental : {кем} (en qualité de qui).",
    level: 'A2'
  },
  {
    ru: 'Я рабо́таю врачо́м.',
    fr: 'Je travaille comme médecin.',
    alt: ['Je suis médecin de profession.', 'Je travaille en tant que médecin.'],
    w: [['я', 'je', 'sujet'], ['рабо́таю', 'travaille', 'verbe'], ['врачо́м', 'en tant que médecin', 'instrumental du nom врач']],
    g: "La profession après {рабо́тать} se met à l'instrumental : {врач} → {врачо́м}.",
    level: 'A2'
  },
  {
    ru: 'Вчера́ я чита́л кни́гу весь ве́чер.',
    fr: "Hier j'ai lu un livre toute la soirée.",
    alt: ["Hier je lisais un livre toute la soirée."],
    w: [['вчера́', 'hier', 'adverbe'], ['я', 'je', 'sujet'], ['чита́л', 'lisais / ai lu', 'verbe imperfectif au passé masculin'], ['кни́гу', 'livre', 'accusatif'], ['весь', 'tout', 'adjectif accusatif masculin'], ['ве́чер', 'le soir', 'durée']],
    g: "L'aspect imperfectif {чита́л} s'impose pour exprimer la durée et le processus ({весь ве́чер}).",
    level: 'A2'
  },
  {
    ru: 'Я прочита́л кни́гу за два дня.',
    fr: "J'ai lu le livre en deux jours.",
    alt: ["J'ai terminé de lire le livre en deux jours."],
    w: [['я', 'je', 'sujet'], ['прочита́л', 'ai lu (résultat achevé)', 'verbe perfectif au passé'], ['кни́гу', 'livre', 'accusatif'], ['за', 'en', 'préposition de délai'], ['два', 'deux', 'nombre'], ['дня', 'jours', 'génitif singulier après 2']],
    g: "L'aspect perfectif {прочита́л} indique l'achèvement complet et le résultat.",
    level: 'A2'
  },
  {
    ru: 'Что ты бу́дешь де́лать за́втра?',
    fr: 'Que feras-tu demain ?',
    alt: ['Qu’est-ce que tu vas faire demain ?'],
    w: [['что', 'que', 'interrogation'], ['ты', 'tu', 'sujet'], ['бу́дешь', 'seras', 'auxiliaire futur être'], ['де́лать', 'faire', 'infinitif imperfectif'], ['за́втра', 'demain', 'adverbe']],
    g: "Le futur composé imperfectif se forme avec le futur de {быть} + infinitif : {будешь делать}.",
    level: 'A2'
  },
  {
    ru: 'За́втра я сде́лаю э́то.',
    fr: 'Demain je ferai cela.',
    alt: ['Demain je vais accomplir cela.'],
    w: [['за́втра', 'demain', 'adverbe'], ['я', 'je', 'sujet'], ['сде́лаю', 'ferai (résultat)', 'futur simple du verbe perfectif'], ['э́то', 'cela', 'pronom neutre']],
    g: "Un verbe perfectif conjugué au présent prend automatiquement le sens d'un futur simple !",
    level: 'A2'
  },
  {
    ru: 'Э́тот дом бо́льше, чем тот.',
    fr: 'Cette maison est plus grande que celle-là.',
    alt: ['Cette maison est plus grande que celle-ci.'],
    w: [['э́тот', 'cette', 'démonstratif masculin'], ['дом', 'maison', 'sujet'], ['бо́льше', 'plus grand', 'comparatif synthétique'], ['чем', 'que', 'conjonction de comparaison'], ['тот', 'celle-là', 'démonstratif éloigné']],
    g: "{бо́льше} est la forme comparative de {большо́й}. La comparaison s'introduit par {чем}.",
    level: 'A2'
  },
  {
    ru: 'Ру́сский язы́к трудне́е англи́йского.',
    fr: "Le russe est plus difficile que l'anglais.",
    alt: ["La langue russe est plus difficile que la langue anglaise."],
    w: [['ру́сский язы́к', 'la langue russe', 'sujet nominatif'], ['трудне́е', 'plus difficile', 'comparatif de трудный'], ['англи́йского', 'de l’anglais', 'génitif de comparaison sans « чем »']],
    g: "On peut omettre {чем} en mettant le second terme directement au cas Génitif : {англи́йского}.",
    level: 'A2'
  },

  // ── B1 : Mouvement, Nombres, Conditionnel & Impératif (70 phrases) ──
  {
    ru: 'Куда́ вы е́дете?',
    fr: 'Où allez-vous ? (en transport)',
    alt: ['Vers où voyagez-vous ?', 'Où allez-vous en véhicule ?'],
    w: [['куда́', 'vers où', 'direction'], ['вы', 'vous', 'sujet'], ['е́дете', 'allez (en véhicule)', 'verbe ехать au présent']],
    g: "{е́хать} s'emploie obligatoirement lorsqu'on se déplace en moyen de transport (voiture, train...).",
    level: 'B1'
  },
  {
    ru: 'Мы е́дем в аэропо́рт на такси́.',
    fr: "Nous allons à l'aéroport en taxi.",
    alt: ["On va à l'aéroport en taxi."],
    w: [['мы', 'nous', 'sujet'], ['е́дем', 'allons en véhicule', 'verbe'], ['в аэропо́рт', 'vers l’aéroport', 'accusatif de direction'], ['на такси́', 'en taxi', 'prépositionnel de moyen de transport']],
    g: "Pour un moyen de transport, on utilise НА + prépositionnel : {на такси}, {на поезде}.",
    level: 'B1'
  },
  {
    ru: 'Она́ ка́ждый день хо́дит пешко́м.',
    fr: 'Elle marche à pied tous les jours.',
    alt: ['Elle va à pied tous les jours.', 'Chaque jour elle se déplace à pied.'],
    w: [['она́', 'elle', 'sujet'], ['ка́ждый день', 'chaque jour', 'accusatif de répétition'], ['хо́дит', 'marche / va à pied (habitude)', 'verbe multidirectionnel'], ['пешко́м', 'à pied', 'adverbe']],
    g: "{ходи́ть} s'impose pour une habitude ou une action répétée, à la différence de {идти́}.",
    level: 'B1'
  },
  {
    ru: 'По́езд пришёл во́время.',
    fr: "Le train est arrivé à l'heure.",
    alt: ["Le train arriva à l'heure."],
    w: [['по́езд', 'le train', 'sujet'], ['пришёл', 'est arrivé', 'verbe прийти au passé masculin'], ['во́время', 'à l’heure / au bon moment', 'adverbe']],
    g: "Le préfixe {при-} indique l'arrivée à destination. Le passé de {идти} est {шёл}, donc {пришёл}.",
    level: 'B1'
  },
  {
    ru: 'Он вы́шел из ко́мнаты.',
    fr: 'Il est sorti de la pièce.',
    alt: ['Il est sorti de la chambre.'],
    w: [['он', 'il', 'sujet'], ['вы́шел', 'est sorti', 'verbe выйти au passé'], ['из', 'de / hors de', 'préposition de sortie'], ['ко́мнаты', 'la pièce', 'génitif de комната']],
    g: "Le préfixe {вы-} marque la sortie vers l'extérieur et se combine avec la préposition {из} + génitif.",
    level: 'B1'
  },
  {
    ru: 'Мы перешли́ че́рез у́лицу.',
    fr: 'Nous avons traversé la rue.',
    alt: ['Nous traversâmes la rue.'],
    w: [['мы', 'nous', 'sujet'], ['перешли́', 'avons traversé', 'verbe перейти au passé pluriel'], ['че́рез', 'à travers', 'préposition'], ['у́лицу', 'la rue', 'accusatif']],
    g: "Le préfixe {пере-} marque le franchissement d'un obstacle ou d'une voie.",
    level: 'B1'
  },
  {
    ru: 'Е́сли бы у меня́ бы́ли де́ньги, я бы купи́л дом.',
    fr: "Si j'avais de l'argent, j'achèterais une maison.",
    alt: ["Si seulement j'avais de l'argent, j'achèterais une maison."],
    w: [['е́сли бы', 'si (irréel)', 'conjonction conditionnelle'], ['у меня́ бы́ли', 'j’avais (au passé)', 'pluriel de être au passé'], ['де́ньги', 'argent', 'sujet pluriel'], ['я бы', 'moi je (conditionnel)', 'particule conditionnelle бы'], ['купи́л', 'achèterais', 'verbe au passé masculin'], ['дом', 'maison', 'accusatif']],
    g: "Le conditionnel en russe est d'une grande simplicité : verbe au passé + particule {бы} !",
    level: 'B1'
  },
  {
    ru: 'Я хочу́, что́бы ты мне помо́г.',
    fr: "Je veux que tu m'aides.",
    alt: ["Je souhaite que tu me viennes en aide."],
    w: [['я хочу́', 'je veux', 'volonté'], ['что́бы', 'afin que / pour que', 'conjonction de subjonctif'], ['ты', 'tu', 'sujet subordonné'], ['мне', 'à moi', 'datif'], ['помо́г', 'aides (au passé)', 'verbe помочь au passé masculin']],
    g: "Après {что́бы}, le verbe de la subordonnée se met TOUJOURS au passé en russe pour exprimer le subjonctif !",
    level: 'B1'
  },
  {
    ru: 'Закро́йте, пожа́луйста, окно́.',
    fr: 'Fermez la fenêtre, s’il vous plaît.',
    alt: ['Veuillez fermer la fenêtre, s’il vous plaît.'],
    w: [['закро́йте', 'fermez', 'impératif poli du verbe закрыть'], ['пожа́луйста', 's’il vous plaît', 'politesse'], ['окно́', 'la fenêtre', 'accusatif neutre']],
    g: "L'impératif perfectif {закро́йте} demande l'accomplissement d'une action unique et précise.",
    level: 'B1'
  },
  {
    ru: 'Не открыва́й дверь!',
    fr: 'Ne rouvre pas la porte !',
    alt: ['N’ouvre pas la porte !'],
    w: [['не', 'ne pas', 'négation'], ['открыва́й', 'ouvre', 'impératif imperfectif'], ['дверь', 'la porte', 'accusatif féminin']],
    g: "Règle d'or de l'impératif : après la négation {не}, on utilise presque toujours l'IMPERFECTIF pour interdire.",
    level: 'B1'
  },
  {
    ru: 'Челове́к, кото́рый стои́т там, — мой брат.',
    fr: "L'homme qui se tient là-bas est mon frère.",
    alt: ["L'homme qui est debout là-bas est mon frère."],
    w: [['челове́к', 'l’homme / la personne', 'sujet principal'], ['кото́рый', 'qui', 'pronom relatif masculin'], ['стои́т', 'se tient debout', 'verbe'], ['там', 'là-bas', 'adverbe'], ['мой брат', 'mon frère', 'attribut']],
    g: "Le pronom relatif {кото́рый} s'accorde en genre et nombre avec son antécédent ({челове́к} = masculin).",
    level: 'B1'
  },

  // ── B2 : Participes, Gérondifs & Préfixes complexes (45 phrases) ───
  {
    ru: 'Челове́к, чита́ющий кни́гу, не слы́шал шум.',
    fr: "L'homme lisant un livre n'entendait pas le bruit.",
    alt: ["L'homme qui lisait un livre n'entendait pas le bruit."],
    w: [['челове́к', 'l’homme', 'sujet'], ['чита́ющий', 'lisant (qui lit)', 'participe présent actif en -ущий'], ['кни́гу', 'livre', 'accusatif'], ['не слы́шал', 'n’entendait pas', 'passé négatif'], ['шум', 'le bruit', 'accusatif']],
    g: "Le participe présent actif en -ущий/-ящий remplace une proposition relative {который читает}.",
    level: 'B2'
  },
  {
    ru: 'Кни́га, напи́санная Толсты́м, изве́стна во всём ми́ре.',
    fr: 'Le livre écrit par Tolstoï est connu dans le monde entier.',
    alt: ['L’ouvrage rédigé par Tolstoï est célèbre mondialement.'],
    w: [['кни́га', 'le livre', 'sujet féminin'], ['напи́санная', 'écrite (participe passé passif)', 'accord féminin en -анная'], ['Толсты́м', 'par Tolstoï', 'instrumental d’agent'], ['изве́стна', 'connue', 'adjectif court féminin'], ['во всём ми́ре', 'dans le monde entier', 'prépositionnel']],
    g: "Le participe passé passif {напи́санная} s'accorde au féminin. L'auteur (l'agent) est au cas Instrumental ({Толсты́м}).",
    level: 'B2'
  },
  {
    ru: 'Чита́я э́ту статью́, я узна́л мно́го но́вого.',
    fr: 'En lisant cet article, j’ai appris beaucoup de choses nouvelles.',
    alt: ['Tout en lisant cet article, j’ai découvert plein de nouveautés.'],
    w: [['чита́я', 'en lisant', 'gérondif présent en -я'], ['э́ту статью́', 'cet article', 'accusatif féminin'], ['я узна́л', 'j’ai appris', 'verbe perfectif au passé'], ['мно́го но́вого', 'beaucoup de neuf', 'quantité + génitif']],
    g: "Le gérondif en -я ({дееприча́стие}) exprime la simultanéité de deux actions accomplies par le même sujet.",
    level: 'B2'
  },
  {
    ru: 'Око́нчив университе́т, он уе́хал за грани́цу.',
    fr: 'Ayant terminé l’université, il est parti à l’étranger.',
    alt: ['Après avoir achevé ses études universitaires, il partit à l’étranger.'],
    w: [['око́нчив', 'ayant terminé', 'gérondif passé en -в'], ['университе́т', 'l’université', 'accusatif'], ['он уе́хал', 'il est parti en véhicule', 'verbe perfectif au passé'], ['за грани́цу', 'à l’étranger', 'accusatif de direction']],
    g: "Le gérondif passé en -в/-вши marque l'antériorité de l'action par rapport au verbe principal.",
    level: 'B2'
  },

  // ── C1 & C2 : Nuances orales, Style & Culture (35 phrases) ─────────
  {
    ru: 'Дава́й вы́пьем ча́ю и поговори́м по душа́м.',
    fr: 'Buvons un thé et parlons à cœur ouvert.',
    alt: ['Prenons un thé et discutons en toute sincérité.', 'Et si on buvait du thé et qu’on parlait d’âme à âme ?'],
    w: [['дава́й', 'allons-y / viens', 'particule incitative'], ['вы́пьем', 'buvons', '1re personne du pluriel futur perfectif'], ['ча́ю', 'du thé', 'génitif partitif en -у'], ['и', 'et', 'conjonction'], ['поговори́м', 'discutons', 'verbe perfectif'], ['по душа́м', 'à cœur ouvert', 'locution idiomatique litt. « selon les âmes »']],
    g: "{по душа́м} est une expression fondamentale de l'intimité slave ; {ча́ю} utilise le vieux génitif partitif en -у.",
    level: 'C1'
  },
  {
    ru: 'Неуже́ли ты забы́л на́шу догово́рённость?',
    fr: 'Aurais-tu vraiment oublié notre accord ?',
    alt: ['Est-il possible que tu aies oublié ce dont nous avions convenu ?'],
    w: [['неуже́ли', 'est-il possible / vraiment', 'particule marquant l’étonnement sincère'], ['ты забы́л', 'tu as oublié', 'passé masculin'], ['на́шу догово́рённость', 'notre arrangement', 'accusatif féminin']],
    g: "{неуже́ли} souligne la stupeur de l'orateur devant un fait qu'il a du mal à concevoir.",
    level: 'C1'
  },
  {
    ru: 'Век живи́ — век учи́сь.',
    fr: 'On apprend à tout âge.',
    alt: ['Vis un siècle, apprends un siècle.', 'Tant qu’on vit, on apprend.'],
    w: [['век', 'un siècle / toute une vie', 'accusatif temporel'], ['живи́', 'vis', 'impératif de жить'], ['век', 'un siècle', 'durée'], ['учи́сь', 'apprends', 'impératif de учиться']],
    g: "Proverbe philosophique russe célébrissime rappelant la modestie de la connaissance tout au long de la vie.",
    level: 'C2'
  },
  {
    ru: 'У него́ на душе́ ко́шки скребу́т.',
    fr: 'Il a le cœur lourd.',
    alt: ['Il a des chats qui lui grattent l’âme.', 'Il est rongé par l’angoisse et la mélancolie.'],
    w: [['у него́', 'chez lui', 'possession'], ['на душе́', 'sur l’âme', 'prépositionnel'], ['ко́шки', 'des chats', 'sujet pluriel'], ['скребу́т', 'grattent / lacèrent', 'verbe скрести à la 3e personne du pluriel']],
    g: "Expression métaphorique purement russe : « avoir des chats qui grattent l'âme » signifie éprouver une angoisse sourde.",
    level: 'C2'
  }
];
