export interface Stagiaire {
  id: number;
  nom: string;
  filiere: string;
  sexe: 'm' | 'f';
}

export interface Absence {
  id: number;
  idstag: number;
  date: string;
  justifie: boolean;
  nbHeures: number;
}

export type FiltreJustification = 'all' | 'justifie' | 'non-justifie';
