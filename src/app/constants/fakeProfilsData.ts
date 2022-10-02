import {Profil} from "../models/profil.model";

export const FAKE_PORILS_DATA: Profil[] = [
  {
    id: 1,
    libelle: 'Utilisateurs',
    description: 'Le profil des utilisateurs',
    authorities: ['ROLE_USER', 'ROLE_GET_CATEGORIES', 'ROLE_GET_GROUPES']
  },
  {
    id: 3,
    libelle: 'Chercheurs',
    description: 'Le profil des chercheurs',
    authorities: ['ROLE_USER', 'ROLE_GET_CATEGORIES', 'ROLE_GET_GROUPES', 'ROLE_CHERCHEURS']
  },
  {
    id: 3,
    libelle: 'Administrateurs',
    description: 'Le profil des administrateurs',
    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_GET_CATEGORIES', 'ROLE_GET_GROUPES', 'ROLE_CHERCHEURS']
  }
];

export const AUTHORITIES: string[] = [
  'ROLE_ADMIN', 'ROLE_USER', 'ROLE_GET_CATEGORIES', 'ROLE_GET_GROUPES', 'ROLE_CHERCHEURS'
];
