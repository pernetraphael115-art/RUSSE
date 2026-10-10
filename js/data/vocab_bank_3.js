// Banque 3 de vocabulaire russe (70+ mots additionnels avec notes culturelles et exemples traduits)
// Format : [ru, fr, cat, note, [[ex_ru, ex_fr, ex_note]], forms, level]

export const VOCABULARY_BANK_3 = [
  // ── 1. Vêtements & Style (A1-A2) ───────────────────────────
  ['пальто́', 'manteau', 'nom n. invariable', 'Nom d’origine française invariable en russe.', [['Зимой нужно тёплое пальто.', 'En hiver, il faut un manteau chaud.', 'Adjectif neutre']], [], 'A1'],
  ['ша́пка', 'bonnet / toque', 'nom f.', 'Indispensable en hiver (« ушанка » = chapka à oreilles).', [['Надень шапку, на улице мороз!', 'Mets un bonnet, il gèle dehors !', 'Impératif']], [], 'A1'],
  ['шарф', 'écharpe', 'nom m.', 'Pluriel : шарфы (accent sur le а).', [['Я купил шерстяной шарф.', 'J’ai acheté une écharpe en laine.', 'Accusatif']], [], 'A1'],
  ['ку́ртка', 'veste / blouson', 'nom f.', 'Vêtement court d’extérieur.', [['Где моя куртка?', 'Où est ma veste ?', 'Possessif f.']], [], 'A1'],
  ['пла́тье', 'robe', 'nom n.', 'Génitif : платья, pluriel : платья.', [['У неё красивое платье.', 'Elle a une belle robe.', 'Adjectif neutre']], [], 'A1'],
  ['руба́шка', 'chemise', 'nom f.', 'Chemise d’homme ou de femme.', [['Белая рубашка с галстуком.', 'Une chemise blanche avec une cravate.', 'Instrumental']], [], 'A1'],
  ['брю́ки', 'pantalon', 'nom pl. tantum', 'Toujours au pluriel en russe (comme ciseaux).', [['Эти брюки слишком длинные.', 'Ce pantalon est trop long.', 'Pluriel']], [], 'A1'],
  ['о́бувь', 'chaussures', 'nom f. collectif', 'Désigne l’ensemble des chaussures en tant que catégorie.', [['Снимите обувь в прихожей.', 'Enlevez vos chaussures dans l’entrée.', 'Tradition slave']], [], 'A1'],
  ['боти́нки', 'bottines / chaussures montantes', 'nom pl.', 'Singulier : ботинок.', [['Кожаные ботинки.', 'Des bottines en cuir.', 'Matière']], [], 'A1'],
  ['костю́м', 'costume / tailleur', 'nom m.', 'Vêtement formel ou de sport (спортивный костюм).', [['Деловой костюм.', 'Un costume d’affaires.', 'Professionnel']], [], 'A2'],
  ['ю́бка', 'jupe', 'nom f.', 'Pluriel : юбки.', [['Она носит длинную юбку.', 'Elle porte une jupe longue.', 'Accusatif f.']], [], 'A1'],
  ['перча́тки', 'gants', 'nom pl.', 'Singulier : перчатка.', [['Я потерял перчатки в метро.', 'J’ai perdu mes gants dans le métro.', 'Passé m.']], [], 'A1'],

  // ── 2. Couleurs (A0-A1) ────────────────────────────────────
  ['кра́сный', 'rouge', 'adjectif', 'Symbole traditionnel de beauté en russe (Красная площадь = Place Belle/Rouge).', [['Красная площадь в Москве.', 'La place Rouge à Moscou.', 'Culture']], [], 'A0'],
  ['си́ний', 'bleu foncé', 'adjectif doux', 'Le russe distingue strictement le bleu foncé (синий) du bleu ciel (голубой).', [['Тёмно-синее небо.', 'Un ciel bleu foncé.', 'Adjectif neutre']], [], 'A0'],
  ['голубо́й', 'bleu clair / azur', 'adjectif', 'Couleur du ciel ou de l’eau limpide.', [['Голубые глаза.', 'Des yeux bleus.', 'Pluriel de глаз']], [], 'A0'],
  ['зелёный', 'vert', 'adjectif', 'Comme la taïga ou le thé vert.', [['Зелёный чай полезен.', 'Le thé vert est bon pour la santé.', 'Santé']], [], 'A0'],
  ['жёлтый', 'jaune', 'adjectif', 'Accent sur le ё : [jóltyï].', [['Жёлтые осенние листья.', 'Des feuilles jaunes d’automne.', 'Automne']], [], 'A0'],
  ['бе́лый', 'blanc', 'adjectif', 'Couleur de la neige et des « nuits blanches » de Pétersbourg.', [['Белые ночи в Петербурге.', 'Les nuits blanches à Pétersbourg.', 'Culture']], [], 'A0'],
  ['чёрный', 'noir', 'adjectif', 'Pain noir (чёрный хлеб) = base de l’alimentation russe.', [['Чёрный кофе без сахара.', 'Un café noir sans sucre.', 'Alimentation']], [], 'A0'],
  ['се́рый', 'gris', 'adjectif', 'Couleur du loup et du ciel d’hiver.', [['Серый волк из сказки.', 'Le loup gris du conte.', 'Folklore']], [], 'A0'],
  ['кори́чневый', 'marron / brun', 'adjectif', 'Vient de корица (cannelle).', [['Коричневая сумка.', 'Un sac marron.', 'Féminin']], [], 'A1'],
  ['ро́зовый', 'rose', 'adjectif', 'Vient de роза (rose la fleur).', [['Розовые цветы.', 'Des fleurs roses.', 'Pluriel']], [], 'A1'],

  // ── 3. Animaux & Nature vivante (A1-A2) ────────────────────
  ['соба́ка', 'chien', 'nom f.', 'Meilleur ami de l’homme.', [['Собака лает на прохожих.', 'Le chien aboie sur les passants.', 'Présent']], [], 'A1'],
  ['ко́шка', 'chat (femelle) / chat en général', 'nom f.', 'Le mâle spécifique se dit кот.', [['Кошка спит на диване.', 'Le chat dort sur le canapé.', 'Présent']], [], 'A1'],
  ['кот', 'chat (mâle)', 'nom m.', 'Très populaire dans les appartements russes.', [['У нас живёт рыжий кот.', 'Un chat roux vit chez nous.', 'Couleur']], [], 'A1'],
  ['пти́ца', 'oiseau', 'nom f.', 'Pluriel : птицы.', [['Птицы поют на рассвете.', 'Les oiseaux chantent à l’aube.', 'Pluriel']], [], 'A1'],
  ['ры́ба', 'poisson', 'nom f.', 'Aussi poisson comme aliment.', [['В реке много рыбы.', 'Il y a beaucoup de poisson dans la rivière.', 'Génitif']], [], 'A1'],
  ['медве́дь', 'ours', 'nom m.', 'Symbole national mythique de la faune russe. Litt. « celui qui sait où est le miel ».', [['Белый медведь живёт на севере.', 'L’ours blanc vit dans le Nord.', 'Faune']], [], 'A2'],
  ['волк', 'loup', 'nom m.', 'Figure centrale des contes et proverbes.', [['Волк воет на луну.', 'Le loup hurle à la lune.', 'Conte']], [], 'A2'],
  ['лиса́', 'renard', 'nom f.', 'Symbole de la ruse dans les fables slaves (лисичка).', [['Хитрая лиса украла сыр.', 'Le renard rusé a volé le fromage.', 'Passé f.']], [], 'A2'],
  ['за́яц', 'lièvre', 'nom m.', 'Génitif : зайца. Figure innocente des contes.', [['Белый заяц скачет по снегу.', 'Le lièvre blanc bondit sur la neige.', 'Hiver']], [], 'A2'],
  ['ло́шадь', 'cheval', 'nom f.', 'Déclinaison en -ери au pluriel instrumental (лошадьми).', [['Быстрая лошадь.', 'Un cheval rapide.', 'Féminin']], [], 'A2'],

  // ── 4. Loisirs, Voyages & Culture (A1-B1) ──────────────────
  ['путеше́ствие', 'voyage', 'nom n.', 'Pluriel : путешествия.', [['Увлекательное путешествие.', 'Un voyage passionnant.', 'Neutre']], [], 'A1'],
  ['музе́й', 'musée', 'nom m.', 'Prépositionnel : в музее.', [['Мы провели день в Эрмитаже.', 'Nous avons passé la journée à l’Ermitage.', 'Pétersbourg']], [], 'A1'],
  ['теа́тр', 'théâtre', 'nom m.', 'Haut lieu de la culture russe.', [['Билеты в театр раскуплены.', 'Les billets pour le théâtre sont épuisés.', 'Culture']], [], 'A1'],
  ['конце́рт', 'concert', 'nom m.', 'Prépositionnel : на концерте.', [['Мы идём на концерт классической музыки.', 'Nous allons à un concert de musique classique.', 'Accusatif']], [], 'A1'],
  ['му́зыка', 'musique', 'nom f.', 'Accent sur le у : [múzyka].', [['Она слушает русскую музыку.', 'Elle écoute de la musique russe.', 'Accusatif']], [], 'A1'],
  ['спо́рт', 'sport', 'nom m.', 'Faire du sport : заниматься спортом.', [['Спорт укрепляет здоровье.', 'Le sport fortifie la santé.', 'Santé']], [], 'A1'],
  ['пляж', 'plage', 'nom m.', 'Prépositionnel : на пляже.', [['Летом мы загорали на пляже.', 'En été, nous bronzions à la plage.', 'Loisirs']], [], 'A1'],
  ['го́ры', 'montagnes', 'nom pl.', 'Singulier : гора.', [['Кавказские горы великолепны.', 'Les monts du Caucase sont grandioses.', 'Géographie']], [], 'A2'],
  ['о́зеро', 'lac', 'nom n.', 'Pluriel : озёра.', [['Байкал — самое глубокое озеро в мире.', 'Le Baïkal est le lac le plus profond au monde.', 'Superlatif']], [], 'A2'],
  ['па́мятник', 'monument / statue', 'nom m.', 'Monument à quelqu’un : памятник + Datif.', [['Памятник Пушкину в центре города.', 'Le monument à Pouchkine au centre-ville.', 'Datif']], [], 'A2'],

  // ── 5. Particules et nuances du russe parlé (A2-B2) ────────
  ['коне́чно', 'bien sûr / évidemment', 'adverbe affirmatif', 'Prononciation particulière : le чн se prononce [shn] : [kanéshna].', [['Конечно, я помогу тебе!', 'Bien sûr, je t’aiderai !', 'Prononciation']], [], 'A1'],
  ['кста́ти', 'au fait / d’ailleurs', 'adverbe de transition', 'Permet d’introduire une pensée liée.', [['Кстати, ты читал эту статью?', 'Au fait, as-tu lu cet article ?', 'Conversation']], [], 'A2'],
  ['ла́дно', 'd’accord / bon tant pis', 'particule familière', 'Exprime l’accord ou la résignation bienveillante.', [['Ладно, пойдём в кино.', 'D’accord, allons au cinéma.', 'Oral']], [], 'A1'],
  ['дава́й', 'allons-y / allez / donne', 'particule incitative', 'Pour proposer une action commune : давай + infinitif ou futur.', [['Давай выпьем кофе.', 'Allons boire un café !', 'Suggestion']], [], 'A1'],
  ['неуже́ли', 'est-ce bien possible ? / vraiment ?', 'particule d’étonnement', 'Exprime la stupeur incrédule.', [['Неужели ты не знал об этом?', 'Vraiment, tu n’étais pas au courant ?', 'Étonnement']], [], 'B1'],
  ['вряд ли', 'il est peu probable que', 'particule de doute', 'Exprime un scepticisme poli.', [['Вряд ли поезд придёт вовремя.', 'Il est peu probable que le train arrive à l’heure.', 'Doute']], [], 'B1'],
  ['пожа́луй', 'sans doute / plutôt / peut-être bien', 'adverbe de modalité', 'Atténue une affirmation avec élégance.', [['Пожалуй, я останусь дома.', 'Je crois bien que je vais rester à la maison.', 'Nuance']], [], 'B2'],
  ['ведь', 'puisque / pourtant / n’est-ce pas', 'particule d’évidence', 'Rappelle une vérité censée être connue de l’interlocuteur.', [['Ты ведь обещал прийти!', 'Pourtant tu avais promis de venir !', 'Insistance']], [], 'B1'],
  ['и́менно', 'justement / précisément', 'particule de précision', 'Met en valeur le mot suivant.', [['Именно об этом я и говорил.', 'C’est précisément de cela que je parlais.', 'Précision']], [], 'B1'],
  ['действи́тельно', 'en effet / véritablement', 'adverbe de confirmation', 'Confirme la véracité d’un fait.', [['Это действительно прекрасная идея.', 'C’est en effet une excellente idée.', 'Accord']], [], 'B1'],
  ['наве́рное', 'probablement / sans doute', 'adverbe de probabilité', 'Familier : наверно.', [['Наверное, он опоздает.', 'Sans doute aura-t-il du retard.', 'Supposition']], [], 'A2'],
  ['то́чно', 'exactement / précisément', 'adverbe affirmatif', 'Aussi « comme » dans une comparaison poétique.', [['Я знаю это точно.', 'Je le sais avec certitude.', 'Certitude']], [], 'A1'],
  ['вро́де', 'du genre de / comme / paraît-il', 'préposition & particule', 'Exprime une ressemblance floue.', [['Он вроде согласен.', 'Il a l’air d’accord.', 'Familier']], [], 'B2'],
  ['про́сто', 'simplement / juste', 'adverbe & particule', 'Omniprésent à l’oral.', [['Я просто хотел спросить.', 'Je voulais juste poser une question.', 'Adoucissement']], [], 'A1'],
  ['совсе́м', 'tout à fait / entièrement', 'adverbe de degré', 'Avec négation : совсем не = pas du tout.', [['Я совсем не устал.', 'Je ne suis pas du tout fatigué.', 'Négation absolue']], [], 'A2'],
  ['чуть-чу́ть', 'un tout petit peu', 'adverbe familier', 'Diminutif redoublé de чуть.', [['Налей мне чуть-чуть чая.', 'Verse-moi un tout petit peu de thé.', 'Familier affectueux']], [], 'A1'],
  ['наоборо́т', 'au contraire / à l’envers', 'adverbe d’inversion', 'Opposition directe.', [['Всё произошло наоборот.', 'Tout s’est produit à l’inverse.', 'Opposition']], [], 'B1'],
  ['похо́же', 'on dirait / il semble que', 'adverbe d’apparence', 'Basé sur похожий (ressemblant).', [['Похоже, будет дождь.', 'On dirait qu’il va pleuvoir.', 'Supposition']], [], 'B1'],
  ['наде́юсь', 'j’espère', 'verbe incident', 'Employé comme incise pour exprimer l’espérance.', [['Надеюсь, у тебя всё в порядке.', 'J’espère que tout va bien pour toi.', 'Bienveillance']], [], 'A1'],
  ['гла́вное', 'l’essentiel / le plus important', 'adjectif substantivé neutre', 'Met en exergue la priorité absolue.', [['Главное — не сдаваться!', 'L’essentiel est de ne pas abandonner !', 'Motivation']], [], 'A2']
];
