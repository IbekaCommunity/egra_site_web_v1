export const NEWS_CATEGORIES = ["events", "academic", "life"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  /** Stable id shared by both languages (used for the article anchor). */
  id: string;
  category: NewsCategory;
  /** Calendar day, YYYY-MM-DD. */
  date: string;
  title: string;
  desc: string;
  body: string[];
};

// Typed identity helper so `category` stays a literal union, not `string`.
export function newsItems(items: NewsItem[]): NewsItem[] {
  return items;
}

// French is the reference dictionary: its shape defines `Dictionary`.
export const fr = {
  meta: {
    homeTitle: "EGRA International School — École internationale bilingue",
    homeDescription:
      "École internationale bilingue français-anglais, du préscolaire au secondaire. Think Global, Learn Local.",
  },
  nav: {
    home: "Accueil",
    school: "L'école",
    programs: "Nos formations",
    admissions: "Admissions",
    news: "Actualités",
    contact: "Contact",
    menu: "Menu",
    language: "Langue",
    parentsSpace: "Espace parents",
    enroll: "Pré-inscrire mon enfant",
    schoolMenu: {
      facilities: "Nos installations",
      facilitiesDesc: "Des salles modernes, une bibliothèque et des espaces sportifs.",
      gallery: "Galerie",
      galleryDesc: "La vie de l'école en images, au fil des événements.",
      admissions: "Admissions",
      admissionsDesc: "Les étapes pour inscrire votre enfant chez nous.",
      fees:'Frais',
      feesDesc:'Découvrez la liste de nos frais scolaires ',
      learnMore: "Découvrez l'école qui fait grandir vos enfants.",
      visit: "Visiter l'école",
    },
  },
  hero: {
    eyebrow: "Bienvenue à EGRA International School",
    titleStart: "Une éducation bilingue",
    titleHighlight: "pour un avenir sans frontières",
    description:
      "Du préscolaire au secondaire, nous formons des élèves curieux, confiants et ouverts sur le monde, en français et en anglais, sans jamais oublier leurs racines.",
    enroll: "Pré-inscrire mon enfant",
    discover: "Découvrir l'école",
    stats: [
      { value: "2", label: "langues d'enseignement" },
      { value: "3", label: "cycles, du préscolaire au secondaire" },
      { value: "100%", label: "d'attention à chaque élève" },
    ],
    photoAlt: "Élève souriante d'EGRA International School en classe",
  },
  features: {
    eyebrow: "Nos atouts",
    title: "Pourquoi choisir EGRA ?",
    items: [
      {
        title: "Un enseignement de qualité",
        desc: "Des enseignants qualifiés et passionnés, engagés pour la réussite de chaque élève.",
      },
      {
        title: "Un environnement bienveillant",
        desc: "Un cadre sûr, moderne et stimulant pour apprendre et s'épanouir.",
      },
      {
        title: "Des formations variées",
        desc: "Du préscolaire au secondaire, avec des parcours adaptés à chaque profil.",
      },
      {
        title: "Un suivi personnalisé",
        desc: "Un accompagnement régulier pour révéler le potentiel de chaque élève.",
      },
    ],
  },
  bilingual: {
    eyebrow: "Think Global, Learn Local",
    title: "Deux langues, une seule ambition",
    description:
      "Chez EGRA, le français et l'anglais se vivent au quotidien : en classe, dans la cour et lors de nos événements. Nos élèves gagnent l'aisance nécessaire pour étudier et réussir partout dans le monde, tout en restant fiers de leur culture.",
    points: [
      "Enseignement en français et en anglais dès le préscolaire",
      "Ouverture culturelle et valeurs africaines célébrées",
      "Préparation aux études internationales",
    ],
    photoAlt: "Élèves et enseignantes d'EGRA en tenue traditionnelle",
  },
  levels: {
    eyebrow: "Nos formations",
    title: "Un parcours complet, de 3 à 18 ans",
    cta: "Voir nos formations",
    items: [
      {
        name: "Préscolaire",
        ages: "3 – 5 ans",
        desc: "Éveil, jeu et premiers pas en français et en anglais dans un cadre chaleureux.",
      },
      {
        name: "Primaire",
        ages: "6 – 11 ans",
        desc: "Les fondamentaux solides : lecture, écriture, calcul, sciences et langues.",
      },
      {
        name: "Secondaire",
        ages: "12 – 18 ans",
        desc: "Exigence académique, esprit critique et préparation aux examens et aux études supérieures.",
      },
    ],
  },
  gallery: {
    eyebrow: "Galerie",
    title: "La vie à EGRA",
    cta: "Voir la galerie",
    alts: [
      "Élèves d'EGRA en uniforme",
      "Élèves attentives lors d'une conférence",
      "Groupe d'élèves et d'enseignantes devant une fresque",
      "Élève souriante en classe",
    ],
  },
  news: {
    eyebrow: "Actualités",
    title: "Les dernières nouvelles",
    seeAll: "Voir toutes les actualités",
    readMore: "Lire la suite",
    categories: {
      all: "Tout",
      events: "Événements",
      academic: "Vie académique",
      life: "Vie scolaire",
    },
    items: newsItems([
      {
        id: "nouveau-batiment",
        category: "events",
        date: "2025-04-15",
        title: "Inauguration du nouveau bâtiment scolaire",
        desc: "Nous sommes ravis d'annoncer l'ouverture de notre nouveau bâtiment, conçu pour offrir un environnement d'apprentissage encore plus moderne.",
        body: [
          "C'est avec une grande fierté que nous avons inauguré notre nouveau bâtiment en présence des familles, des enseignants et de nos partenaires.",
          "Ces nouveaux espaces accueillent des salles de classe lumineuses, une bibliothèque agrandie et des salles spécialisées pour les sciences et l'informatique.",
          "Merci à toutes celles et ceux qui ont rendu ce projet possible. Nos élèves disposent désormais d'un cadre à la hauteur de leurs ambitions.",
        ],
      },
      {
        id: "remise-des-prix",
        category: "academic",
        date: "2025-04-10",
        title: "Remise des prix du trimestre",
        desc: "Félicitations à tous nos élèves pour leurs efforts et leurs excellents résultats lors de la cérémonie de remise des prix.",
        body: [
          "La cérémonie de remise des prix a récompensé les élèves qui se sont distingués par leurs résultats, leurs progrès et leur engagement.",
          "Au-delà des notes, nous avons aussi salué l'esprit d'équipe, l'entraide et la persévérance, des valeurs au cœur du projet EGRA.",
          "Bravo à tous les lauréats, et merci aux parents pour leur soutien constant.",
        ],
      },
      {
        id: "portes-ouvertes-2025",
        category: "events",
        date: "2025-04-05",
        title: "Portes ouvertes 2025",
        desc: "Venez découvrir notre établissement, nos infrastructures et rencontrer notre équipe pédagogique le 20 avril 2025.",
        body: [
          "Le 20 avril 2025, EGRA International School ouvre ses portes aux familles qui souhaitent découvrir l'école.",
          "Au programme : visite des classes et des installations, rencontre avec la direction et les enseignants, et présentation de notre parcours bilingue.",
          "C'est aussi l'occasion de poser toutes vos questions sur les admissions pour la prochaine rentrée.",
        ],
      },
      {
        id: "journee-culturelle",
        category: "life",
        date: "2025-03-11",
        title: "Journée culturelle : nos racines à l'honneur",
        desc: "Tenues traditionnelles, danses et fresques : élèves et enseignants ont célébré la richesse de nos cultures.",
        body: [
          "Pour notre journée culturelle, élèves et enseignants ont revêtu leurs plus belles tenues traditionnelles.",
          "Danses, contes, découvertes culinaires et une grande photo de groupe devant la fresque de l'école ont rythmé cette journée pleine de couleurs.",
          "« Think Global, Learn Local » : s'ouvrir au monde commence par être fier de qui l'on est.",
        ],
      },
      {
        id: "conference-orientation",
        category: "academic",
        date: "2025-02-20",
        title: "Conférence sur l'orientation et les métiers",
        desc: "Nos élèves du secondaire ont échangé avec des professionnels pour préparer leur avenir.",
        body: [
          "Des professionnels de divers horizons sont venus présenter leur parcours et leur métier à nos élèves du secondaire.",
          "Les élèves ont pu poser leurs questions sur les études supérieures, en Afrique comme à l'international.",
          "Une rencontre inspirante qui aide chacun à construire son projet d'avenir.",
        ],
      },
      {
        id: "tournoi-sportif",
        category: "life",
        date: "2025-01-28",
        title: "Tournoi sportif inter-classes",
        desc: "Football, relais et bonne humeur : une journée placée sous le signe du fair-play.",
        body: [
          "Le tournoi inter-classes a réuni les élèves du primaire et du secondaire autour du football et des courses de relais.",
          "Au-delà de la compétition, cette journée a mis en avant le respect, l'esprit d'équipe et le fair-play.",
          "Félicitations à toutes les équipes pour leur énergie et leur bonne humeur.",
        ],
      },
    ]),
  },
  newsPage: {
    metaTitle: "Actualités",
    metaDescription:
      "Événements, vie académique et vie scolaire : toutes les nouvelles d'EGRA International School.",
    eyebrow: "Le journal de l'école",
    title: "Actualités",
    subtitle: "Événements, réussites et moments forts de la vie à EGRA.",
    featured: "À la une",
    empty: "Aucune actualité dans cette catégorie pour le moment.",
    close: "Fermer",
  },
  schoolPage: {
    metaTitle: "L'école",
    metaDescription:
      "Découvrez EGRA International School : notre mission, nos valeurs, nos installations et la vie de l'école en images.",
    eyebrow: "Think Global, Learn Local",
    title: "Une école ouverte sur le monde, fière de ses racines",
    subtitle:
      "EGRA International School accompagne chaque enfant du préscolaire au secondaire, dans un cadre bilingue, exigeant et bienveillant.",
    jump: { about: "Notre projet", facilities: "Installations", gallery: "Galerie" },
    about: {
      eyebrow: "Notre projet",
      title: "Former des citoyens du monde, ancrés dans leur culture",
      paragraphs: [
        "EGRA International School est née d'une conviction : chaque enfant mérite une éducation de niveau international, sans perdre le lien avec ses racines.",
        "Nos élèves apprennent en français et en anglais, développent leur esprit critique et leur créativité, et grandissent dans le respect des valeurs qui nous rassemblent.",
      ],
      quote: "École • Excellence • Avenir",
      photoAlt: "Élèves d'EGRA lors d'une conférence",
    },
    pillars: [
      {
        title: "Notre mission",
        desc: "Offrir une éducation bilingue de qualité qui révèle le potentiel de chaque élève et le prépare à réussir partout dans le monde.",
      },
      {
        title: "Notre vision",
        desc: "Être une référence de l'éducation internationale en Afrique, alliant ouverture sur le monde et fierté culturelle.",
      },
      {
        title: "Notre engagement",
        desc: "Un suivi personnalisé, des enseignants qualifiés et un dialogue permanent avec les familles.",
      },
    ],
    values: {
      eyebrow: "Nos valeurs",
      title: "Ce qui nous guide chaque jour",
      items: [
        { title: "Excellence", desc: "Viser le meilleur de soi, avec rigueur et persévérance." },
        { title: "Respect", desc: "Envers soi, les autres, les cultures et l'environnement." },
        { title: "Ouverture", desc: "La curiosité pour le monde, les langues et les idées." },
        { title: "Responsabilité", desc: "Devenir un citoyen engagé et autonome." },
      ],
    },
    facilities: {
      eyebrow: "Nos installations",
      title: "Un cadre moderne pour apprendre et s'épanouir",
      description:
        "Des espaces pensés pour le bien-être et la réussite des élèves, du préscolaire au secondaire.",
      items: [
        { title: "Salles de classe lumineuses", desc: "Des classes spacieuses et équipées, à effectifs maîtrisés." },
        { title: "Bibliothèque bilingue", desc: "Des livres en français et en anglais pour le plaisir de lire." },
        { title: "Laboratoire de sciences", desc: "Pour expérimenter, observer et comprendre le monde." },
        { title: "Salle informatique", desc: "Initiation au numérique et outils pour les projets." },
        { title: "Espaces sportifs", desc: "Terrain et cour pour bouger, jouer et se dépasser." },
        { title: "Sécurité et santé", desc: "Un campus surveillé et une attention constante au bien-être." },
      ],
    },
    gallery: {
      eyebrow: "Galerie",
      title: "La vie de l'école en images",
      description: "Cliquez sur une photo pour l'agrandir.",
      close: "Fermer",
      prev: "Photo précédente",
      next: "Photo suivante",
      alts: [
        "Élèves et enseignantes d'EGRA en tenue traditionnelle devant une fresque",
        "Élèves d'EGRA en uniforme",
        "Élèves attentives lors d'une conférence",
        "Élève souriante en classe",
        "Élève jouant au football",
        "Élève réalisant une expérience de sciences",
        "Élèves en salle informatique",
      ],
    },
  },
  programsPage: {
    metaTitle: "Nos formations",
    metaDescription:
      "Préscolaire, primaire et secondaire : découvrez le parcours bilingue d'EGRA International School, de 3 à 18 ans.",
    eyebrow: "Nos formations",
    title: "Un parcours bilingue, de la petite section au baccalauréat",
    subtitle:
      "À chaque âge son rythme : nous accompagnons vos enfants pas à pas, en français et en anglais, vers l'autonomie et la réussite.",
    highlightsLabel: "Les points forts",
    subjectsLabel: "Matières et activités",
    cycles: [
      {
        id: "prescolaire",
        name: "Préscolaire",
        ages: "3 – 5 ans",
        classes: "Petite, moyenne et grande section",
        intro:
          "Un premier pas à l'école tout en douceur. Par le jeu, le chant et la découverte, les tout-petits développent leur langage, leur motricité et leur confiance en eux, dans les deux langues.",
        highlights: [
          "Immersion en français et en anglais au quotidien",
          "Petits effectifs et accompagnement attentif",
          "Éveil artistique, musical et sensoriel",
          "Préparation progressive à la lecture et à l'écriture",
        ],
        subjects: ["Langage", "Éveil mathématique", "Découverte du monde", "Arts plastiques", "Musique", "Motricité"],
      },
      {
        id: "primaire",
        name: "Primaire",
        ages: "6 – 11 ans",
        classes: "Du CP au CM2",
        intro:
          "Les fondamentaux, solidement construits. Nos élèves apprennent à lire, écrire, compter et raisonner, tout en gagnant en aisance à l'oral en anglais et en curiosité scientifique.",
        highlights: [
          "Programme national enrichi d'un enseignement renforcé en anglais",
          "Suivi régulier des acquis et bulletins détaillés",
          "Projets interdisciplinaires et sorties pédagogiques",
          "Initiation au numérique et aux sciences",
        ],
        subjects: ["Français", "Anglais", "Mathématiques", "Sciences", "Histoire-géographie", "Éducation civique", "Informatique", "Sport"],
      },
      {
        id: "secondaire",
        name: "Secondaire",
        ages: "12 – 18 ans",
        classes: "Collège et lycée",
        intro:
          "Exigence académique et ouverture. Au collège puis au lycée, nos élèves développent leur esprit critique, préparent leurs examens avec méthode et construisent leur projet d'orientation.",
        highlights: [
          "Préparation rigoureuse aux examens officiels",
          "Enseignement bilingue pour viser les études internationales",
          "Accompagnement à l'orientation et rencontres avec des professionnels",
          "Clubs, débats et compétitions pour se dépasser",
        ],
        subjects: ["Français", "Anglais", "Mathématiques", "Physique-chimie", "SVT", "Histoire-géographie", "Philosophie", "Informatique", "EPS"],
      },
    ],
    approach: {
      eyebrow: "Notre pédagogie",
      title: "Comment nous enseignons",
      items: [
        { title: "Deux langues, un seul parcours", desc: "Le français et l'anglais sont des langues d'apprentissage, pas seulement des matières." },
        { title: "Chaque élève compte", desc: "Des classes à taille humaine pour un suivi personnalisé." },
        { title: "Apprendre en faisant", desc: "Projets, expériences et travail en équipe rendent les savoirs concrets." },
        { title: "Main dans la main avec les familles", desc: "Un dialogue régulier entre l'école et les parents." },
      ],
    },
    activities: {
      eyebrow: "Au-delà de la classe",
      title: "Activités parascolaires",
      description: "Pour révéler les talents de chacun et apprendre autrement.",
      items: ["Football et athlétisme", "Club de débat", "Danse et culture", "Club scientifique", "Art et dessin", "Chorale", "Club de lecture", "Informatique et robotique"],
    },
    cta: "Inscrire mon enfant",
  },
  admissionsPage: {
    metaTitle: "Admissions",
    metaDescription:
      "Comment inscrire votre enfant à EGRA International School : étapes, documents à fournir et questions fréquentes.",
    eyebrow: "Admissions",
    title: "Rejoindre la famille EGRA",
    subtitle:
      "Inscrire votre enfant est simple. Notre équipe vous accompagne de la première prise de contact jusqu'à la rentrée.",
    open: "Les inscriptions sont ouvertes",
    stepsEyebrow: "Les étapes",
    stepsTitle: "L'inscription en 4 étapes",
    steps: [
      { title: "Prise de contact", desc: "Remplissez le formulaire de pré-inscription en ligne ou passez nous voir à l'école." },
      { title: "Visite et entretien", desc: "Nous vous recevons avec votre enfant pour visiter l'école et faire connaissance." },
      { title: "Évaluation", desc: "Selon le niveau, un court test de positionnement aide à préparer l'accueil de votre enfant." },
      { title: "Inscription définitive", desc: "Vous déposez le dossier complet et confirmez l'inscription. Bienvenue chez EGRA !" },
    ],
    docsEyebrow: "Le dossier",
    docsTitle: "Documents à fournir",
    docs: [
      "Extrait d'acte de naissance de l'enfant",
      "Bulletins scolaires de l'année précédente et de l'année en cours",
      "Certificat de scolarité ou de radiation de l'ancien établissement",
      "Carnet de vaccination à jour",
      "4 photos d'identité récentes",
      "Copie de la pièce d'identité des parents ou du tuteur",
    ],
    docsNote: "La liste peut varier selon le niveau. Notre secrétariat vous confirmera les pièces nécessaires.",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "Vous vous posez des questions ?",
    faq: [
      { q: "Mon enfant ne parle pas anglais. Peut-il s'inscrire ?", a: "Oui. Nos enseignants accompagnent les nouveaux élèves pour qu'ils progressent rapidement, quel que soit leur niveau de départ." },
      { q: "Peut-on inscrire un enfant en cours d'année ?", a: "Oui, dans la limite des places disponibles. Contactez-nous pour connaître les disponibilités dans la classe souhaitée." },
      { q: "Comment connaître les frais de scolarité ?", a: "Les frais dépendent du niveau. Ils vous sont communiqués lors de la prise de contact ou de la visite de l'école." },
      { q: "Comment suivre la scolarité de mon enfant ?", a: "Une fois inscrit, vous recevez un accès à l'espace parents pour suivre les notes, les absences et les informations de l'école." },
    ],
    ctaTitle: "Prêt à commencer ?",
    ctaDesc: "Envoyez-nous une demande de pré-inscription : nous vous recontactons rapidement.",
    ctaButton: "Faire une pré-inscription",
    ctaPrograms: "Voir nos formations",
  },
  cta: {
    title: "Offrez à votre enfant une éducation sans frontières",
    description:
      "Les pré-inscriptions sont ouvertes. Notre équipe vous accompagne à chaque étape.",
    enroll: "Pré-inscrire mon enfant",
    contact: "Nous contacter",
  },
  footer: {
    motto: "Décrouvrez une différence dans une école où votre enfant n'est pas juste un élève, mais un membre de la famille Egra.",
    explore: "Explorer",
    families: "Familles",
    rights: "Tous droits réservés.",
  },
  contactPage: {
    metaTitle: "Contact et pré-inscription",
    metaDescription:
      "Contactez EGRA International School ou envoyez une demande de pré-inscription pour votre enfant.",
    eyebrow: "Contact",
    title: "Parlons de l'avenir de votre enfant",
    subtitle:
      "Une question, une visite, une pré-inscription ? Écrivez-nous : notre équipe vous répond rapidement.",
    info: {
      title: "Nos coordonnées",
      address: "Adresse",
      addressValue: "Adresse de l'école (à compléter)",
      phone: "Téléphone",
      email: "E-mail",
      hours: "Horaires du secrétariat",
      hoursValue: "Du lundi au vendredi, 7h30 – 17h00",
      parentsTitle: "Déjà parent chez EGRA ?",
      parentsDesc: "Retrouvez les notes, absences et informations de l'école dans votre espace parents.",
    },
    form: {
      tabs: { preinscription: "Pré-inscription", message: "Message" },
      intro: {
        preinscription: "Remplissez ce formulaire : nous vous recontactons pour organiser une visite.",
        message: "Posez-nous votre question, nous vous répondons dans les meilleurs délais.",
      },
      parentName: "Nom du parent ou tuteur",
      parentNamePlaceholder: "Aminata Diallo",
      email: "E-mail",
      emailPlaceholder: "exemple@gmail.com",
      phone: "Téléphone",
      phonePlaceholder: "+221 77 123 45 67",
      childName: "Nom de l'enfant",
      childNamePlaceholder: "Moussa Diallo",
      level: "Cycle souhaité",
      levelPlaceholder: "Choisir un cycle",
      levels: { prescolaire: "Préscolaire", primaire: "Primaire", secondaire: "Secondaire" },
      message: "Message",
      messageOptional: "Message (facultatif)",
      messagePlaceholder: "Classe souhaitée, questions, disponibilités pour une visite…",
      submit: { preinscription: "Envoyer ma pré-inscription", message: "Envoyer mon message" },
      sending: "Envoi en cours…",
      privacy: "Vos informations sont utilisées uniquement pour répondre à votre demande.",
      errors: {
        parentNameRequired: "Indiquez votre nom.",
        parentNameTooLong: "Ce nom est trop long.",
        emailInvalid: "Indiquez une adresse e-mail valide.",
        phoneInvalid: "Indiquez un numéro de téléphone valide.",
        childNameRequired: "Indiquez le nom de l'enfant.",
        childNameTooLong: "Ce nom est trop long.",
        levelRequired: "Choisissez un cycle.",
        messageRequired: "Écrivez votre message.",
        messageTooLong: "Ce message est trop long (2000 caractères maximum).",
        tooMany: "Vous avez envoyé plusieurs demandes récemment. Réessayez plus tard.",
        generic: "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
      },
      success: {
        title: "Merci, votre demande est bien envoyée !",
        desc: "Notre équipe vous recontactera très rapidement par téléphone ou par e-mail.",
        again: "Envoyer une autre demande",
      },
    },
  },
};

export type Dictionary = typeof fr;
