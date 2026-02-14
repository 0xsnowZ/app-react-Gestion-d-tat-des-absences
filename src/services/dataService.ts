import type { Stagiaire, Absence } from '@/types';

const API_URL = 'http://localhost:3001';

export const dataService = {
  // Stagiaires
  async getStagiaires(): Promise<Stagiaire[]> {
    const res = await fetch(`${API_URL}/stagiaires`);
    return res.json();
  },

  async addStagiaire(stagiaire: Omit<Stagiaire, 'id'>): Promise<Stagiaire> {
    const res = await fetch(`${API_URL}/stagiaires`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stagiaire),
    });
    return res.json();
  },

  async updateStagiaire(stagiaire: Stagiaire): Promise<Stagiaire> {
    const res = await fetch(`${API_URL}/stagiaires/${stagiaire.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stagiaire),
    });
    return res.json();
  },

  async deleteStagiaire(id: number): Promise<void> {
    // Supprimer le stagiaire
    await fetch(`${API_URL}/stagiaires/${id}`, { method: 'DELETE' });
    // Supprimer aussi les absences associées
    const absences = await this.getAbsences();
    const toDelete = absences.filter(a => a.idstag === id);
    await Promise.all(
      toDelete.map(a => fetch(`${API_URL}/absences/${a.id}`, { method: 'DELETE' }))
    );
  },

  async getStagiaireById(id: number): Promise<Stagiaire | undefined> {
    const res = await fetch(`${API_URL}/stagiaires/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  },

  // Absences
  async getAbsences(): Promise<Absence[]> {
    const res = await fetch(`${API_URL}/absences`);
    return res.json();
  },

  async addAbsence(absence: Omit<Absence, 'id'>): Promise<Absence> {
    const res = await fetch(`${API_URL}/absences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(absence),
    });
    return res.json();
  },

  async updateAbsence(absence: Absence): Promise<Absence> {
    const res = await fetch(`${API_URL}/absences/${absence.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(absence),
    });
    return res.json();
  },

  async deleteAbsence(id: number): Promise<void> {
    await fetch(`${API_URL}/absences/${id}`, { method: 'DELETE' });
  },

  async getAbsenceById(id: number): Promise<Absence | undefined> {
    const res = await fetch(`${API_URL}/absences/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  },

  // Consultations
  async getAbsencesByStagiaire(idstag: number): Promise<Absence[]> {
    const res = await fetch(`${API_URL}/absences?idstag=${idstag}`);
    return res.json();
  },

  async getAbsencesByJustification(justifie: 'all' | 'justifie' | 'non-justifie'): Promise<Absence[]> {
    if (justifie === 'all') return this.getAbsences();
    const val = justifie === 'justifie';
    const res = await fetch(`${API_URL}/absences?justifie=${val}`);
    return res.json();
  },

  async getAbsencesByDate(date: string): Promise<Absence[]> {
    const res = await fetch(`${API_URL}/absences?date=${date}`);
    return res.json();
  },

  async getAbsencesByPeriode(dateDebut: string, dateFin: string): Promise<Absence[]> {
    const res = await fetch(`${API_URL}/absences?date_gte=${dateDebut}&date_lte=${dateFin}`);
    return res.json();
  },

  async getRecapitulatifAbsences(): Promise<{
    totalHeures: number;
    totalJustifiees: number;
    totalNonJustifiees: number;
    heuresJustifiees: number;
    heuresNonJustifiees: number;
  }> {
    const absences = await this.getAbsences();
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
