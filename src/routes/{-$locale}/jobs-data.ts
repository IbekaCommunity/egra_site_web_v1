// src/routes/{-$locale}/jobs-data.ts
export type JobStatus = 'open' | 'closed';

export type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  contract: string;
  status: JobStatus;
  postedAt: string;
  deadline: string;
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
};

export const JOBS: Job[] = [
  {
    id: 'EGRA-2026-001',
    title: 'Enseignant de Mathématiques',
    category: 'Enseignement',
    location: 'Kinshasa, RDC',
    contract: 'CDI',
    status: 'open',
    postedAt: '2026-01-10',
    deadline: '2026-03-31',
    summary:
      'Enseigner les mathématiques aux classes de secondaire, préparer les cours et évaluer les élèves.',
    description:
      "Nous recherchons un enseignant de mathématiques passionné pour rejoindre notre équipe pédagogique. Vous serez responsable de la préparation des cours, de l'animation des séances et de l'évaluation des élèves du secondaire.",
    requirements: [
      'Licence en mathématiques ou équivalent',
      '3 ans d’expérience en enseignement',
      'Maîtrise du français et de l’anglais',
      'Pédagogie active et bienveillante',
    ],
    responsibilities: [
      'Préparer et animer les cours de mathématiques',
      'Évaluer les élèves et tenir les registres de notes',
      'Participer aux réunions pédagogiques',
      'Assurer le suivi individualisé des élèves',
    ],
    salary: 'Selon grille interne',
  },
  {
    id: 'EGRA-2026-002',
    title: 'Comptable',
    category: 'Administration',
    location: 'Kinshasa, RDC',
    contract: 'CDI',
    status: 'open',
    postedAt: '2026-01-15',
    deadline: '2026-04-15',
    summary:
      'Gérer la comptabilité générale, les paiements et les rapports financiers de l’établissement.',
    description:
      "Sous la responsabilité du Directeur Administratif et Financier, vous assurez la tenue de la comptabilité, le suivi des paiements et la production des états financiers.",
    requirements: [
      'Diplôme en comptabilité ou finance',
      '2 ans d’expérience minimum',
      'Maîtrise des logiciels comptables',
      'Rigueur et sens de l’organisation',
    ],
    responsibilities: [
      'Tenir la comptabilité générale',
      'Suivre les encaissements et décaissements',
      'Préparer les états financiers mensuels',
      'Assister lors des audits',
    ],
  },
  {
    id: 'EGRA-2026-003',
    title: 'Assistant(e) de Direction',
    category: 'Administration',
    location: 'Kinshasa, RDC',
    contract: 'CDD',
    status: 'open',
    postedAt: '2026-02-01',
    deadline: '2026-04-30',
    summary:
      'Assister la direction dans la gestion quotidienne, les rendez-vous et la communication interne.',
    description:
      "Vous serez l'interface entre la direction et les différents services. Vous gérerez l'agenda, les courriers et l'organisation des réunions.",
    requirements: [
      'Bac+2 en secrétariat ou gestion',
      'Excellente communication écrite et orale',
      'Maîtrise de la suite Office',
      'Discrétion et proactivité',
    ],
    responsibilities: [
      'Gérer l’agenda de la direction',
      'Rédiger et classer les courriers',
      'Organiser les réunions',
      'Accueillir les visiteurs',
    ],
  },
  {
    id: 'EGRA-2026-004',
    title: 'Technicien Informatique',
    category: 'Technique',
    location: 'Kinshasa, RDC',
    contract: 'CDI',
    status: 'open',
    postedAt: '2026-02-05',
    deadline: '2026-05-15',
    summary:
      'Assurer la maintenance du parc informatique et le support aux utilisateurs.',
    description:
      "Vous intervenez sur l'installation, la maintenance et le dépannage des équipements informatiques de l'établissement.",
    requirements: [
      'Formation en informatique (Bac+2 minimum)',
      'Connaissance des réseaux et systèmes',
      'Capacité à diagnostiquer et résoudre les pannes',
      'Sens du service',
    ],
    responsibilities: [
      'Installer et configurer les postes',
      'Assurer le support utilisateurs',
      'Maintenir le réseau local',
      'Documenter les interventions',
    ],
  },
  {
    id: 'EGRA-2026-005',
    title: 'Enseignant d’Anglais',
    category: 'Enseignement',
    location: 'Kinshasa, RDC',
    contract: 'CDI',
    status: 'closed',
    postedAt: '2025-10-01',
    deadline: '2025-12-31',
    summary:
      'Enseigner l’anglais aux classes de secondaire (poste pourvu).',
    description:
      "Poste déjà pourvu. Cette offre reste visible à titre d'archive pour consultation.",
    requirements: ['Licence en anglais', 'Expérience en enseignement'],
    responsibilities: [
      'Préparer et animer les cours d’anglais',
      'Évaluer les élèves',
    ],
  },
  {
    id: 'EGRA-2026-006',
    title: 'Agent de Sécurité',
    category: 'Technique',
    location: 'Kinshasa, RDC',
    contract: 'CDD',
    status: 'closed',
    postedAt: '2025-09-01',
    deadline: '2025-11-30',
    summary:
      'Assurer la sécurité des personnes et des biens au sein de l’établissement (poste pourvu).',
    description: 'Poste pourvu. Offre conservée pour consultation.',
    requirements: ['Expérience en sécurité', 'Condition physique'],
    responsibilities: ['Contrôler les accès', 'Surveiller les locaux'],
  },
];