import type { Stagiaire, Absence } from '@/types';

const STAGIAIRES_KEY = 'stagiaires';
const ABSENCES_KEY = 'absences';

// Données initiales
const defaultStagiaires: Stagiaire[] = [
  { id: 1, nom: 'Tahiri', filiere: 'DD101', sexe: 'm' },
  { id: 2, nom: 'Mouhid', filiere: 'DD102', sexe: 'f' },
  { id: 3, nom: 'Errami', filiere: 'DD201', sexe: 'm' },
];

const defaultAbsences: Absence[] = [
  { id: 1, idstag: 1, date: '2025-10-10', justifie: true, nbHeures: 4 },
  { id: 2, idstag: 1, date: '2025-10-19', justifie: false, nbHeures: 2 },
  { id: 3, idstag: 2, date: '2025-11-20', justifie: true, nbHeures: 3 },
];

export const dataService = {
  // Stagiaires
  getStagiaires(): Stagiaire[] {
    const data = localStorage.getItem(STAGIAIRES_KEY);
    if (!data) {
      localStorage.setItem(STAGIAIRES_KEY, JSON.stringify(defaultStagiaires));
      return defaultStagiaires;
    }
    return JSON.parse(data);
  },

  saveStagiaires(stagiaires: Stagiaire[]): void {
    localStorage.setItem(STAGIAIRES_KEY, JSON.stringify(stagiaires));
  },

  addStagiaire(stagiaire: Omit<Stagiaire, 'id'>): Stagiaire {
    const stagiaires = this.getStagiaires();
    const newId = stagiaires.length > 0 ? Math.max(...stagiaires.map(s => s.id)) + 1 : 1;
    const newStagiaire = { ...stagiaire, id: newId };
    stagiaires.push(newStagiaire);
    this.saveStagiaires(stagiaires);
    return newStagiaire;
  },

  updateStagiaire(stagiaire: Stagiaire): void {
    const stagiaires = this.getStagiaires();
    const index = stagiaires.findIndex(s => s.id === stagiaire.id);
    if (index !== -1) {
      stagiaires[index] = stagiaire;
      this.saveStagiaires(stagiaires);
    }
  },

  deleteStagiaire(id: number): void {
    const stagiaires = this.getStagiaires().filter(s => s.id !== id);
    this.saveStagiaires(stagiaires);
    // Supprimer aussi les absences associées
    const absences = this.getAbsences().filter(a => a.idstag !== id);
    this.saveAbsences(absences);
  },

  getStagiaireById(id: number): Stagiaire | undefined {
    return this.getStagiaires().find(s => s.id === id);
  },

  // Absences
  getAbsences(): Absence[] {
    const data = localStorage.getItem(ABSENCES_KEY);
    if (!data) {
      localStorage.setItem(ABSENCES_KEY, JSON.stringify(defaultAbsences));
      return defaultAbsences;
    }
    return JSON.parse(data);
  },

  saveAbsences(absences: Absence[]): void {
    localStorage.setItem(ABSENCES_KEY, JSON.stringify(absences));
  },

  addAbsence(absence: Omit<Absence, 'id'>): Absence {
    const absences = this.getAbsences();
    const newId = absences.length > 0 ? Math.max(...absences.map(a => a.id)) + 1 : 1;
    const newAbsence = { ...absence, id: newId };
    absences.push(newAbsence);
    this.saveAbsences(absences);
    return newAbsence;
  },

  updateAbsence(absence: Absence): void {
    const absences = this.getAbsences();
    const index = absences.findIndex(a => a.id === absence.id);
    if (index !== -1) {
      absences[index] = absence;
      this.saveAbsences(absences);
    }
  },

  deleteAbsence(id: number): void {
    const absences = this.getAbsences().filter(a => a.id !== id);
    this.saveAbsences(absences);
  },

  getAbsenceById(id: number): Absence | undefined {
    return this.getAbsences().find(a => a.id === id);
  },

  // Consultations
  getAbsencesByStagiaire(idstag: number): Absence[] {
    return this.getAbsences().filter(a => a.idstag === idstag);
  },

  getAbsencesByJustification(justifie: 'all' | 'justifie' | 'non-justifie'): Absence[] {
    const absences = this.getAbsences();
    if (justifie === 'all') return absences;
    if (justifie === 'justifie') return absences.filter(a => a.justifie);
    return absences.filter(a => !a.justifie);
  },

  getAbsencesByDate(date: string): Absence[] {
    return this.getAbsences().filter(a => a.date === date);
  },

  getAbsencesByPeriode(dateDebut: string, dateFin: string): Absence[] {
    return this.getAbsences().filter(a => a.date >= dateDebut && a.date <= dateFin);
  },

  getRecapitulatifAbsences(): {
    totalHeures: number;
    totalJustifiees: number;
    totalNonJustifiees: number;
    heuresJustifiees: number;
    heuresNonJustifiees: number;
  } {
    const absences = this.getAbsences();
    const justifiees = absences.filter(a => a.justifie);
    const nonJustifiees = absences.filter(a => !a.justifie);

    return {
      totalHeures: absences.reduce((sum, a) => sum + a.nbHeures, 0),
      totalJustifiees: justifiees.length,
      totalNonJustifiees: nonJustifiees.length,
      heuresJustifiees: justifiees.reduce((sum, a) => sum + a.nbHeures, 0),
      heuresNonJustifiees: nonJustifiees.reduce((sum, a) => sum + a.nbHeures, 0),
    };
  },
};
